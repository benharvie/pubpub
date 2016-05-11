const app = require('../api');
const RSS = require('rss');
const fs = require('fs');
import React from 'react';
import ReactDOM from 'react-dom/server';
import {StyleRoot} from 'radium';
import {IntlProvider} from 'react-intl';

import {PubBodyRSS} from 'components';
import {convertListToObject} from 'utils/parsePlugins';
import Promise from 'bluebird';

import {Pub, Asset, Journal} from '../models';


function renderPub(languageObject, host, pub) {

	const p = new Promise((resolve, reject) => {

		const authorString = pub.authors.reduce((previousValue, currentValue, currentIndex, array)=>{
			const lastName = array[currentIndex].lastName || 'Lastname';
			const firstName = array[currentIndex].firstName ? array[currentIndex].firstName.charAt(0) + '.' : 'F.';
			const nextAuthorString = array.length === currentIndex + 1 ? lastName + ', ' + firstName : lastName + ', ' + firstName + ', ';
			return previousValue + nextAuthorString;
		}, '');

			const pubUrl = 'http://' + host + '/pub/' + pub.slug;

			const feedItem = {
				title: pub.title,
				description: pub.abstract,
				url: 'http://' + host + '/pub/' + pub.slug,
				author: authorString,
				guid: String(pub._id),
				date: pub.lastUpdated,
			};

			let articleHTML;
			try {
				articleHTML = ReactDOM.renderToStaticMarkup(<PubBodyRSS
								title={pub.title}
								abstract={pub.abstract}
								authorsNote={pub.authorsNote}
								authorString={authorString}
								markdown={pub.markdown}
								authors={pub.authors}
								pubURL={pubUrl}
								discussionCount={pub.discussions.length}
								firstPublishedDate={pub.createDate}
								lastPublishedDate={pub.lastUpdated} />);
			} catch (err) {
				console.log('Error rendering markdown', err);
			}

			articleHTML = `<![CDATA[
        <!doctype html>
				${articleHTML}
			]]>`;

			feedItem.custom_elements = [
				{'content:encoded': articleHTML},
			];

			resolve(feedItem);

		});

	return p;
}


function generateRSSXML(req, instantArticleMode, callback) {
	const host = req.headers.host.split(':')[0];
	Journal.findOne({ $or: [ {subdomain: host.split('.')[0]}, {customDomain: host}]})
	.lean().exec(function(err, journal) {
		const title = journal ? journal.journalName : 'PubPub';
		const description = journal ? journal.description : 'PubPub is a platform for totally transparent publishing. Read, Write, Publish, Review.';
		const imageURL = journal ? journal.journalLogoURL : 'https://s3.amazonaws.com/pubpub-upload/pubpubDefaultTitle.png';

		const feed = new RSS({
			title: title,
			description: description,
			feed_url: 'http://' + host + '/data/rss.xml',
			site_url: 'http://' + host,
			image_url: imageURL,
		});

		/*
		const query = {history: {$not: {$size: 0}}};
		if (journal) {
			query.featuredInList = journal._id;
		}
		*/

		const query = {
			history: {$not: {$size: 0}},
			featuredInList: {$not: {$size: 0}},
			// discussions: {$not: {$size: 0}},
			'isPublished': true
		};

		Pub.find(query, {slug: 1, title: 1, abstract: 1, createDate: 1, lastUpdated: 1, authors: 1, authorsNote: 1, markdown: 1})
		.populate({ path: 'authors', select: 'name firstName lastName', model: 'User' })
		.populate({ path: 'assets', model: 'Asset' })
		.limit(10)
		.sort({'lastUpdated': -1})
		.lean()
		.exec()
		.then(function(pubs) {

			// if (errPubFind) { console.log(errPubFind); }

			let languageObject = {};
			// const locale = journal && journal.locale ? journal.locale : 'en';
			// console.log('file name',__dirname + '/../../translations/languages/' + locale + '.json');
			fs.readFile(__dirname + '/../../translations/languages/en.json', 'utf8', function(errFSRead, data) {
				if (errFSRead) { console.log(errFSRead); }
				languageObject = JSON.parse(data);
				Promise.all(pubs.map((pub) => renderPub(languageObject, host, pub)))
				.then(function(newPubs) {
					for (const pubItem of newPubs) {
						feed.item(pubItem);
					}
					callback(feed.xml());
				});


			});
		});
	});
}

export function rss(req, res) {
	generateRSSXML(req, false, function(xmlFeed) {
		res.set('Content-Type', 'text/xml');
		res.send(xmlFeed);
	});
}
app.get('/rss.xml', rss);

// app.get('/instantarticles.xml', function(req,res){
// 	generateRSSXML(req, true, function(xmlFeed){
// 		res.set('Content-Type', 'text/xml');
// 		res.send(xmlFeed);
// 	});
// });
