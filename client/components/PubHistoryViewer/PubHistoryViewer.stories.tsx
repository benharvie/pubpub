import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';

import { PubHistoryViewer } from 'components';

const releases = [
	{
		id: 'd038439d-7278-4de6-a8dc-a74f42983359',
		noteContent: null,
		noteText: null,
		historyKey: 0,
		pubId: '95e12aa6-2043-46dd-8c2d-2c58242136d1',
		userId: 'b242f616-7aaa-479c-8ee5-3933dcf70859',
		createdAt: '2018-11-27T15:44:57.383Z',
		updatedAt: '2018-11-27T15:44:57.383Z',
	},
	{
		id: '8adee8a8-c415-4b6a-9200-ccab7d546b5d',
		noteContent: null,
		noteText: null,
		historyKey: 1,
		pubId: '95e12aa6-2043-46dd-8c2d-2c58242136d1',
		userId: 'b242f616-7aaa-479c-8ee5-3933dcf70859',
		createdAt: '2018-11-28T20:49:39.707Z',
		updatedAt: '2018-11-28T20:49:39.707Z',
	},
	{
		id: 'bb21a32c-eb47-4e16-9eb0-c2133180642e',
		noteContent: null,
		noteText: null,
		historyKey: 2,
		pubId: '95e12aa6-2043-46dd-8c2d-2c58242136d1',
		userId: 'b242f616-7aaa-479c-8ee5-3933dcf70859',
		createdAt: '2018-12-03T18:46:56.688Z',
		updatedAt: '2018-12-03T18:46:56.688Z',
	},
	{
		id: 'b58396d8-a55a-4588-bf99-148b6892a7c7',
		noteContent: null,
		noteText: null,
		historyKey: 3,
		pubId: '95e12aa6-2043-46dd-8c2d-2c58242136d1',
		userId: 'b242f616-7aaa-479c-8ee5-3933dcf70859',
		createdAt: '2019-01-03T22:16:33.214Z',
		updatedAt: '2019-01-03T22:16:33.214Z',
	},
	{
		id: 'fb0165f4-015e-43f3-b229-d76e68e9a165',
		noteContent: null,
		noteText: null,
		historyKey: 4,
		pubId: '95e12aa6-2043-46dd-8c2d-2c58242136d1',
		userId: 'b242f616-7aaa-479c-8ee5-3933dcf70859',
		createdAt: '2019-01-16T20:32:04.569Z',
		updatedAt: '2019-01-16T20:32:04.569Z',
	},
	{
		id: '82918545-ce62-4be6-9abc-8f23d8509004',
		noteContent: null,
		noteText: null,
		historyKey: 5,
		pubId: '95e12aa6-2043-46dd-8c2d-2c58242136d1',
		userId: 'b242f616-7aaa-479c-8ee5-3933dcf70859',
		createdAt: '2019-01-24T15:22:09.907Z',
		updatedAt: '2019-01-24T15:22:09.907Z',
	},
	{
		id: '478647f3-2dea-46a0-9ee1-91ee4d26f60c',
		noteContent: null,
		noteText: null,
		historyKey: 6,
		pubId: '95e12aa6-2043-46dd-8c2d-2c58242136d1',
		userId: 'b242f616-7aaa-479c-8ee5-3933dcf70859',
		createdAt: '2019-03-19T17:50:32.703Z',
		updatedAt: '2019-03-19T17:50:32.703Z',
	},
	{
		id: 'a9c94445-3635-4c12-93aa-9784f42ad9bc',
		noteContent: null,
		noteText: null,
		historyKey: 7,
		pubId: '95e12aa6-2043-46dd-8c2d-2c58242136d1',
		userId: 'b242f616-7aaa-479c-8ee5-3933dcf70859',
		createdAt: '2019-03-27T13:25:53.808Z',
		updatedAt: '2019-03-27T13:25:53.808Z',
	},
	{
		id: '84ca11f9-84bf-4220-9fe3-68874f522b2f',
		noteContent: null,
		noteText: null,
		historyKey: 8,
		pubId: '95e12aa6-2043-46dd-8c2d-2c58242136d1',
		userId: 'b242f616-7aaa-479c-8ee5-3933dcf70859',
		createdAt: '2019-04-03T19:29:42.219Z',
		updatedAt: '2019-04-03T19:29:42.219Z',
	},
	{
		id: '22475b0b-7577-4b84-ab14-a8775b098921',
		noteContent: null,
		noteText: null,
		historyKey: 9,
		pubId: '95e12aa6-2043-46dd-8c2d-2c58242136d1',
		userId: 'b242f616-7aaa-479c-8ee5-3933dcf70859',
		createdAt: '2019-04-09T18:59:55.736Z',
		updatedAt: '2019-04-09T18:59:55.736Z',
	},
	{
		id: '2bc62ce6-0c93-4173-9705-7f66ecf5ad12',
		noteContent: null,
		noteText: null,
		historyKey: 10,
		pubId: '95e12aa6-2043-46dd-8c2d-2c58242136d1',
		userId: 'b242f616-7aaa-479c-8ee5-3933dcf70859',
		createdAt: '2019-04-29T16:37:24.774Z',
		updatedAt: '2019-04-29T16:37:24.774Z',
	},
	{
		id: '74497cb5-0d78-4305-8946-c2b81a52c332',
		noteContent: null,
		noteText: null,
		historyKey: 11,
		pubId: '95e12aa6-2043-46dd-8c2d-2c58242136d1',
		userId: 'b242f616-7aaa-479c-8ee5-3933dcf70859',
		createdAt: '2019-05-24T13:15:42.037Z',
		updatedAt: '2019-05-24T13:15:42.037Z',
	},
	{
		id: '49a5d67f-4ee3-4b56-b494-363a8525b926',
		noteContent: null,
		noteText: null,
		historyKey: 12,
		pubId: '95e12aa6-2043-46dd-8c2d-2c58242136d1',
		userId: 'b242f616-7aaa-479c-8ee5-3933dcf70859',
		createdAt: '2019-07-11T14:28:45.041Z',
		updatedAt: '2019-07-11T14:28:45.041Z',
	},
	{
		id: '32a9c0ab-15f4-4ece-bbce-92b21d008391',
		noteContent: {
			type: 'doc',
			attrs: { meta: {} },
			content: [{ type: 'paragraph', attrs: { class: null } }],
		},
		noteText: '',
		historyKey: 13,
		pubId: '95e12aa6-2043-46dd-8c2d-2c58242136d1',
		userId: '5d9d63b3-6990-407c-81fb-5f87b9d3e360',
		createdAt: '2019-07-22T17:23:46.622Z',
		updatedAt: '2019-07-22T17:23:46.624Z',
	},
];

