import abbreviate from 'number-abbreviate';

import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import GroupIcon from '@material-ui/icons/Group';
import PhotoIcon from '@material-ui/icons/Photo';
import ForumIcon from '@material-ui/icons/Forum';
import Grid from '@material-ui/core/Grid';

import useStyles from './styles';

export default function GroupCard({ group }) {
	const classes = useStyles();

	const memberCount = abbreviate(group.members, 1);
	const photoCount = abbreviate(group.pool_count, 1);

	const url =
		group.iconserver > 0
			? `http://farm${group.iconfarm}.staticflickr.com/${group.iconserver}/buddyicons/${group.nsid}.jpg`
			: 'https://www.flickr.com/images/buddyicon.gif';
	console.log(group);

	return (
		<Card className={classes.groupCard}>
			<Avatar alt={group.name} src={url} className={classes.avatar} />
			<main className={classes.cardDetails}>
				<Typography className={classes.cardName}>
					{group.name.length > 20 ? group.name.slice(0, 20).concat('...') : group.name}
				</Typography>
				<Grid container>
					<Grid item className={classes.footerItem}>
						<GroupIcon color='disabled' fontSize='small' />
						<Typography className={classes.footerText}>{memberCount}</Typography>
					</Grid>
					<Grid item className={classes.footerItem}>
						<PhotoIcon color='disabled' fontSize='small' />
						<Typography className={classes.footerText}>{photoCount}</Typography>
					</Grid>
					<Grid item className={classes.footerItem}>
						<ForumIcon color='disabled' fontSize='small' />
						<Typography className={classes.footerText}>{group.topic_count}</Typography>
					</Grid>
				</Grid>
			</main>
		</Card>
	);
}
