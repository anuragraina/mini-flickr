import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	header: {
		padding: theme.spacing(3, 0),
	},
	listbox: {
		maxHeight: 'none',
	},
	options: {
		padding: '3px 9px',
	},
	optionIcon: {
		paddingRight: '12px',
	},
	groupCard: {
		padding: theme.spacing(1.5),
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
	},
	avatar: {
		height: '48px',
		width: '48px',
		marginRight: theme.spacing(2),
		boxShadow: '2px 2px 5px rgba(128,128,128,0.6)',
	},
	cardName: {
		fontWeight: 'bold',
		marginBottom: theme.spacing(1),
	},
	cardDetails: {
		display: 'flex',
		flexDirection: 'column',
	},
	footerItem: {
		display: 'flex',
		alignItems: 'flex-end',
		marginRight: theme.spacing(1.5),
	},
	footerText: {
		color: '#BDBDBD',
		fontWeight: 'bold',
		fontSize: '14px',
		marginLeft: '3px',
	},
}));

export default useStyles;
