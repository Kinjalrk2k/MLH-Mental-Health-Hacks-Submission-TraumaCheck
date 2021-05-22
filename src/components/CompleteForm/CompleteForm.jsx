import React from 'react';
import { useInputState } from '../../hooks/useInputState';
import { makeStyles } from '@material-ui/styles';
import TypeForm from 'react-typeform';
import axios from '../../axios';

import * as all from '../../constants';

import NumericInput from '../Inputs/NumericInput';
import SelectInput from '../Inputs/SelectInput';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
		height: '100vh',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},
	typeForm: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	btn: {
		outline: 'none',
		cursor: 'pointer',
		position: 'relative',
		padding: '12px 36px',
		margin: '5px 10px',
		textTransform: 'uppercase',
		fontSize: '0.9rem',
		fontFamily: "'Roboto', sans-serif",
		textAlign: 'center',
		color: '#FFF',
		letterSpacing: '2px',
		borderRadius: '5px',
		border: 'none',
		transition: 'all 0.2s',
	},
	nextBtn: {
		backgroundColor: '#F57F17;',
		'&:hover': {
			boxShadow:
				'0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
		},
	},
	backBtn: {
		backgroundColor: '#CDDC39;',
		'&:hover': {
			boxShadow:
				'0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
		},
	},
	submitBtn: {
		backgroundColor: '#BA68C8;',
		'&:hover': {
			boxShadow:
				'0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
		},
	},
}));

