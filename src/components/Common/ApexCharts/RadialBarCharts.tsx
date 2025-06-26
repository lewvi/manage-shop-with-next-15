import React from "react";
import ReactApexChart from "./ReactApexChart";

interface RadialBarChartsProps {
  series: number[];
  height?: number;
  colors?: string[];
  labels?: string[];
}
const RadialBarCharts = (props: RadialBarChartsProps) => {
  const { series, height = 350, colors, labels } = props;

  const options: ApexCharts.ApexOptions = {
    colors: colors || [],
    labels: labels || [],
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: true,
            fontSize: "16px",
            formatter: function (val) {
              return `${val ?? 0}`;
            },
          },
        },
      },
    },
  };

  return (
    <ReactApexChart
      type="radialBar"
      series={series}
      height={height}
      options={options}
    />
  );
};

export default RadialBarCharts;
