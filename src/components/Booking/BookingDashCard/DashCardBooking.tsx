// import { ChartCard } from "../LineChart/LineChart";
import React from "react";
import ApexChart from "../BookingRadialBar/RadialBarBoking";

type DashboardCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  per: number;
  perColor: string;
  borderColor: string;
  backgroundColor: string;
  dataPoints: number[];
};

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  per,
  perColor,
  backgroundColor,
}) => {
    //bg-[#FAF3EB]
  return (
    <div className="rounded-xl bg-[white] shadow-md p-4 w-full max-w-[250px] h-[150px] ">
      <div className="flex items-center justify-between ">
        {/* Icon box */}
        <div
          className="w-10 h-10 rounded-md flex items-center justify-center "
          style={{ backgroundColor }}
        >
          <div className="text-white text-xl">{icon}</div>
        </div>

        {/* Title and Value */}
        <div className="flex flex-col justify-center ml-2 grow">
          <p className="text-xs text-[#9b111e]">{title}</p>
          <h3 className="text-xl font-semibold text-[#e3957d]">{value}</h3>
        </div>

        {/* Percentage */}
        <div>
          <span className="text-md font-bold" style={{ color: perColor }}>
            {per}%
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="-mt-6 ">
        <ApexChart value={per} color={backgroundColor}/>
      </div>
      
    </div>
  );
};

export default DashboardCard;
