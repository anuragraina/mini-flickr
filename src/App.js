import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Groups from './views/groups';
import Gallery from './views/gallery';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	fakeToolbar: {
		...theme.mixins.toolbar,
	},
}));

function App() {
	const classes = useStyles();

	return (
		<>
			<AppBar position='fixed'>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						Mini Flickr
					</Typography>
				</Toolbar>
			</AppBar>
			<div className={classes.fakeToolbar} />
			<Router>
				<Switch>
					<Route path='/groups' component={Groups} />
					<Route path='/gallery' component={Gallery} />
					<Route>
						<Redirect to='/groups' />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
