import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { useGet } from "../../hooks/useGet";

// ChartJS.register(ArcElement, Tooltip, Legend);

type MonthlyTransaction = {
  category: string;
  amount: string;
};

function Piechart() {
  const [studentSubject, setStudentsubject] = useState([]);
  const [studentMarks, setStudentMarks] = useState([]);
  const [resData, setResData] = useGet<MonthlyTransaction[]>(
    "/account/getMonthlyTransaction",
    []
  );

  useEffect(() => {
    const sSubject: any = [];
    const sMarks: any = [];

    // const getStudentdata = async () => {
    // let token = await getName("token");
    // const reqData = await fetch(
    //   `${process.env.REACT_APP_EXPRESS_SERVER_URL}/account/getMonthlyTransaction`,
    //   {
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   }
    // );
    // const resData = await reqData.json();
    console.log("AccountingChart : ", resData);

    for (let i = 0; i < resData.length; i++) {
      const category = resData[i].category;
      const mark = parseInt(resData[i].amount);
      let index = sSubject.indexOf(category); // 尋找目前類別在 sSubject 陣列中的位置
      if (index >= 0) {
        sMarks[index] += mark;
      } else {
        // 如果目前類別不存在於 sSubject 陣列中
        sSubject.push(category); // 把目前類別加到 sSubject 陣列尾端
        sMarks.push(mark); // 把目前項目的分數加到 sMarks 陣列尾端
      }
    }

    setStudentsubject(sSubject);
    setStudentMarks(sMarks);
    // console.log(resData);
    // };

    // getStudentdata();
  }, [resData]);

  return (
    <React.Fragment>
      <div className="container-fluid mb-3">
        {/* <h3 className="mt-3">Welcome to Piechart </h3> */}
        <Chart
          type="pie"
          width={350}
          height={300}
          series={studentMarks}
          options={{
            title: { text: "Monthly Summary" },
            noData: { text: "Empty Data" },
            // colors:["#f90000","#f0f"],
            labels: studentSubject,
            legend: {
              onItemClick: { toggleDataSeries: true },
              onItemHover: { highlightDataSeries: true },
              position: "right",
            },
          }}
        ></Chart>
      </div>
    </React.Fragment>
  );
}
export default Piechart;
