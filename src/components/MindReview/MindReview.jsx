import React, { useState, useEffect } from 'react';
import CompleteForm from '../CompleteForm/CompleteForm';
import FormReview from '../../FormReview';
import CircularProgress from '../CircularProgress/CircularProgress';
import Result from '../Result/Result';

import { TYPE_FORM, FORM_REVIEW, LOADER, RESULT } from '../../constants';

const MindReview = () => {
	const [step, setStep] = useState(TYPE_FORM);
	const [result, setResult] = useState({ output: false });
	const changeStep = (newStep) => {
		setStep(newStep);
	};
	let respectiveComponent;
	switch (step) {
		case TYPE_FORM:
			respectiveComponent = (
				<CompleteForm
					changeStep={changeStep}
					nextStep={LOADER}
					nextToNextStep={RESULT}
					setResult={setResult}
				/>
			);
			break;
		case FORM_REVIEW:
			respectiveComponent = (
				<FormReview
					changeStep={changeStep}
					nextStep={LOADER}
					nextToNextStep={RESULT}
					setResult={setResult}
				/>
			);
			break;
		case LOADER:
			respectiveComponent = <CircularProgress />;
			break;
		case RESULT:
			respectiveComponent = (
				<Result result={result} nextStep={TYPE_FORM} changeStep={changeStep} />
			);
			break;
	}
	return <div>{respectiveComponent}</div>;
};

export default MindReview;
