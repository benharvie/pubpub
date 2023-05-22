import React from 'react';
import { Button } from 'reakit';

import { Icon } from 'components';

import { EditorChangeObject } from 'components/Editor';
import { useRefMap } from 'client/utils/useRefMap';
import { FormattingBarButtonData } from './types';
import { suggestedEditsReject, suggestedEditsAccept } from './buttons';
import { useCommandStates } from './hooks/useCommandStates';

type Props = {
	editorChangeObject: EditorChangeObject;
	buttons: FormattingBarButtonData[][];
};

const FormattingBarSuggestedEdits = (props: Props) => {
	const { editorChangeObject, buttons } = props;
	const buttonElementRefs = useRefMap();
	const { view } = editorChangeObject;

	const commandStates = useCommandStates({
		view: editorChangeObject.view,
		state: editorChangeObject.view?.state,
		commands: buttons,
	});

	const handleClick = (button: FormattingBarButtonData) => {
		const commandState = commandStates[button.key];
		commandState?.run();
		view.focus();
	};

	return (
		<div>
			<Button
				ref={buttonElementRefs.getRef(suggestedEditsReject.key)}
				role="button"
				focusable
				title={suggestedEditsReject.title}
				aria-label={suggestedEditsReject.title}
				onClick={() => handleClick(suggestedEditsReject)}
			>
				<Icon icon={suggestedEditsReject.icon} iconSize={16} />
			</Button>
			|
			<Button
				ref={buttonElementRefs.getRef(suggestedEditsAccept.key)}
				role="button"
				focusable
				title={suggestedEditsAccept.title}
				aria-label={suggestedEditsAccept.title}
				onClick={() => handleClick(suggestedEditsAccept)}
			>
				<Icon icon={suggestedEditsAccept.icon} iconSize={16} />
			</Button>
		</div>
	);
};

export default FormattingBarSuggestedEdits;