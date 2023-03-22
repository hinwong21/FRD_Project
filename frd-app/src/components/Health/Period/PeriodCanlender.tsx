import React, { useState, useEffect } from "react";
import moment, { Moment } from "moment";

const PeriodCalendar = () => {
  const [cycleStart, setCycleStart] = useState(moment());
  const [cycleEnd, setCycleEnd] = useState(moment().add(4, "days"));
  const [days, setDays] = useState<Moment[]>([]);

  useEffect(() => {
    const newDays: Moment[] = [];
    let day = moment(cycleStart);

    while (day.isSameOrBefore(cycleEnd, "day")) {
      newDays.push(day);
      day = day.clone().add(1, "day");
    }

    setDays(newDays);
  }, [cycleStart, cycleEnd]);

  return (
    <div>
      <h2>月经周期日历</h2>
      {days.map((day) => (
        <div key={day.format("YYYY-MM-DD")}>
          {day.format("dddd, MMMM Do YYYY")}
        </div>
      ))}
    </div>
  );
};

export default PeriodCalendar;
