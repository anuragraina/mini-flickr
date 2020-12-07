import { Link } from 'react-router-dom';

import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

import useStyles from './styles';

export default function PaginationComponent({ data, searchKey }) {
	const classes = useStyles();

	return (
		<Pagination
			count={data.pages}
			color='secondary'
			size='small'
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
	);
}
