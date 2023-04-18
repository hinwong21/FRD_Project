import React, { useEffect } from "react";
import { getName } from "../../service/LocalStorage/LocalStorage";

export const WeeklySummaryTodo = () => {
  useEffect(() => {
    getTodoData();
  }, []);

  const getTodoData = async () => {
    let getData: any = await getName("todolist");
    let data: any = JSON.parse(getData);

    let checked = data[0].task.checked
  };

  return <div>WeeklySummaryTodo</div>;
};
