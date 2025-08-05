import { AiOutlineCopyrightCircle, AiOutlineDashboard } from 'react-icons/ai';
import { FONTS } from '../../constants/constants';
import DashboardCard from '../../components/dashboard/DashboradCard/DashboradCard';
import { Card, CardContent } from '../../components/dashboard/ui/card';
import {
	AiOutlineThunderbolt,
	AiOutlineClockCircle,
	AiFillCheckCircle,
} from 'react-icons/ai';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	LineChart,
	Line,
} from 'recharts';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DashboardProfile, getMeDeatails } from './service';

const dailyRevenueData = [
	{ day: 'Mon', revenue: 500 },
	{ day: 'Tue', revenue: 700 },
	{ day: 'Wed', revenue: 600 },
	{ day: 'Thu', revenue: 800 },
	{ day: 'Fri', revenue: 750 },
	{ day: 'Sat', revenue: 900 },
	{ day: 'Sun', revenue: 650 },
];

const weeklyRevenueData = [
	{ week: 'Week 1', revenue: 3500 },
	{ week: 'Week 2', revenue: 4200 },
	{ week: 'Week 3', revenue: 3900 },
	{ week: 'Week 4', revenue: 4800 },
];

const monthlyRevenueData = [
	{ month: 'Jan', revenue: 4000 },
	{ month: 'Feb', revenue: 3000 },
	{ month: 'Mar', revenue: 5000 },
	{ month: 'Apr', revenue: 4000 },
	{ month: 'May', revenue: 6000 },
	{ month: 'Jun', revenue: 5000 },
	{ month: 'Jul', revenue: 4000 },
	{ month: 'Aug', revenue: 3000 },
	{ month: 'Sep', revenue: 5000 },
	{ month: 'Oct', revenue: 4000 },
	{ month: 'Nov', revenue: 6000 },
	{ month: 'Dec', revenue: 8000 },
];

//  spare parts revenue data
const dailySparePartsRevenueData = [
	{ day: 'Mon', sparePartsRevenue: 200 },
	{ day: 'Tue', sparePartsRevenue: 300 },
	{ day: 'Wed', sparePartsRevenue: 250 },
	{ day: 'Thu', sparePartsRevenue: 350 },
	{ day: 'Fri', sparePartsRevenue: 300 },
	{ day: 'Sat', sparePartsRevenue: 400 },
	{ day: 'Sun', sparePartsRevenue: 320 },
];

const weeklySparePartsRevenueData = [
	{ week: 'Week 1', sparePartsRevenue: 1500 },
	{ week: 'Week 2', sparePartsRevenue: 1700 },
	{ week: 'Week 3', sparePartsRevenue: 1600 },
	{ week: 'Week 4', sparePartsRevenue: 1800 },
];

const monthlySparePartsRevenueData = [
	{ month: 'Jan', sparePartsRevenue: 1600 },
	{ month: 'Feb', sparePartsRevenue: 1400 },
	{ month: 'Mar', sparePartsRevenue: 2000 },
	{ month: 'Apr', sparePartsRevenue: 1800 },
	{ month: 'May', sparePartsRevenue: 2200 },
	{ month: 'Jun', sparePartsRevenue: 2700 },
	{ month: 'Jul', sparePartsRevenue: 1600 },
	{ month: 'Aug', sparePartsRevenue: 1400 },
	{ month: 'Sep', sparePartsRevenue: 2000 },
	{ month: 'Oct', sparePartsRevenue: 1800 },
	{ month: 'Nov', sparePartsRevenue: 2200 },
	{ month: 'Dec', sparePartsRevenue: 2700 },
];

const bookingData = [
	{ name: 'Service A', bookings: 240 },
	{ name: 'Service B', bookings: 130 },
	{ name: 'Service C', bookings: 90 },
	{ name: 'Service D', bookings: 25 },
	{ name: 'Service E', bookings: 50 },
];

