import React, { useState, useRef, useEffect } from 'react';

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Legend,
} from 'recharts';

import { ChevronDown } from 'lucide-react';
import { COLORS } from '../../../constants/constants';

const dateRanges = ['Weekly', 'Monthly', 'Yearly'];

const customerData = [
	{ month: 'Jan', current: 40000, lastYear: 60000 },
	{ month: 'Feb', current: 48000, lastYear: 42000 },
	{ month: 'Mar', current: 51000, lastYear: 50000 },
	{ month: 'Apr', current: 55000, lastYear: 47000 },
	{ month: 'May', current: 49000, lastYear: 62000 },
	{ month: 'Jun', current: 53000, lastYear: 58000 },
	{ month: 'Jul', current: 52000, lastYear: 50000 },
	{ month: 'Aug', current: 54000, lastYear: 46000 },
	{ month: 'Sep', current: 60000, lastYear: 48000 },
	{ month: 'Oct', current: 45000, lastYear: 52000 },
	{ month: 'Nov', current: 80000, lastYear: 61000 },
	{ month: 'Dec', current: 70000, lastYear: 61000 },
];

const CustomerAnalyticsChart: React.FC = () => {
	const [selectedRange, setSelectedRange] = useState('Weekly'); // Set default value
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className=''>
			<div className='flex items-center justify-between mb-4'>
				<p className=' text-lg' style={{ color: COLORS.primary }}>
					{' '}
					Total Customers{' '}
				</p>
				<div className='flex items-center space-x-2 '>
					<div className='relative ' ref={dropdownRef}>
						<button
							onClick={() => setIsOpen(!isOpen)}
							className='flex items-center text-xs text-[#9b111e] border px-1 py-1.5 rounded-md bg-white hover:bg-gray-50'
						>
							<span className='mr-1'>{selectedRange}</span>
							<ChevronDown className='w-6 h-4 text-[#9b111e]' />
						</button>
						{isOpen && (
							<div className='absolute mt-2 bg-white text-[#9b111e] border rounded-md shadow-lg z-10'>
								{dateRanges.map((range) => (
									<button
										key={range}
										onClick={() => {
											setSelectedRange(range);
											setIsOpen(false);
										}}
										className='block w-full text-left px-4 py-2 text-sm hover:text-red-600'
									>
										{range}
									</button>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			<ResponsiveContainer width='100%' height={300}>
				<LineChart
					data={customerData}
					margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
				>
					<defs>
						<linearGradient id='colorCurrent' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='0%' stopColor='#6366F1' stopOpacity={0.5} />
							<stop offset='100%' stopColor='#6366F1' stopOpacity={0.05} />
						</linearGradient>
						<linearGradient id='colorLastYear' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='0%' stopColor='#A5B4FC' stopOpacity={0.4} />
							<stop offset='100%' stopColor='#A5B4FC' stopOpacity={0.05} />
						</linearGradient>
					</defs>

					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='month' />
					<YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
					<Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
					<Legend />
					<Line
						type='monotone'
						dataKey='current'
						name='Current Year'
						stroke='#6366F1'
						fill='url(#colorCurrent)'
						strokeWidth={2}
						dot={{ r: 4 }}
						activeDot={{ r: 6 }}
					/>
					<Line
						type='monotone'
						dataKey='lastYear'
						name='Last Year'
						stroke='#A5B4FC'
						fill='url(#colorLastYear)'
						strokeDasharray='5 5'
						strokeWidth={2}
						dot={false}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default CustomerAnalyticsChart;
