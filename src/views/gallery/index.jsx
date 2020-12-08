import { useState, useRef, useCallback } from 'react';
import Masonry from 'react-masonry-css';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

//Custom hook to get photos according to required group ID and page number
import useImageSearch from './useImageSearch';

import ImageCard from './ImageCard';
import useStyles from './styles';

export default function Gallery({ location }) {
	const params = new URLSearchParams(location.search);
	const groupId = params.get('group-id');
	const groupName = params.get('group-name');
	const classes = useStyles();
	const [pageNumber, setPageNumber] = useState(1);

	const breakpointColumnsObj = {
		default: 4,
		1100: 3,
		700: 2,
		500: 2,
	};

	//returns the following elements to use accordingly
	const { loading, error, photos, hasMore } = useImageSearch(groupId, pageNumber);

	const observer = useRef();

	//Increases the page number if the element is visible and if more pages exist
	const lastPhotoElementRef = useCallback(
		node => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber(prevPageNumber => prevPageNumber + 1);
				}
			});

			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	return (
		<Container maxWidth='lg' className={classes.container}>
			<Typography variant='h3' align='center'>
				{`Photos from ${groupName}`}
			</Typography>
			<Masonry
				breakpointCols={breakpointColumnsObj}
				className={classes.masonryGrid}
				columnClassName={classes.masonryGridColumn}
			>
				{/* array of JSX items */}
				{photos.map((photo, index) => {
					if (photos.length === index + 1) {
						return <ImageCard ref={lastPhotoElementRef} key={photo.id} photo={photo} />;
					} else {
						return <ImageCard key={photo.id} photo={photo} />;
					}
				})}
			</Masonry>
			{loading && (
				<section className={classes.loading}>
					<CircularProgress color='secondary' />
				</section>
			)}

			{error && <div>Some error occurred! Please try again later...</div>}
		</Container>
	);
}
