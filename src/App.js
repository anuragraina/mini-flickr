import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
//import Flickr from 'flickr-sdk';

import Groups from './views/groups';
import Gallery from './views/gallery';

//const flickr = new Flickr(process.env.REACT_APP_FLICKR_API_KEY);

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/groups' component={Groups} />
				<Route path='/gallery' component={Gallery} />
				<Route>
					<Redirect to='/groups' />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
