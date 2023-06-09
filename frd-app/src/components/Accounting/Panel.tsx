import React, { useState } from "react";
import styles from "./Panel.module.scss";
import { useHistory } from "react-router";

const num = [
  7,
  8,
  9,
  "+",
  4,
  5,
  6,
  "-",
  1,
  2,
  3,
  "x",
  0,
  ".",
  "=",
  "÷",
  "AC",
  "✔",
  "⌫",
];

type PanelProps = {
  operatingEvent: (element: string | number) => void;
};

export function Panel(props: PanelProps) {
  // const [enter, setEnter] = useState<boolean>(false);
  const history = useHistory();
  const handler = (element: string | number) => {
    props.operatingEvent(element);
  };

  function clickSubmit() {
    // setEnter(true);
    history.push("/Accounting");
    console.log("clickSubmit");
  }

  // const clickEvent = (event:any)=>{
  //     const element = event.target.value;
  //     props.operatingEvent(element);
  // }
  return (
    <div className={styles.panelContainer}>
      {num.map(
        (element, idx) => {
          // if (element === "AC") {
          //     return <button className={styles.acBtn} key={idx} onClick={() => {
          //         handler(element);
          //     }}>{element}</button>
          // } else if (element === "⌫") {
          //     return <button className={styles.delBtn} key={idx} onClick={() => {
          //         handler(element);
          //     }}>{element}</button>
          // } else if (element === "✔") {
          //     return <button className={styles.clickBtn} key={idx} onClick={() =>
          //         clickSubmit()}> {element}</button>
          // } else {
          return (
            <button
              className={styles.regularBtn}
              key={idx}
              onClick={() => {
                handler(element);
              }}
            >
              {element}
            </button>
          );
        }
        // }
      )}
    </div>
  );
}
