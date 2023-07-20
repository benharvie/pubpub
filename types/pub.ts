import { Attributes } from 'sequelize';
import {
	Pub as PubModel,
	Draft as DraftModel,
	Doc as DocModel,
	Release as ReleaseModel,
	PubVersion as PubVersionModel,
	CrossrefDepositRecord,
} from 'server/models';
import { PubAttribution } from './attribution';
import { Collection, CollectionPub } from './collection';
import { Discussion } from './discussion';
import { DocJson } from './doc';
import { Member } from './member';
import { Submission } from './submission';
import { ThreadComment, Thread } from './thread';
import { DefinitelyHas, Maybe } from './util';
import { UserSubscription } from './userSubscription';

export type Draft = Attributes<DraftModel>;
export type Doc = Attributes<DocModel>;
export type Release = Attributes<ReleaseModel>;

export type Export = {
	id: string;
	format: string;
	url?: string;
	historyKey: number;
	workerTaskId?: string;
};

export type PubVersion = Attributes<PubVersionModel>;
export type DepositRecord = Attributes<CrossrefDepositRecord>;
export type Pub = Attributes<PubModel>;

export type PubWithConnections = DefinitelyHas<Pub, 'inboundEdges' | 'outboundEdges'>;

export type PubDocInfo = {
	initialDoc: DocJson;
	initialDocKey: number;
	mostRecentRemoteKey?: number;
	historyData: {
		timestamps: Record<string, number>;
		currentKey: number;
		latestKey: number;
	};
};

export type PubPageDiscussion = DefinitelyHas<Discussion, 'anchors'> & {
	thread: Thread & {
		comments: DefinitelyHas<ThreadComment, 'author'>[];
	};
};

export type PubPageData = DefinitelyHas<Omit<Pub, 'discussions'>, 'collectionPubs'> &
	PubDocInfo & {
		membersData?: {
			members: Member[];
		};
		collectionPubs: DefinitelyHas<CollectionPub, 'collection'>[];
		discussions: PubPageDiscussion[];
		viewHash: Maybe<string>;
		editHash: Maybe<string>;
		reviewHash: Maybe<string>;
		commentHash: Maybe<string>;
		isRelease: boolean;
		isReviewingPub: boolean;
		isAVisitingCommenter: boolean;
		isInMaintenanceMode?: boolean;
		firebaseToken?: string;
		initialStructuredCitations: boolean;
		releaseNumber: Maybe<number>;
		submission?: DefinitelyHas<Submission, 'submissionWorkflow'>;
		subscription: null | UserSubscription;
	};

export type PubHistoryState = {
	currentKey: number;
	latestKey: number;
	isViewingHistory: boolean;
	loadedIntoHistory: boolean;
	historyDocEditorKey: string;
	historyDoc: null | DocJson;
	latestHistoryDoc: null | DocJson;
	outstandingRequests: number;
	latestKeyReceivedAt: Maybe<number>;
	timestamps: Record<string, number>;
};

export type PubDraftInfo = {
	doc: DocJson;
	mostRecentRemoteKey: number;
	firstTimestamp: number;
	latestTimestamp: number;
	historyData: Pick<PubHistoryState, 'currentKey' | 'latestKey' | 'timestamps'>;
};

type CollectionPubWithAttributions = CollectionPub & {
	collection: DefinitelyHas<Collection, 'attributions'>;
};

export type SanitizedPubData = Pub & {
	viewHash: string | null;
	editHash: string | null;
	reviewHash: string | null;
	commentHash: string | null;
	attributions: PubAttribution[];
	discussions: Discussion[];
	collectionPubs: CollectionPubWithAttributions[];
	isRelease: boolean;
	releases: Release[];
	releaseNumber: number | null;
};

export type PubWithCollections = Pub & {
	collectionPubs: DefinitelyHas<CollectionPub, 'collection'>[];
};
