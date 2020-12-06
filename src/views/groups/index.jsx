import { useState } from 'react';
import Flickr from 'flickr-sdk';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Searchbar from './Searchbar';
import GroupCard from './GroupCard';
import useStyles from './styles';

//Creates a new Flickr REST API client
//for more details see https://www.npmjs.com/package/flickr-sdk#new-flickrauth
const flickr = new Flickr(process.env.REACT_APP_FLICKR_API_KEY);

export default function Groups() {
	const classes = useStyles();
	const [groups, setGroups] = useState([]);

	const search = async searchKey => {
		const response = await flickr.groups.search({
			text: searchKey,
		});
		console.log(response.body);
		setGroups(response.body.groups.group);
	};

	return (
		<Container maxWidth='lg'>
			<header className={classes.header}>
				<Grid container justify='center' alignItems='center'>
					<Grid item xs={12} md={9}>
						<Searchbar search={search} />
					</Grid>
					<Grid item xs={12} md={3}>
						<Button>Search</Button>
					</Grid>
				</Grid>
			</header>
			<main>
				<Grid container spacing={3}>
					{groups.map(group => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={group.nsid}>
							<GroupCard group={group} />
						</Grid>
					))}
				</Grid>
			</main>
		</Container>
	);
}
