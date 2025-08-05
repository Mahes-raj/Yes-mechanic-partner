// components/QueryCard.tsx
import React from 'react';

type Props = {
	icon: React.ReactNode;
	title: string;
	desc: string;
	profilePicUrl: string;
	time?: string;
	onClick?: () => void;
};

const getIndiaDateTime = () => {
	return new Intl.DateTimeFormat('en-IN', {
		timeZone: 'Asia/Kolkata',
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		hour12: true,
	}).format(new Date());
};

export const QueryCard: React.FC<Props> = ({
	title,
	icon,
	desc,
	profilePicUrl,
	time,
	onClick,
}) => {
	return (
		<div className='hover:scale-[1.02] transition-transform duration-200 ease-in-out cursor-pointer'>
			<div className='w-full cursor-pointer' onClick={onClick}>
				<div className='flex items-center bg-[#FAF3EB] rounded-xl shadow-md p-4 justify-between mt-2'>
					<div className='w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0'>
						<img
							src={profilePicUrl}
							alt='Profile'
							className='w-full h-full object-cover'
						/>
					</div>
					<div className='flex-1 text-start'>
						<p className='font-semibold'>{title}</p>
						<p className='font-thin line-clamp-1'>{desc}</p>
						<p className='text-xs text-gray-500 mt-1'>
							{time || getIndiaDateTime()}
						</p>
					</div>
					<div className='w-10 h-10 flex items-center justify-center text-xl text-green-600'>
						{icon}
					</div>
				</div>
			</div>
		</div>
	);
};
