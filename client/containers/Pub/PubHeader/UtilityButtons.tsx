import React from 'react';

import { usePageContext } from 'utils/hooks';
import { getDashUrl } from 'utils/dashboard';
import { DialogLauncher, PubShareDialog, PopoverButton, FacetEditor } from 'components';
import { pubUrl } from 'utils/canonicalUrls';

import { Callback, PubPageData } from 'types';
import CitationsPreview from './CitationsPreview';
import Download from './Download';
import PubToc from './PubToc';
import SmallHeaderButton from './SmallHeaderButton';
import Social from './Social';
import ReviewSettings from './ReviewSettings';
import { usePubContext } from '../pubHooks';

type Props = {
	onShowHeaderDetails: Callback;
	pubData: PubPageData;
};

const UtilityButtons = (props: Props) => {
	const { onShowHeaderDetails, pubData } = props;
	const { communityData, scopeData } = usePageContext();
	const { historyData } = usePubContext();
	const { isRelease, membersData, reviewHash } = pubData;
	const { canManage } = scopeData.activePermissions;

	return (
		<div className="utility-buttons-component">
			<SmallHeaderButton
				className="show-header-details-button"
				icon="info-sign"
				onClick={onShowHeaderDetails}
			/>
			{canManage && !isRelease && (
				<PopoverButton
					component={() => <FacetEditor facetName="PubHeaderTheme" selfContained />}
					className="pub-header-popover"
					aria-label="Pub header theme options"
				>
					<SmallHeaderButton label="Edit theme" labelPosition="left" icon="clean" />
				</PopoverButton>
			)}
			{canManage && (
				<SmallHeaderButton
					label="Pub settings"
					labelPosition="left"
					icon="cog"
					tagName="a"
					href={getDashUrl({ pubSlug: pubData.slug, mode: 'settings' })}
				/>
			)}
			{membersData && (
				<DialogLauncher
					renderLauncherElement={({ openDialog }) => (
						<SmallHeaderButton
							label="Sharing"
							labelPosition="left"
							icon="people"
							className="members-button"
							onClick={openDialog}
						/>
					)}
				>
					{({ isOpen, onClose }) => (
						<PubShareDialog isOpen={isOpen} onClose={onClose} pubData={pubData} />
					)}
				</DialogLauncher>
			)}
			<PopoverButton
				component={() => <CitationsPreview pubData={pubData} />}
				className="pub-header-popover"
				aria-label="Cite this Pub"
			>
				<SmallHeaderButton
					label="Cite"
					className="cite-button"
					labelPosition="left"
					icon="cite"
				/>
			</PopoverButton>
			{isRelease && (
				<Social pubData={pubData}>
					<SmallHeaderButton label="Social" labelPosition="left" icon="share2" />
				</Social>
			)}
			<Download pubData={pubData}>
				<SmallHeaderButton label="Download" labelPosition="left" icon="download2" />
			</Download>
			<PubToc>
				<SmallHeaderButton label="Contents" labelPosition="left" icon="toc" />
			</PubToc>
			{membersData && (
				<DialogLauncher
					renderLauncherElement={({ openDialog }) => (
						<SmallHeaderButton
							label="feedback settings"
							labelPosition="left"
							icon="edit"
							className="members-button"
							onClick={openDialog}
						/>
					)}
				>
					{({ isOpen, onClose }) => (
						<ReviewSettings
							isOpen={isOpen}
							onClose={onClose}
							pubData={pubData}
							communityData={communityData}
							updatePubData={() => {}}
						/>
					)}
				</DialogLauncher>
			)}
			<SmallHeaderButton
				label="Review"
				labelPosition="left"
				icon="draw"
				href={pubUrl(communityData, pubData, {
					accessHash: reviewHash,
					historyKey: historyData.currentKey,
					isReview: true,
				})}
			/>
		</div>
	);
};
export default UtilityButtons;
