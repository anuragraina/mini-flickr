import { Pie } from 'react-chartjs-2';

export default function Chart({ groups }) {
	console.log(groups);
	return (
		<div>
			<Pie
				data={{
					labels: groups.map(group => group.name),
					datasets: [
						{
							label: 'cdwvwvwevw',
							data: groups.map(group => parseInt(group.pool_count)),
						},
					],
				}}
				height={400}
				width={400}
			/>
		</div>
	);
}
