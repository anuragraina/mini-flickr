import { forwardRef } from 'react';
import Card from '@material-ui/core/Card';

import useStyles from './styles';

function ImageCard({ photo }, ref) {
	const classes = useStyles();
	const url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

	return (
		<Card elevation={5} className={classes.imageCard} ref={ref}>
			<img src={url} alt='group' key={photo.id} className={classes.image} />
		</Card>
	);
}

const forwardedImageCard = forwardRef(ImageCard);

export default forwardedImageCard;