const Dashboard = () => {
	const navigate = useNavigate();
	const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

	// Combine revenue and spare parts revenue data for the selected period
	let data = [];
	let xDataKey = '';

	async function fetchProfile() {
		await DashboardProfile()
		const profile = await getMeDeatails()
		console.log(profile.data,"prfile data")
		localStorage.setItem("PartnerId",profile.data._id)
	}

	useEffect(() => {
		fetchProfile()
	}, []);

	if (period === 'daily') {
		data = dailyRevenueData.map((item, index) => ({
			...item,
			sparePartsRevenue:
				dailySparePartsRevenueData[index]?.sparePartsRevenue || 0,
		}));
		xDataKey = 'day';
	} else if (period === 'weekly') {
		data = weeklyRevenueData.map((item, idx) => ({
			...item,
			sparePartsRevenue:
				weeklySparePartsRevenueData[idx]?.sparePartsRevenue || 0,
		}));
		xDataKey = 'week';
	} else {
		data = monthlyRevenueData.map((item, idx) => ({
			...item,
			sparePartsRevenue:
				monthlySparePartsRevenueData[idx]?.sparePartsRevenue || 0,
		}));
		xDataKey = 'month';
	}
	return (
		<div className='w-full px-8 py-6 -mt-6 dashboard'>
			{/* Header */}
			<div>
				<p
					className='text-xl font-semibold  mt-5 py-3 '
					style={{ ...FONTS.header }}
				>
					Dashboard
				</p>
				<p
					className='text-gray-500 text-sm pb-5 '
					style={{ ...FONTS.paragraph }}
				>
					Service details latest updates and statistics
				</p>
			</div>
			<div className='rounded-xl shadow-md bg-white pb-4  pt-4 mb-4'>


				{/* Dashboard Cards */}
				<div className='mx-8 justify-center items-center px-2'>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-10'>
						<DashboardCard
							icon={<AiOutlineThunderbolt />}
							title='Active Services'
							value={10}
							per={10}
							perColor='#facc15'
							borderColor='rgba(234,179,8,0.8)'
							backgroundColor='#facc15'
							dataPoints={[1, 5, 1, 5]}
						/>
						<DashboardCard
							icon={<AiOutlineClockCircle />}
							title='Pending Services'
							value={2}
							per={-5}
							perColor='#f87171'
							borderColor='rgba(248,113,113,0.8)'
							backgroundColor='#f87171'
							dataPoints={[6, 5, 4, 4, 4, 4, 4.5, 1]}
						/>
						<DashboardCard
							icon={<AiFillCheckCircle />}
							title='Completed Services'
							value={10}
							per={5}
							perColor='#3b82f6'
							borderColor='rgba(59,130,246,0.8)'
							backgroundColor='#3b82f6'
							dataPoints={[1, 4, 3, 3, 3, 3, 5]}
						/>
						<DashboardCard
							icon={<AiOutlineDashboard />}
							title='Overall Services'
							value={22}
							per={15}
							perColor='#10b981'
							borderColor='rgba(16,185,129,0.8)'
							backgroundColor='#10b981'
							dataPoints={[1, 5, 2, 4, 3, 5, 6]}
						/>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 my-3'>
				<motion.div whileHover={{ scale: 1.01 }}>
					<Card className='rounded-xl shadow-lg mr-2'>
						<CardContent>
							<div className='flex justify-between items-center mb-4'>
								<h2
									style={{
										...FONTS.header,
										fontWeight:500,
										fontSize:20
								
									}}
								>
									{period.charAt(0).toUpperCase() + period.slice(1)} Revenue
								</h2>
								<select
									value={period}
									onChange={(e) =>
										setPeriod(e.target.value as 'daily' | 'weekly' | 'monthly')
									}
									className='border rounded px-2 py-1'
									style={{...FONTS.cardSubHeader}}
									aria-label='Select period'
								>
									<option value='daily' style={{...FONTS.cardSubHeader}}>Daily</option>
									<option value='weekly'style={{...FONTS.cardSubHeader}}>Weekly</option>
									<option value='monthly'style={{...FONTS.cardSubHeader}}>Monthly</option>
								</select>
							</div>

							<ResponsiveContainer width='100%' height={250}>
								<LineChart data={data}>
									<XAxis dataKey={xDataKey} style={{...FONTS.cardSubHeader,fontSize:14}} />
									<YAxis style={{...FONTS.cardSubHeader,fontSize:14}} />
									<Tooltip />
									<Line
										type='monotone'
										dataKey='revenue'
										stroke='#F49BAB'
										strokeWidth={2}
										name='Service Revenue'
									/>
									<Line
										type='monotone'
										dataKey='sparePartsRevenue'
										stroke='#4CAF50'
										strokeWidth={2}
										name='Spare Parts Revenue'
									/>
								</LineChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div whileHover={{ scale: 1.01 }}>
					<Card className='rounded-xl shadow-lg'>
						<CardContent>
							<h2
								className='mb-4'
								style={{
										...FONTS.header,
										fontWeight:500,
										fontSize:20
								
									}}
							>
								Service Bookings
							</h2>
							<ResponsiveContainer width='100%' height={254}>
								<BarChart data={bookingData}>
									<XAxis dataKey='name' style={{...FONTS.cardSubHeader,fontSize:14}} />
									<YAxis style={{...FONTS.cardSubHeader,fontSize:14}} />
									<Tooltip />
									<Bar dataKey='bookings' fill='#FFDBDB' />
								</BarChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div
					whileHover={{}}
					className='md:col-span-2 xl:col-span-3 mt-3 '
				// ref={bookingsRef}
				>
					<Card
						className={`transition-all  duration-500 p-4 rounded-xl
							${NaN ? 'ring-4 ring-yellow-400 bg-#E9E9E9' : ''}
						`}
					>
						<CardContent className="">
							<h2
								className='mb-4 '
								style={{
										...FONTS.header,
										fontWeight:500,
										fontSize:20
								
									}}
							>
								Recent Bookings
							</h2>
							<div className='overflow-x-auto'>
								<table className='table-auto w-full min-w-max border-collapse '>
									<thead>
										<tr className='bg-[#e9e9e9] text-left'>
											<th
												className='p-2'
												style={{...FONTS.tableHeader,}}
											>
												Customer
											</th>
											<th
												className='p-2 relative'
												style={{...FONTS.tableHeader,}}
											>
												Service
												<span className='absolute top-1 bg-green-100 text-green-600 text-[10px] font-semibold px-2 py-1 rounded-full shadow-sm ml-1'>
													New Bookings
												</span>
											</th>
											<th
												className='p-2'
												style={{...FONTS.tableHeader,}}
											>
												Date
											</th>
											<th
												className='p-2'
												style={{...FONTS.tableHeader,}}
											>
												Time
											</th>
											<th
												className=''
												style={{...FONTS.tableHeader,}}
											>
												Details
											</th>
										</tr>
									</thead>
									<tbody>
										<tr style={{...FONTS.cardSubHeader}}>
											<td className='p-2'>John Doe</td>
											<td className='p-2'>Oil Change</td>
											<td className='p-2'>2025-05-20</td>
											<td className='p-2'>9:30 am</td>
											<td>
												<button
													className='bg-[#7812A4] px-2 py-1 rounded-full'
													onClick={() => navigate('/service')}
													style={{ ...FONTS.cardSubHeader, color:'white'! }}
												>
													View
												</button>
											</td>
										</tr>
										<tr style={{...FONTS.cardSubHeader}}>
											<td className='p-2'>Jane Smith</td>
											<td className='p-2'>Brake Inspection</td>
											<td className='p-2'>2025-05-22</td>
											<td className='p-2'>1:45 am</td>
											<td>
												<button
													className='bg-[#7812A4] px-2 py-1 rounded-full'
													style={{ ...FONTS.cardSubHeader, color: 'white'! }}
													onClick={() => navigate('/service')}
												>
													View
												</button>
											</td>
										</tr>
										<tr style={{...FONTS.cardSubHeader}}>
											<td className='p-2'>Bob Johnson</td>
											<td className='p-2'>Tire Rotation</td>
											<td className='p-2'>2025-05-23</td>
											<td className='p-2'>8:10 pm</td>
											<td>
												<button
													className='bg-[#7812A4] px-2 py-1 rounded-full'
													onClick={() => navigate('/service')}
													style={{ ...FONTS.cardSubHeader, color:'white'! }}
												>
													View
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>

			{/* Footer */}
			<footer className='bg-white shadow-md rounded-xl p-4 w-full text-center my-6 -mb-8'>
				<div className='flex justify-between items-center'>
					<div className='flex items-center justify-center space-x-1'>
						<AiOutlineCopyrightCircle style={{ ...FONTS.cardSubHeader,fontWeight:600}} size={18} />
						<span style={{ ...FONTS.cardSubHeader,fontWeight:600}}>YesMechanic Partner</span>
					</div>
					<div>
						<Link to={'/privacy-policy'} className="mx-2"style={{ ...FONTS.cardSubHeader}}>
							Privacy Policy
						</Link>
						<Link to={'/terms-conditions'} className=" mx-2 "style={{ ...FONTS.cardSubHeader}}>
							Terms & Conditions
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Dashboard;
