import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { TransactionTypeTemp } from "../../pages/AccountingPage";
import { useGet } from "../../hooks/useGet";

const TimePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  // fetch data from dailyTransactions based on the the selected date
  const formattedDate = "TODO";
  const [dailyTransactions, setDailyTransactions] = useGet<
    TransactionTypeTemp[]
  >(`/account/getSpecificDateTransaction?data=${formattedDate}`, []);

  return (
    <div className="App">
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        // onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        maxDate={new Date()}
        isClearable
        showYearDropdown
        scrollableYearDropdown
      />
      {/* <div>{JSON.stringify(dailyTransactions)}</div> */}
      {dailyTransactions.map((transaction) => (
        <div key={transaction.id}>{transaction.amount}</div>
      ))}
    </div>
  );
};

export default TimePicker;
