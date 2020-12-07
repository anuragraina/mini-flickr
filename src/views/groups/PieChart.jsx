import { Pie } from 'react-chartjs-2';

import useStyles from './styles';

export default function Chart({ groups }) {
	const classes = useStyles();
	const dynamicColors = () => {
		var r = Math.floor(Math.random() * 255);
		var g = Math.floor(Math.random() * 255);
		var b = Math.floor(Math.random() * 255);
		return `rgba(${r},${g},${b},0.5)`;
	};

	return (
		<section className={classes.chart}>
			<Pie
				data={{
					labels: groups.map(group => group.name),
					datasets: [
						{
							label: 'cdwvwvwevw',
							data: groups.map(group => parseInt(group.pool_count)),
							backgroundColor: groups.map(_ => dynamicColors()),
						},
					],
				}}
				height={400}
				width={400}
			/>
		</section>
	);
}
