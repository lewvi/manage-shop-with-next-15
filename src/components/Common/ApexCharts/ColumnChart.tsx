import React from "react";
import ReactApexChart from "./ReactApexChart";

interface ColumnChartProps {
  series: any[];
  categories: string[];
  height?: number;
  color?: string[];
  showCategories?: boolean;
}

const ColumnChart = (props: ColumnChartProps) => {
  const {
    series,
    categories,
    height = 350,
    color,
    showCategories = false,
  } = props;

  const options: ApexCharts.ApexOptions = {
    colors: color,
    xaxis: {
      type: "category",
      categories: categories,
      labels: {
        show: showCategories,
      },
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "60px",
      },
    },
  };

  return (
    <ReactApexChart
      type="bar"
      options={options}
      series={series || []}
      height={height}
    />
  );
};

export default ColumnChart;
