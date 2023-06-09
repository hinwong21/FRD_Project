// import "./App.css";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import CryptoSummary from "./components/CryptoSummary";
// import { Crypto } from "./Types";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import type { ChartData, ChartOptions } from "chart.js";
// import moment from "moment";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function App() {
//   const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
//   const [selected, setSelected] = useState<Crypto[]>([]);

//   const [data, setData] = useState<ChartData<"line">>();
//   const [options, setOptions] = useState<ChartOptions<"line">>({
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       title: {
//         display: true,
//         text: "Chart.js Line Chart",
//       },
//     },
//   });

//   //   useEffect(() => {
//   //     const url =
//   //       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
//   //     axios.get(url).then((response) => {
//   //       setCryptos(response.data);
//   //     });
//   //   }, []);

//   useEffect(() => {
//     if (!selected) return;
//     axios
//       .get(
//         `https://api.coingecko.com/api/v3/coins/${
//           selected?.id
//         }/market_chart?vs_currency=usd&days=${range}&${
//           range === 1 ? "interval=hourly" : `interval=daily`
//         }`
//       )
//       .then((response) => {
//         console.log(response.data);
//         setData({
//           labels: response.data.prices.map((price: number[]) => {
//             return moment
//               .unix(price[0] / 1000)
//               .format(range === 1 ? "HH:MM" : "MM-DD");
//           }),
//           datasets: [
//             {
//               label: "Dataset 1",
//               data: response.data.prices.map((price: number[]) => {
//                 return price[1].toFixed(2);
//               }),
//               borderColor: "rgb(255, 99, 132)",
//               backgroundColor: "rgba(255, 99, 132, 0.5)",
//             },
//           ],
//         });
//         setOptions({
//           responsive: true,
//           plugins: {
//             legend: {
//               display: false,
//             },
//             title: {
//               display: true,
//               text:
//                 `${selected?.name} Price Over Last ` +
//                 range +
//                 (range === 1 ? " Day." : " Days."),
//             },
//           },
//         });
//       });
//   }, [selected, range]);

//   //   useEffect(() => {
//   //     console.log("SELECTED:", selected);
//   //   }, [selected]);

//   function updateOwned(crypto: Crypto, amount: number): void {
//     console.log("updatwOwned", crypto, amount);
//     let temp = [...selected];
//     let tempObj = temp.find((c) => c.id === crypto.id);
//     if (tempObj) {
//       tempObj.owned = amount;
//       setSelected(temp);
//     }
//   }
//   return (
//     <>
//       <div className="App">
//         <select
//           onChange={(e) => {
//             const c = cryptos?.find((x) => x.id === e.target.value) as Crypto;
//             setSelected([...selected, c]);
//           }}
//           defaultValue="default"
//         >
//           <option value="default">Choose an option</option>
//           {cryptos
//             ? cryptos.map((crypto) => {
//                 return (
//                   <option key={crypto.id} value={crypto.id}>
//                     {crypto.name}
//                   </option>
//                 );
//               })
//             : null}
//         </select>
//       </div>

//       {selected.map((s) => {
//         return <CryptoSummary crypto={s} updateOwned={updateOwned} />;
//       })}

//       {/*selected ? <CryptoSummary crypto={selected} /> : null*/}

//       {/*data ? (
//                 <div style={{ width: 600 }}>
//                     <Line options={options} data={data} />
//                 </div>
//             ) : null*/}
//       {selected
//         ? "Your portfolio is worth: $" +
//           selected
//             .map((s) => {
//               if (isNaN(s.owned)) {
//                 return 0;
//               }

//               return s.current_price * s.owned;
//             })
//             .reduce((prev, current) => {
//               console.log("prev, current", prev, current);
//               return prev + current;
//             }, 0)
//             .toLocaleString(undefined, {
//               minimumFractionDigits: 2,
//               maximumFractionDigits: 2,
//             })
//         : null}
//     </>
//   );
// }

// export default App;
// // import React from "react";
// // import { Pie, Doughnut } from "react-chartjs-2";

// // const state = {
// //   labels: ["January", "February", "March", "April", "May"],
// //   datasets: [
// //     {
// //       label: "Rainfall",
// //       backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4", "#6800B4"],
// //       hoverBackgroundColor: [
// //         "#501800",
// //         "#4B5000",
// //         "#175000",
// //         "#003350",
// //         "#35014F",
// //       ],
// //       data: [65, 59, 80, 81, 56],
// //     },
// //   ],
// // };

// // export default class App extends React.Component {
// //   render() {
// //     return (
// //       <div>
// //         <Pie
// //           data={state}
// //           options={{
// //             title: {
// //               display: true,
// //               text: "Average Rainfall per month",
// //               fontSize: 20,
// //             },
// //             legend: {
// //               display: true,
// //               position: "right",
// //             },
// //           }}
// //         />

// //         <Doughnut
// //           data={state}
// //           options={{
// //             title: {
// //               display: true,
// //               text: "Average Rainfall per month",
// //               fontSize: 20,
// //             },
// //             legend: {
// //               display: true,
// //               position: "right",
// //             },
// //           }}
// //         />
// //       </div>
// //     );
// //   }
// // }

// please install npm install react-apexcharts apexcharts
// import React, { useState, useEffect } from "react";
// import Chart from "react-apexcharts";
// function Piechart() {
//   const [stdudentSubject, setStudentsubject] = useState([]);
//   const [studentMarks, setStudentMarks] = useState([]);

//   useEffect(() => {
//     const sSubject: any[] | ((prevState: never[]) => never[]) = [];
//     const sMarks = [];
//     const getStudentdata = async () => {
//       const reqData = await fetch("http://localhost/reactgraphtutorial/marks");
//       const resData = await reqData.json();
//       for (let i = 0; i < resData.length; i++) {
//         sSubject.push(resData[i].subject);
//         sMarks.push(parseInt(resData[i].marks));
//       }
//       setStudentsubject(sSubject);
//       setStudentMarks(sMarks);
//       //console.log(resData);
//     };

//     getStudentdata();
//   }, []);

//   return (
//     <React.Fragment>
//       <div className="container-fluid mb-3">
//         <h3 className="mt-3">Welcome to Piechart </h3>
//         <Chart
//           type="pie"
//           width={1349}
//           height={550}
//           series={studentMarks}
//           options={{
//             title: { text: "Student PieChart" },
//             noData: { text: "Empty Data" },
//             // colors:["#f90000","#f0f"],
//             labels: stdudentSubject,
//           }}
//         ></Chart>
//       </div>
//     </React.Fragment>
//   );
// }
// export default Piechart;
