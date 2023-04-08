import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { TransactionType } from "./Finance";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [
    "Income",
    "Food",
    "Transport",
    "Drink",
    "Entertainment",
    "Bill",
    "Consumption",
    "Medical",
    "Electronic",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3, 20, 10, 8],
      backgroundColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(128, 128, 128, 1)",
        "#55ff55",
        "#5555FF",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
        "rgba(128, 128, 128, 1)",
        "#55ff55",
        "#5555FF",
      ],
      borderWidth: 1,
    },
  ],
};

export function AccountingChart() {
  const [label, setLabel] = useState<TransactionType[]>([]);
  return <Pie data={data} />;
}
