import { useState, useEffect } from 'react';
import Flickr from 'flickr-sdk';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import Searchbar from './Searchbar';
import GroupCard from './GroupCard';
import PaginationComponent from './PaginationComponent';
import PieChart from './PieChart';

import useStyles from './styles';

//Creates a new Flickr REST API client
//for more details see https://www.npmjs.com/package/flickr-sdk#new-flickrauth
const flickr = new Flickr(process.env.REACT_APP_FLICKR_API_KEY);

export default function Groups({ location }) {
	const params = new URLSearchParams(location.search);
	const searchKey = params.get('searchKey');
	const page = params.get('page');
	const classes = useStyles();
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (searchKey) {
			setLoading(true);
			flickr.groups
				.search({
					text: searchKey,
					per_page: 12,
					page,
				})
				.then(response => {
					setLoading(false);
					setData(response.body.groups);
				})
				.catch(err => {
					setLoading(false);
					console.log(err);
				});
		} else {
			setLoading(false);
		}
	}, [searchKey, page]);

	return (
		<Container maxWidth='lg' className={classes.container}>
			<header className={classes.header}>
				<Grid container justify='space-around' alignItems='center'>
					<Grid item xs={12} md={7} className={classes.headerItem}>
						<Searchbar location={location} />
					</Grid>
					<Grid item xs={12} md={3} className={classes.headerItem}>
						<Button variant='contained' color='secondary' className={classes.button}>
							Search
						</Button>
					</Grid>
				</Grid>
			</header>
			{loading ? (
				<section className={classes.progressBar}>
					<LinearProgress color='secondary' />
				</section>
			) : (
				data.group &&
				(data.group.length > 0 ? (
					<>
						<Grid container spacing={3}>
							{data.group.map(groupItem => (
								<Grid item xs={12} sm={6} md={4} lg={3} key={groupItem.nsid}>
									<GroupCard group={groupItem} />
								</Grid>
							))}
						</Grid>
						<PaginationComponent data={data} searchKey={searchKey} />
						<PieChart groups={data.group} />
					</>
				) : (
					<h1>No results to display</h1>
				))
			)}
		</Container>
	);
}
