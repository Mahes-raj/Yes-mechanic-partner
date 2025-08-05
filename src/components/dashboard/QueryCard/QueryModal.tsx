// components/QueryModal.tsx
import React from 'react';
import { QueryCard } from './QueryCard';
// import { AiOutlineRight } from "react-icons/ai";

type Query = {
	id: number;
	title: string;
	desc: string;
	profilePicUrl: string;
	time?: string;
};

type Props = {
	queries: Query[];
	onClose: () => void;
	onSelect: (query: Query) => void;
};

export const QueryModal: React.FC<Props> = ({ queries, onClose, onSelect }) => {
	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
			<div className='bg-white rounded-xl shadow-lg p-6 w-11/12 max-w-2xl max-h-[80vh] overflow-y-auto'>
				<div className='flex justify-between items-center mb-4'>
					<h2 className='text-xl font-semibold'>All Queries</h2>
					<button
						className='text-gray-500 hover:text-gray-700'
						onClick={onClose}
					>
						Close
					</button>
				</div>
				{queries.map((query) => (
					<QueryCard
						key={query.id}
						icon={null}
						title={query.title}
						desc={query.desc}
						profilePicUrl={query.profilePicUrl}
						time={query.time}
						onClick={() => onSelect(query)}
					/>
				))}
			</div>
		</div>
	);
};
