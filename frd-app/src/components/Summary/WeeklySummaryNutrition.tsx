import React from "react";
import style from "./Summary.module.scss";
import ReactApexChart from "react-apexcharts";

export const WeeklySummaryNutrition = () => {
  const chartData = {
    series: [
      {
        name: "Calories",
        data: [1784, 1823, 1755, 1874, 1709, 1845, 1633],
      },
      {
        name: "Carbs",
        data: [1296, 1254, 1311, 1254, 1345, 1298, 1197],
      },
      {
        name: "Protein",
        data: [375, 402, 475, 398, 376, 354, 324],
      },
      {
        name: "Fat",
        data: [370, 353, 387, 375, 385, 364, 375],
      },
    ],
    options: {
      chart: {
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
      yaxis: {
        title: {
          text: "calories",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return +val + "calories";
          },
        },
      },
    },
  };

  return (
    <>
        <div id="chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
            height={350}
          />
        </div>
        <div className={style.weeklySummaryNutritionResult}>
          Good Diet Week !
        </div>
    </>
  );
};
