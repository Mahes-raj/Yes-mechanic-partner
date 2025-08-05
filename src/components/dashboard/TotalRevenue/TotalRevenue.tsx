import React, { useState, useRef, useEffect } from 'react';

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from 'recharts';
import { ChevronDown } from 'lucide-react';
import { FONTS } from '../../../constants/constants';

//for data
const data = [
	{ month: 'Jan', newRevenue: 50, oldRevenue: 30 },
	{ month: 'Feb', newRevenue: 35, oldRevenue: 47 },
	{ month: 'Mar', newRevenue: 25, oldRevenue: 39 },
	{ month: 'Apr', newRevenue: 40, oldRevenue: 26 },
	{ month: 'May', newRevenue: 12, oldRevenue: 45 },
	{ month: 'Jun', newRevenue: 32, oldRevenue: 22 },
	{ month: 'Jul', newRevenue: 24, oldRevenue: 33 },
	{ month: 'Aug', newRevenue: 50, oldRevenue: 18 },
	{ month: 'Sep', newRevenue: 35, oldRevenue: 50 },
	{ month: 'Oct', newRevenue: 25, oldRevenue: 29 },
	{ month: 'Nov', newRevenue: 40, oldRevenue: 41 },
	{ month: 'Dec', newRevenue: 12, oldRevenue: 36 },
];

//for drop down
const dateRanges = ['Center1', 'Center2', 'Center3', 'Center4', 'Center5'];

const TotalRevenue: React.FC = () => {
	const [selectedRange, setSelectedRange] = useState('Center1'); // Set default value
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
		<div className='bg-white w-full mx-auto relative'>
			<div className='flex justify-between items-center '>
				{/* content  */}
				<div>
					<h2 className='text-lg ' style={{...FONTS.paragraph, fontWeight: 500, fontSize: '18px' }}>
						Total Revenue
					</h2>
					<div className='flex space-x-4 text-xs mt-4'>
						<div className='flex items-center space-x-1 text-blue-600'>
							<span className='h-2 w-2 bg-[#ffdede] rounded-full'></span>
							<span className='text-[#ffdede]'>Old Revenue</span>
						</div>
						<div className='flex items-center space-x-1 text-rose-400'>
							<span className='h-2 w-2 bg-[#ffc4c4] rounded-full'></span>
							<span className='text-[#ffc4c4]'>New Revenue</span>
						</div>
					</div>
				</div>

				{/* Dropdown */}
				<div className='relative' ref={dropdownRef}>
					<button
						onClick={() => setIsOpen(!isOpen)}
						className='flex items-center text-xs border px-1 py-1.5 rounded-md text-[#9b111e] bg-white hover:bg-gray-50'
					>
						<span className='mr-1'>{selectedRange}</span>
						<ChevronDown className='w-6 h-4 text-[#9b111e]' />
					</button>
					{isOpen && (
						<div className='absolute mt-2 bg-white h-20 text-[#9b111e] overflow-hidden overflow-y-auto border rounded-md shadow-lg z-10'>
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

			{/* Chart */}
			<div className=' -ml-10'>
				<ResponsiveContainer width='100%' height={100}>
					<BarChart data={data}>
						<CartesianGrid strokeDasharray='3 3' vertical={false} />
						<XAxis dataKey='month' />
						<YAxis />
						<Tooltip />
						<Bar
							dataKey='oldRevenue'
							fill='#ffdede'
							barSize={10}
							radius={[6, 6, 0, 0]}
						/>
						<Bar
							dataKey='newRevenue'
							fill='#ffc4c4'
							barSize={10}
							radius={[6, 6, 0, 0]}
						/>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default TotalRevenue;
