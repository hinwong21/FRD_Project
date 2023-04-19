import React from "react";
import ReactApexChart from "react-apexcharts";
import style from "./Summary.module.scss";

export const WeeklySummaryFortune = () => {
  let fortuneData = [1, 2, 3, 2, 4, 6, 5];
  let sum = 0;
  fortuneData.forEach((e) => (sum += e));
  let averageFortune = parseFloat((sum / fortuneData.length).toFixed(1));

  let weeklyFortune = "";
  if (averageFortune >= 7) {
    weeklyFortune = "大吉";
  } else if (averageFortune >= 6 && averageFortune < 7) {
    weeklyFortune = "中吉";
  } else if (averageFortune >= 5 && averageFortune < 6) {
    weeklyFortune = "小吉";
  } else if (averageFortune >= 4 && averageFortune < 5) {
    weeklyFortune = "吉";
  } else if (averageFortune >= 3 && averageFortune < 4) {
    weeklyFortune = "末吉";
  } else if (averageFortune >= 2 && averageFortune < 3) {
    weeklyFortune = "凶";
  } else {
    weeklyFortune = "大凶";
  }

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
        data: fortuneData,
      },
    ],
    colors: ["#8d4b33"],
    grid: {
      show: false,
    },
  };
  return (
    <>
      <div className={style.chartContainer}>
        <ReactApexChart
          options={chartOptions}
          series={chartOptions.series}
          type="line"
          height={250}
        />
      </div>
      <div className={style.weeklySummaryFortuneResult}>Your fortune in this week: {weeklyFortune}</div>
    </>
  );
};
