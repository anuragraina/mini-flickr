import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	masonryGrid: {
		display: 'flex',
		width: 'auto',
	},
	masonryGridColumn: {
		backgroundClip: 'padding-box',
		'& img': {
			background: 'grey',
		},
	},
	image: {
		width: '100%',
	},
	imageCard: {
		margin: theme.spacing(3, 1.5),
		cursor: 'default',
	},
	root: {
		listStyleType: 'none',
	},
	loading: {
		display: 'flex',
		justifyContent: 'center',
		margin: theme.spacing(5),
	},
	description: {
		margin: theme.spacing(1),
		fontWeight: 'bold',
	},
	container: {
		paddingTop: theme.spacing(2),
	},
}));

export default useStyles;