const CompleteForm = (props) => {
	const classes = useStyles();
	const [age, changeAge, resetAge] = useInputState(36);
	const [noEmployees, changeNoEmployees, resetNoEmployees] = useInputState(600);
	const [gender, changeGender, resetGender] = useInputState('M');
	const [selfEmployed, changeSelfEmployed, resetSelfEmployed] = useInputState('Yes');
	const [familyHistory, changeFamilyHistory, resetFamilyHistory] = useInputState('Yes');
	const [treatment, changeTreatment, resetTreatment] = useInputState('No');
	const [remoteWork, changeRemoteWork, resetRemoteWork] = useInputState('No');
	const [techCompany, changeTechCompany, resetTechCompany] = useInputState('Yes');
	const [benefits, changeBenefits, resetBenefits] = useInputState("Don't know");
	const [careOptions, changeCareOptions, resetCareOptions] = useInputState('Not sure');
	const [wellnessProgram, changeWellnessProgram, resetWellnessProgram] = useInputState('No');
	const [seekHelp, changeSeekHelp, resetSeekHelp] = useInputState("Don't know");
	const [anonymity, changeAnonymity, resetAnonymity] = useInputState("Don't know");
	const [leave, changeLeave, resetLeave] = useInputState("Don't know");
	const [
		mentalHealthConsequence,
		changeMentalHealthConsequence,
		resetMentalHealthConsequence,
	] = useInputState('No');
	const [coworkers, changeCoworkers, resetCoworkers] = useInputState('Yes');
	const [supervisor, changeSupervisor, resetSupervisor] = useInputState('Yes');
	const [mentalVsPhysical, changeMentalVsPhysical, resetMentalVsPhysical] = useInputState(
		"Don't know"
	);
	const [obsConsequence, changeObsConsequence, resetObsConsequence] = useInputState('No');

	const { changeStep, nextStep, nextToNextStep, setResult } = props;

	const allResetInputs = [
		resetAge,
		resetNoEmployees,
		resetGender,
		resetSelfEmployed,
		resetFamilyHistory,
		resetTreatment,
		resetRemoteWork,
		resetTechCompany,
		resetBenefits,
		resetCareOptions,
		resetWellnessProgram,
		resetSeekHelp,
		resetAnonymity,
		resetLeave,
		resetMentalHealthConsequence,
		resetCoworkers,
		resetSupervisor,
		resetMentalVsPhysical,
		resetObsConsequence,
	];

	const employeeString = (noEmployees) => {
		if (noEmployees >= 1 && noEmployees <= 25) return '1-25';
		else if (noEmployees >= 26 && noEmployees <= 100) return '26-100';
		else if (noEmployees >= 101 && noEmployees <= 500) return '100-500';
		else if (noEmployees >= 501 && noEmployees <= 1000) return '500-1000';
		else return 'More than 1000';
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const ourData = {
			Timestamp: '27-08-2014 11:33',
			Age: String(age),
			Gender: gender,
			Country: 'United States',
			state: 'CT',
			self_employed: selfEmployed,
			family_history: familyHistory,
			treatment: treatment,
			no_employees: employeeString(noEmployees),
			remote_work: remoteWork,
			tech_company: techCompany,
			benefits: benefits,
			care_options: careOptions,
			wellness_program: wellnessProgram,
			seek_help: seekHelp,
			anonymity: anonymity,
			leave: leave,
			mental_health_consequence: mentalHealthConsequence,
			phys_health_consequence: 'No',
			coworkers: coworkers,
			supervisor: supervisor,
			mental_health_interview: 'No',
			phys_health_interview: 'No',
			mental_vs_physical: mentalVsPhysical,
			obs_consequence: obsConsequence,
			comments:
				"I'm not on my company's health insurance which could be part of the reason I answered Don't know to so many questions.",
		};
		changeStep(nextStep);
		axios
			.post(`/predict`, ourData)
			.then(function (response) {
				const actualData = response.data;
				console.log(actualData);
				setResult(actualData);
				changeStep(nextToNextStep);
			})
			.catch(function (error) {
				console.log(error);
			});
		allResetInputs.forEach((resetValue) => {
			resetValue('');
		});
	};

	return (
		<div className={classes.root}>
			<TypeForm
				onSubmit={handleSubmit}
				submitBtnText='Submit'
				nextBtnClass={`${classes.btn} ${classes.nextBtn}`}
				backBtnClass={`${classes.btn} ${classes.backBtn}`}
				submitBtnClass={`${classes.btn} ${classes.submitBtn}`}
				className={classes.typeForm}
			>
				<NumericInput text={all.AGE.text} value={age} changeValue={changeAge} />
				<SelectInput
					text={all.GENDER.text}
					options={all.GENDER.options}
					value={gender}
					changeValue={changeGender}
				/>
				<SelectInput
					text={all.SELF_EMPLOYED.text}
					options={all.SELF_EMPLOYED.options}
					value={selfEmployed}
					changeValue={changeSelfEmployed}
				/>
				<SelectInput
					text={all.FAMILY_HISTORY.text}
					options={all.FAMILY_HISTORY.options}
					value={familyHistory}
					changeValue={changeFamilyHistory}
				/>
				<SelectInput
					text={all.TREATMENT.text}
					options={all.TREATMENT.options}
					value={treatment}
					changeValue={changeTreatment}
				/>
				<NumericInput
					text={all.NO_EMPLOYEES.text}
					value={noEmployees}
					changeValue={changeNoEmployees}
				/>
				<SelectInput
					text={all.REMOTE_WORK.text}
					options={all.REMOTE_WORK.options}
					value={remoteWork}
					changeValue={changeRemoteWork}
				/>
				<SelectInput
					text={all.TECH_COMPANY.text}
					options={all.TECH_COMPANY.options}
					value={techCompany}
					changeValue={changeTechCompany}
				/>
				<SelectInput
					text={all.BENEFITS.text}
					options={all.BENEFITS.options}
					value={benefits}
					changeValue={changeBenefits}
				/>
				<SelectInput
					text={all.CARE_OPTIONS.text}
					options={all.CARE_OPTIONS.options}
					value={careOptions}
					changeValue={changeCareOptions}
				/>
				<SelectInput
					text={all.WELLNESS_PROGRAM.text}
					options={all.WELLNESS_PROGRAM.options}
					value={wellnessProgram}
					changeValue={changeWellnessProgram}
				/>
				<SelectInput
					text={all.SEEK_HELP.text}
					options={all.SEEK_HELP.options}
					value={seekHelp}
					changeValue={changeSeekHelp}
				/>
				<SelectInput
					text={all.ANONYMITY.text}
					options={all.ANONYMITY.options}
					value={anonymity}
					changeValue={changeAnonymity}
				/>
				<SelectInput
					text={all.LEAVE.text}
					options={all.LEAVE.options}
					value={leave}
					changeValue={changeLeave}
				/>
				<SelectInput
					text={all.MENTAL_HEALTH_CONSEQUENCE.text}
					options={all.MENTAL_HEALTH_CONSEQUENCE.options}
					value={mentalHealthConsequence}
					changeValue={changeMentalHealthConsequence}
				/>
				<SelectInput
					text={all.COWORKERS.text}
					options={all.COWORKERS.options}
					value={coworkers}
					changeValue={changeCoworkers}
				/>
				<SelectInput
					text={all.SUPERVISOR.text}
					options={all.SUPERVISOR.options}
					value={supervisor}
					changeValue={changeSupervisor}
				/>
				<SelectInput
					text={all.MENTAL_VS_PHYSICAL.text}
					options={all.MENTAL_VS_PHYSICAL.options}
					value={mentalVsPhysical}
					changeValue={changeMentalVsPhysical}
				/>
				<SelectInput
					text={all.OBS_CONSEQUENCES.text}
					options={all.OBS_CONSEQUENCES.options}
					value={obsConsequence}
					changeValue={changeObsConsequence}
				/>
			</TypeForm>
		</div>
	);
};

export default CompleteForm;
