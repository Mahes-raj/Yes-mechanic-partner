import React from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";

interface ApexChartProps {
  value: number;
  color: string;
}

const ApexChart: React.FC<ApexChartProps> = ({ value, color }) => {
  const options: ApexCharts.ApexOptions = {
  chart: {
    type: "radialBar",
    offsetY: -20,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: "#e7e7e7",
        strokeWidth: "60%",  
        margin: 5,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          offsetY: -2,
          fontSize: "15px",
          color:color,
        },
      },
      hollow: {
        size: "60%",  
      },
    },
  },
  grid: {
    padding: {
      top: 10,
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 53, 91],
      colorStops: [
        { offset: 0, color, opacity: 1 },
        { offset: 100, color, opacity: 1 },
      ],
    },
  },
  
};


  const series = [value];

  return (
    <div className="flex justify-center items-center p-4">
      <ReactApexChart options={options} series={series} type="radialBar" height={200} />
    </div>
  );
};

export default ApexChart;
