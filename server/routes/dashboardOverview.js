import React from 'react';
import Promise from 'bluebird';
import { DashboardOverview } from 'containers';
import Html from '../Html';
import app from '../server';
import {
	hostIsValid,
	renderToNodeStream,
	getInitialData,
	handleErrors,
	generateMetaComponents,
} from '../utils';
// import { getPermissionLevel } from '../utils/memberPermissions';

app.get(
	[
		'/dash',
		'/dash/overview',
		'/dash/collection/:collectionSlug',
		'/dash/collection/:collectionSlug/overview',
		'/dash/pub/:pubSlug',
		'/dash/pub/:pubSlug/overview',

		// '/dash/collection/:collectionSlug/:mode',
		// '/dash/collection/:collectionSlug/:mode/:submode',
		// '/dash/pub/:pubSlug/',
		// '/dash/pub/:pubSlug/:mode',
		// '/dash/pub/:pubSlug/:mode/:submode',
		// '/dash/:mode',
		// '/dash/:mode/:submode',
	],
	(req, res, next) => {
		if (!hostIsValid(req, 'community')) {
			return next();
		}
		if (!req.path.endsWith('overview')) {
			const splitUrl = req.originalUrl.split('?');
			const queryString = splitUrl.length > 1 ? `?${splitUrl[1]}` : '';
			return res.redirect(`${req.path}/overview${queryString}`);
		}

		return getInitialData(req)
			.then((initialData) => {
				return Promise.all([
					initialData,
					// getPermissionLevel({
					// 	userId: initialData.loginData.id,
					// 	targetId: 'd2112c45-7188-490e-a8c2-28542097a749',
					// 	targetType: 'pub',
					// }),
				]);
			})
			.then(([initialData, permissionLevel]) => {
				// console.log('permissionLevel: ', permissionLevel);
				const mode = initialData.locationData.params.mode || 'overview';
				const capitalizeFirstLetter = (string) => {
					return string.charAt(0).toUpperCase() + string.slice(1);
				};
				// console.log(initialData.loginData.id, initialData.communityData.id);
				return renderToNodeStream(
					res,
					<Html
						chunkName="DashboardOverview"
						initialData={initialData}
						headerComponents={generateMetaComponents({
							initialData: initialData,
							title: `${capitalizeFirstLetter(mode)} · Dash`,
							unlisted: true,
						})}
					>
						<DashboardOverview {...initialData} />
					</Html>,
				);
			})
			.catch(handleErrors(req, res, next));
	},
);
