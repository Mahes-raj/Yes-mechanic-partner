
import React from 'react';
import { FONTS } from '../../../constants/constants';

type DashboardCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  per: number;
  perColor: string;
  borderColor: string;
  backgroundColor: string;
  dataPoints?: number[]; // Optional since chart is not used
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  per,
  perColor,
  borderColor,
  backgroundColor,
}) => {
  return (
    <div className='rounded-xl bg-[E8d6f0] shadow-md p-4 w-full max-w-[250px] h-[130px]'>
      <div className='flex items-center justify-between'>
        {/* Icon Box */}
        <div
          className='w-10 h-10 rounded-md flex items-center justify-center'
          style={{ backgroundColor }}
        >
          <div className='text-white text-xl'>{icon}</div>
        </div>

        {/* Title and Value */}
        <div className='flex flex-col justify-center ml-2 grow'>
          <p className='text-xs text-gray-500'style={{ ...FONTS.paragraph, fontSize:14 }}>{title}</p>
          <h3 style={{ ...FONTS.tableHeader, fontWeight: 700 }}>{value}</h3>
        </div>

        {/* Percentage */}
        <div>
          <span className='text-xs font-bold' style={{ color: perColor }}>
            {per}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className='w-full bg-gray-200 rounded-full h-3 mt-4 overflow-hidden'>
        <div
          className='h-3 rounded-full transition-all duration-500 ease-in-out'
          style={{
            width: `${Math.min(Math.max(per, 0), 100)}%`,
            backgroundColor: borderColor,
          }}
        />
      </div>
    </div>
  );
};

export default DashboardCard;
