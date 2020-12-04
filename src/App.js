import { useEffect } from 'react';
import Flickr from 'flickr-sdk';

const flickr = new Flickr(process.env.REACT_APP_FLICKR_API_KEY);

function App() {
	useEffect(() => {
		flickr.photos
			.getInfo({
				photo_id: 25825763, // sorry, @dokas
			})
			.then(function (res) {
				console.log('yay!', res.body);
			})
			.catch(function (err) {
				console.error('bonk', err);
			});
	}, []);

	return <div>dsvfsbf</div>;
}

export default App;
