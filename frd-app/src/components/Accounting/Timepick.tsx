// import React, { useEffect, useState } from "react";
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";
// import { TransactionTypeTemp } from "../../pages/AccountingPage";
// import { useGet } from "../../hooks/useGet";

// const TimePicker = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   // fetch data from dailyTransactions based on the the selected date
//   const [dailyTransactions, setDailyTransactions] = useGet<
//     TransactionTypeTemp[]
//   >("/account/getSpecificDateTransaction", []);

//   const firm = () => {
//     // get the formatted date to pass to the API endpoint
//     const a = new Date();
//     const url = `/account/getSpecificDateTransaction?date=${formattedDate}`;

//     // fetch the daily transactions based on the selected date
//     const [data, setData] = useGet<TransactionTypeTemp[]>(url, []);
//     setDailyTransactions(data);
//   };

//   return (
//     <div className="App">
//       <DatePicker
//         selected={startDate}
//         onChange={(date: Date) => setStartDate(date)}
//         // onChange={handleDateChange}
//         dateFormat="dd/MM/yyyy"
//         maxDate={new Date()}
//         isClearable
//         showYearDropdown
//         scrollableYearDropdown
//       />
//       {/* <div>{JSON.stringify(dailyTransactions)}</div> */}
//       <button onClick={firm}>Firm</button>
//       {dailyTransactions.map((transaction) => (
//         <div key={transaction.id}>{transaction.amount}</div>
//       ))}
//     </div>
//   );
// };

// export default TimePicker;
