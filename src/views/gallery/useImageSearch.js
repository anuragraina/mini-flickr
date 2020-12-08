import { useState, useEffect } from 'react';
import Flickr from 'flickr-sdk';

const flickr = new Flickr(process.env.REACT_APP_FLICKR_API_KEY);

export default function useImageSearch(groupId, pageNumber) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [photos, setPhotos] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		setLoading(true);
		setError(false);

		flickr.groups.pools
			.getPhotos({
				group_id: groupId,
				per_page: 20,
				page: pageNumber,
				extras: ['description'],
			})
			.then(response => {
				setPhotos(prevPhotos => [...prevPhotos, ...response.body.photos.photo]);
				setHasMore(pageNumber < response.body.photos.pages);
				setLoading(false);
			})
			.catch(err => {
				console.log(err);
				setError(true);
				setLoading(false);
			});
	}, [groupId, pageNumber]);

	return { loading, error, photos, hasMore };
}
