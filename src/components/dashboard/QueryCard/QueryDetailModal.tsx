// components/QueryDetailModal.tsx
import React from 'react';

type Query = {
	id: number;
	title: string;
	desc: string;
	profilePicUrl: string;
	time?: string;
};

type Props = {
	query: Query;
	onClose: () => void;
};

export const QueryDetailModal: React.FC<Props> = ({ query, onClose }) => {
	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
			<div className='bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-md'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-xl font-semibold'>Query Details</h2>
					<button
						className='text-gray-500 hover:text-gray-700'
						onClick={onClose}
					>
						Close
					</button>
				</div>
				<div className='flex items-center mb-4'>
					<div className='w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0'>
						<img
							src={query.profilePicUrl}
							alt='Profile'
							className='w-full h-full object-cover'
						/>
					</div>
					<div>
						<p className='font-semibold'>{query.title}</p>
						<p className='text-xs text-gray-500'>{query.time}</p>
					</div>
				</div>
				<p className='text-gray-700'>{query.desc}</p>
			</div>
		</div>
	);
};
