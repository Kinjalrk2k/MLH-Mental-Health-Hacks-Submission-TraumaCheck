import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme, props) => ({
	root: {
		height: '100vh',
		width: '100vw',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		backgroundColor: (props) => (props.result.output ? '#ff1744' : '#40e0d0'),
		color: '#fff',
		padding: '3rem',
		borderRadius: '1rem',
	},
	icon: {
		width: '50%',
		borderRadius: '50%',
		marginTop: '1rem',
		boxShadow: '0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)',
	},
	btnStartAgain: {
		marginTop: '3rem',
	},
}));

const HAPPY_FACE =
	'https://assets.dryicons.com/uploads/icon/svg/8934/2502d1cb-0183-4794-99e7-e77dc4ccd6a7.svg';
const CONFUSED_FACE =
	'https://assets.dryicons.com/uploads/icon/svg/8922/fa0cb986-69a4-4d37-8c03-7228b9652416.svg';

const Result = (props) => {
	const { output } = props.result;
	const { nextStep, changeStep } = props;
	const classes = useStyles(props);
	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<h2>
					{output
						? 'You mental health does interfere with your work'
						: 'Great your mental health does not interfere with your work'}
				</h2>
				<img
					className={classes.icon}
					src={output ? CONFUSED_FACE : HAPPY_FACE}
					alt='a icon'
				/>
				<br />
				<Button
					className={classes.btnStartAgain}
					variant='contained'
					color='primary'
					onClick={() => changeStep(nextStep)}
				>
					Start Again
				</Button>
			</div>
		</div>
	);
};

export default Result;
