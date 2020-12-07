import { useState, useEffect } from 'react';
import Flickr from 'flickr-sdk';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';

import Searchbar from './Searchbar';
import GroupCard from './GroupCard';
import useStyles from './styles';

//Creates a new Flickr REST API client
//for more details see https://www.npmjs.com/package/flickr-sdk#new-flickrauth
const flickr = new Flickr(process.env.REACT_APP_FLICKR_API_KEY);

export default function Groups({ location }) {
	const classes = useStyles();
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const searchKey = params.get('searchKey');

		searchKey &&
			flickr.groups
				.search({
					text: searchKey,
					per_page: 20,
				})
				.then(response => {
					console.log(response.body);
					setGroups(response.body.groups.group);
				})
				.catch(err => {
					console.log(err);
				});
	}, [location.search]);

	return (
		<Container maxWidth='lg' className={classes.container}>
			<header className={classes.header}>
				<Grid container justify='center' alignItems='center'>
					<Grid item xs={12} md={9}>
						<Searchbar />
					</Grid>
					<Grid item xs={12} md={3}>
						<Button>Search</Button>
					</Grid>
				</Grid>
			</header>
			<Grid container spacing={3}>
				{groups.map(group => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={group.nsid}>
						<GroupCard group={group} />
					</Grid>
				))}
			</Grid>
			<Pagination count={groups.length} color='secondary' className={classes.pagination} />
		</Container>
	);
}
