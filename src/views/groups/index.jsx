import { useState, useEffect } from 'react';
import Flickr from 'flickr-sdk';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

import Searchbar from './Searchbar';
import GroupCard from './GroupCard';
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

	useEffect(() => {
		searchKey &&
			flickr.groups
				.search({
					text: searchKey,
					per_page: 20,
					page,
				})
				.then(response => {
					//console.log(response.body.groups);
					setData(response.body.groups);
				})
				.catch(err => {
					console.log(err);
				});
	}, [searchKey, page]);

	console.log(data);

	return (
		<Container maxWidth='lg' className={classes.container}>
			<header className={classes.header}>
				<Grid container justify='center' alignItems='center'>
					<Grid item xs={12} md={9}>
						<Searchbar location={location} />
					</Grid>
					<Grid item xs={12} md={3}>
						<Button>Search</Button>
					</Grid>
				</Grid>
			</header>
			{data.group &&
				(data.group.length > 0 ? (
					<>
						<Grid container spacing={3}>
							{data.group.map(groupItem => (
								<Grid item xs={12} sm={6} md={4} lg={3} key={groupItem.nsid}>
									<GroupCard group={groupItem} />
								</Grid>
							))}
						</Grid>
						<Pagination
							count={data.pages}
							color='secondary'
							page={data.page}
							className={classes.pagination}
							renderItem={item => (
								<PaginationItem
									component={Link}
									to={`/groups?searchKey=${searchKey}${
										item.page === 1 ? '' : `&page=${item.page}`
									}`}
									{...item}
								/>
							)}
						/>
					</>
				) : (
					<h1>No results to display</h1>
				))}
		</Container>
	);
}
