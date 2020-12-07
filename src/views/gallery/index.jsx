import { useState, useRef, useCallback } from 'react';
import Masonry from 'react-masonry-css';

import useImageSearch from './useImageSearch';

import useStyles from './styles';

export default function Gallery({ location }) {
	const params = new URLSearchParams(location.search);
	const groupId = params.get('group-id');
	const classes = useStyles();
	const [pageNumber, setPageNumber] = useState(1);

	const { loading, error, photos, hasMore } = useImageSearch(groupId, pageNumber);

	const observer = useRef();
	const lastPhotoElementRef = useCallback(
		node => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();

			observer.current = new IntersectionObserver(entries => {
				console.log(hasMore);
				if (entries[0].isIntersecting && hasMore) {
					console.log('cdvw');
					setPageNumber(prevPageNumber => prevPageNumber + 1);
				}
			});

			if (node) observer.current.observe(node);
		},
		[loading, hasMore]
	);

	return (
		<div>
			<h1>Gallery</h1>
			<Masonry
				breakpointCols={5}
				className={classes.masonryGrid}
				columnClassName={classes.masonryGridColumn}
			>
				{/* array of JSX items */}
				{photos.map((photo, index) => {
					const url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`;

					if (photos.length === index + 1) {
						return (
							<img src={url} alt='group' ref={lastPhotoElementRef} key={photo.id} />
						);
					} else {
						return <img src={url} alt='group' key={photo.id} />;
					}
				})}
			</Masonry>
		</div>
	);
}