const editTimestamps = {
	0: 1540395876046,
	100: 1540395922819,
	200: 1540395953587,
	300: 1540395989706,
	400: 1540396044240,
	500: 1540396079507,
	600: 1540396140758,
	700: 1540396232658,
	800: 1540396290595,
	900: 1540396815683,
	1000: 1540397172151,
	1100: 1540397215678,
	1200: 1540397233824,
	1300: 1540397281155,
	1400: 1540397323014,
	1500: 1540397341104,
	1600: 1540397359379,
	1700: 1540397402005,
	1800: 1540931590274,
	1900: 1543333479837,
	2000: 1546445426120,
	2100: 1546446058352,
	2200: 1546446077916,
	2300: 1546551109280,
	2400: 1546551136660,
	2500: 1546551200234,
	2600: 1546551258488,
	2700: 1546551284553,
	2800: 1546551358690,
	2900: 1546551374809,
	3000: 1546551400295,
	3100: 1546551434084,
	3200: 1546551482864,
	3300: 1546551520275,
	3400: 1546551556303,
	3500: 1546551656341,
	3600: 1546551678163,
	3700: 1546551726949,
	3800: 1546551802468,
	3900: 1546551833855,
	4000: 1546551907850,
	4100: 1546551954722,
	4200: 1546552022663,
	4300: 1546552213474,
	4400: 1546552276352,
	4500: 1546552378500,
	4600: 1546552518534,
	4700: 1546552662256,
	4800: 1546552754135,
	4900: 1546552800634,
	5000: 1546552849177,
	5100: 1546552910776,
	5200: 1546552987125,
	5300: 1546553105198,
	5400: 1546553140026,
	5500: 1546553170224,
	5600: 1546553211386,
	5700: 1546553251364,
	5800: 1546553309997,
	5900: 1546553366545,
	6000: 1546553389628,
	6100: 1546553433015,
	6200: 1546553493343,
	6300: 1546553519430,
	6400: 1546553550637,
	6500: 1546553585781,
	6600: 1546553640435,
	6700: 1546553707787,
	6800: 1548343315203,
	6900: 1552925450825,
	7000: 1552925488019,
	7100: 1552925775096,
	7200: 1552939226074,
	7300: 1552939280940,
	7400: 1552939382486,
	7500: 1552939452913,
	7600: 1552939575007,
	7700: 1552939627522,
	7800: 1552939696788,
	7900: 1552939793727,
	8000: 1552939903411,
	8100: 1552940030719,
	8200: 1552940144206,
	8300: 1552940185513,
	8400: 1552940209032,
	8500: 1552940962769,
	8600: 1552940990660,
	8700: 1552941030314,
	8800: 1552945378675,
	8900: 1552945452493,
	9000: 1552946592335,
	9100: 1552946648181,
	9200: 1552946904127,
	9300: 1553878921779,
	9400: 1553879153749,
	9500: 1554317686263,
	9600: 1554317851000,
	9700: 1554836366595,
	9800: 1554836389896,
	9900: 1555344856472,
	10000: 1555344903809,
	10100: 1556553857975,
	10200: 1556554154161,
	10300: 1556554804030,
	10400: 1556554929777,
	10500: 1556555275641,
	10600: 1558029275754,
	10700: 1558116427594,
	10800: 1558360159937,
	10900: 1559052478463,
	11000: 1562591235799,
	11100: 1562591409856,
	11200: 1562591579832,
	11300: 1562591636023,
	11400: 1562591773536,
	11500: 1562592238828,
	11600: 1562592325425,
	11700: 1562592352354,
	11800: 1562592378868,
	11900: 1562592418774,
	12000: 1562592568325,
	12100: 1562592731033,
	12200: 1562592760778,
	12300: 1562703653660,
	12400: 1562703999895,
	12500: 1562704037533,
	12600: 1562766498133,
	12700: 1562766715162,
	12800: 1562767572389,
	12900: 1562767973107,
	13000: 1562768577842,
	13100: 1562768711864,
	13200: 1562769396909,
	13300: 1562770384094,
	13400: 1562770756513,
	13500: 1562855137864,
	13600: 1563812902048,
	13700: 1563812933247,
	13800: 1563813159712,
	13900: 1565015136547,
	14000: 1565015212545,
	14100: 1565015747929,
	14200: 1567522486612,
	14300: 1570721339484,
	14400: 1570721520864,
	14500: 1572274331946,
	14600: 1572275783013,
	14678: 1572612192104,
};

const pubData = {
	releases,
	slug: 'hmmmm',
	createdAt: '2018-10-24T15:44:16.819Z',
};

export const initialHistoryData = {
	timestamps: editTimestamps,
	currentKey: 14678,
	latestKey: 14678,
	isViewingHistory: false,
	loadedIntoHistory: false,
	historyDocKey: 'string',
	outstandingRequests: 0,
	latestKeyReceivedAt: 0,
};

const StatefulPubHistoryWrapper = () => {
	const [historyData, setHistoryData] = useState(initialHistoryData);
	return (
		<PubHistoryViewer
			pubData={pubData as any}
			historyData={historyData as any}
			onSetCurrentHistoryKey={(currentKey) =>
				setHistoryData((current) => ({ ...current, currentKey }))
			}
			onClose={() => {}}
		/>
	);
};

storiesOf('components/PubHistoryViewer', module).add('default', () => (
	<StatefulPubHistoryWrapper />
));
