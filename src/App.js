import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Groups from './views/groups';
import Gallery from './views/gallery';

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
