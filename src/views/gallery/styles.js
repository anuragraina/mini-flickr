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
		margin: theme.spacing(2, 1),
	},
}));

export default useStyles;
