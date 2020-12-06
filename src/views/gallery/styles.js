import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	masonryGrid: {
		display: 'flex',
		marginLeft: '-10px' /* gutter size offset */,
		width: 'auto',
	},
	masonryGridColumn: {
		paddingLeft: '10px' /* gutter size */,
		backgroundClip: 'padding-box',
		'& img': {
			/* change div to reference your elements you put in <Masonry> */
			background: 'grey',
			marginBottom: '10px',
		},
	},
}));

export default useStyles;
