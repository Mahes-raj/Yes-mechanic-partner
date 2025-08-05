import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { COLORS } from '../constants/constants';
import SideBar from '../components/Sidebar/SideBar';
import { useState } from 'react';

const MainLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	return (
		<div className='flex h-screen bg-gray-100'>
			{/* Sidebar takes up 1/9 of the width */}
			<div
				className={`${
					isSidebarOpen ? 'w-[200px]' : 'w-[68px]'
				} transition-all duration-300`}
			>
				<SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
			</div>

			{/* Main content takes up the remaining 8/9 of the width */}
			<div className='flex-1 flex flex-col overflow-hidden'>
				<Navbar hasNewBooking={true} />
				<main className='flex-1 overflow-auto scrollbar-hide'>
					<div
						className='p-2 rounded shadow'
						style={{ backgroundColor: COLORS.bgColor }}
					>
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};

export default MainLayout;
