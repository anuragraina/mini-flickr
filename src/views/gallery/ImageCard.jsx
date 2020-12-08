import { forwardRef, useState } from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import useStyles from './styles';

function ImageCard({ photo }, ref) {
	const classes = useStyles();
	const url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

	const [isMouseOver, setIsMouseOver] = useState(false);

	const title = photo.title === '' ? 'No Title' : photo.title;

	const description =
		photo.description._content === ''
			? 'No Description'
			: photo.description._content.length > 50
			? photo.description._content.slice(0, 50) + '.....'
			: photo.description._content;

	return (
		<Card
			elevation={5}
			className={classes.imageCard}
			ref={ref}
			onMouseEnter={() => setIsMouseOver(true)}
			onMouseLeave={() => setIsMouseOver(false)}
		>
			<GridListTile
				classes={{
					root: classes.root,
				}}
			>
				<img src={url} alt='group' key={photo.id} className={classes.image} />
				{isMouseOver && (
					<GridListTileBar title={title} subtitle={<span>by: {photo.ownername}</span>} />
				)}
			</GridListTile>
			<Typography className={classes.description}>{description}</Typography>
		</Card>
	);
}

const forwardedImageCard = forwardRef(ImageCard);

export default forwardedImageCard;
