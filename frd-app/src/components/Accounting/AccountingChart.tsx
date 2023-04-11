import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { TransactionType } from "./Finance";
import { getName } from "../../service/LocalStorage/LocalStorage";

// ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: [
//     "Income",
//     "Food",
//     "Transport",
//     "Drink",
//     "Entertainment",
//     "Bill",
//     "Consumption",
//     "Medical",
//     "Electronic",
//   ],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 19, 3, 5, 2, 3, 20, 10, 8],
//       backgroundColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//         "rgba(128, 128, 128, 1)",
//         "#55ff55",
//         "#5555FF",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//         "rgba(128, 128, 128, 1)",
//         "#55ff55",
//         "#5555FF",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

// export function AccountingChart() {
//   const [transactionBar, setTransactionBar] = useState<TransactionType[]>([]);
//   const [data, setData] = useState<ChartData<"line">>();
//   async function chartData() {
//     let token = await getName("token");
//     const res = await fetch(
//       `${process.env.REACT_APP_EXPRESS_SERVER_URL}/account/getTransaction`,
//       {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       }
//     );
//     let json = await res.json();
//     console.log(json);
//     setData({
//       labels: json.map((transaction: any) => transaction.type),
//       datasets: [
//         {
//           label: "Type",
//           data: json.map((transaction: any) => transaction.amount.toFixed(2)),
//           backgroundColor: [
//             "rgba(255, 99, 132, 1)",
//             "rgba(54, 162, 235, 1)",
//             "rgba(255, 206, 86, 1)",
//             "rgba(75, 192, 192, 1)",
//             "rgba(153, 102, 255, 1)",
//             "rgba(255, 159, 64, 1)",
//             "rgba(128, 128, 128, 1)",
//             "#55ff55",
//             "#5555FF",
//           ],
//           borderColor: [
//             "rgba(255, 99, 132, 1)",
//             "rgba(54, 162, 235, 1)",
//             "rgba(255, 206, 86, 1)",
//             "rgba(75, 192, 192, 1)",
//             "rgba(153, 102, 255, 1)",
//             "rgba(255, 159, 64, 1)",
//             "rgba(128, 128, 128, 1)",
//             "#55ff55",
//             "#5555FF",
//           ],
//         },
//       ],
//     });

//     /*     const labelName = json.filter(
//       (item:{ category: string | undefined }) => item.category === labels[]
//     ) */
//   }
//   return <Pie data={pieChart} />;
// }
function Piechart() {
  const [studentSubject, setStudentsubject] = useState([]);
  const [studentMarks, setStudentMarks] = useState([]);

  useEffect(() => {
    const sSubject: any = [];
    const sMarks: any = [];
    const getStudentdata = async () => {
      let token = await getName("token");
      const reqData = await fetch(
        `${process.env.REACT_APP_EXPRESS_SERVER_URL}/account/getTransaction`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const resData = await reqData.json();
      console.log(resData);

      for (let i = 0; i < resData.length; i++) {
        sSubject.push(resData[i].category);
        sMarks.push(parseInt(resData[i].amount));
      }
      setStudentsubject(sSubject);
      setStudentMarks(sMarks);
      console.log(resData);
    };

    getStudentdata();
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid mb-3">
        <h3 className="mt-3">Welcome to Piechart </h3>
        <Chart
          type="pie"
          width={500}
          height={300}
          series={studentMarks}
          options={{
            title: { text: "Student PieChart" },
            noData: { text: "Empty Data" },
            // colors:["#f90000","#f0f"],
            labels: studentSubject,
          }}
        ></Chart>
      </div>
    </React.Fragment>
  );
}
export default Piechart;
