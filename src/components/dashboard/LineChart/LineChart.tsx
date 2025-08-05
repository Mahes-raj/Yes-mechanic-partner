import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import React from 'react';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Filler
);

type Props = {
	dataPoints: number[];
	borderColor: string;
	backgroundColor: string;
};

export const ChartCard: React.FC<Props> = ({
	dataPoints,
	borderColor,
	backgroundColor,
}) => {
	const data = {
		labels: dataPoints.map((_, i) => i + 1),
		datasets: [
			{
				data: dataPoints,
				borderColor,
				backgroundColor,
				fill: true,
				tension: 0.5,
				pointRadius: 0,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false as const,
		plugins: {
			legend: { display: false },
			tooltip: { enabled: false },
		},
		scales: {
			x: {
				display: false,
				grid: { display: false },
			},
			y: {
				display: false,
				grid: { display: false },
			},
		},
	};

	return (
		<div className='h-14'>
			<Line data={data} options={options} />
		</div>
	);
};
