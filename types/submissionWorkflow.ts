import { Attributes } from 'sequelize';
import { SubmissionWorkflow as SubmissionWorkflowModel } from 'server/models';
// import { Collection, DocJson } from 'types';

export type SubmissionWorkflow = Attributes<SubmissionWorkflowModel>;
// {
// 	id: string;
// 	createdAt: string;
// 	updatedAt: string;
// 	enabled: boolean;
// 	title: string;
// 	introText: DocJson;
// 	instructionsText: DocJson;
// 	acceptedText: DocJson;
// 	declinedText: DocJson;
// 	receivedEmailText: DocJson;
// 	targetEmailAddresses: string[];
// 	requireAbstract: boolean;
// 	requireDescription: boolean;
// 	collectionId: string;
// 	collection?: Collection;
// };
