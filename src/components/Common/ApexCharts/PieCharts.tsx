"use client";

import React from "react";
import ReactApexChart from "./ReactApexChart";

interface PieChartsProps {
  series: number[];
  labels?: string[];
  height?: number;
  color?: string[];
}

const PieCharts = (props: PieChartsProps) => {
  const options: ApexCharts.ApexOptions = {
    colors: props?.color,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    labels: props?.labels || [],
  };

  return (
    <ReactApexChart
      type="donut"
      series={props?.series ?? []}
      height={props?.height ?? 250}
      options={options}
    />
  );
};

export default PieCharts;
