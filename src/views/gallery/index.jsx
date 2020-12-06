import { useEffect, useState } from 'react';
import Flickr from 'flickr-sdk';

const flickr = new Flickr(process.env.REACT_APP_FLICKR_API_KEY);

export default function Gallery({ location }) {
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const groupId = params.get('group-id');

		flickr.groups.pools
			.getPhotos({
				group_id: groupId,
				per_page: 20,
			})
			.then(response => {
				console.log(response.body.photos.photo);
				setPhotos(response.body.photos.photo);
			})
			.catch(err => {
				console.log(err);
			});
	}, [location.search]);

	return (
		<div>
			<h1>Gallery</h1>
			{photos.map(photo => {
				const url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`;
				return <img src={url} alt='group' key={photo.id} />;
			})}
		</div>
	);
}
