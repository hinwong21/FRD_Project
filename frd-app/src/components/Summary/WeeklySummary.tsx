import React from "react";
import ReactApexChart from "react-apexcharts";
import style from "./Summary.module.scss";

const LineChart = () => {
  const chartOptions = {
    chart: {
      id: "basic-line",
      zoom: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
        formatter: function (val: any) {
          switch (val) {
            case 1:
              return "大凶";
            case 2:
              return "凶";
            case 3:
              return "末吉";
            case 4:
              return "吉";
            case 5:
              return "小吉";
            case 6:
              return "中吉";
            case 7:
              return "大吉";
            default:
              return val;
          }
        },
      },
      title: {
        text: "fortune",
      },
      tickAmount: 7,
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      title: {
        text: "Week",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        switch (val) {
          case 1:
            return "大凶";
          case 2:
            return "凶";
          case 3:
            return "末吉";
          case 4:
            return "吉";
          case 5:
            return "小吉";
          case 6:
            return "中吉";
          case 7:
            return "大吉";
          default:
            return val;
        }
      },
      offsetX: -3,
    },
    series: [
      {
        name: "Fortune",
        data: [1, 2, 3, 2, 4, 6, 5],
      },
    ],
    colors: ["#8d4b33"],
    grid: {
      show: false,
    },
  };

  return (
    <div className={style.chartContainer}>
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="line"
        height={250}
      />
    </div>
  );
};

export default LineChart;
