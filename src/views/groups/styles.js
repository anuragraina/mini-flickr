import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		padding: theme.spacing(3, 0),
		width: '100%',
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
		marginLeft: '2px',
	},
	pagination: {
		margin: theme.spacing(3),
	},
}));

export default useStyles;
