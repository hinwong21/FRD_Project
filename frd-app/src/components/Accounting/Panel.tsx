import React from "react";
import styles from "./Panel.module.scss";

const num = [7, 8, 9, "+", 4, 5, 6, "-", 1, 2, 3, "x", 0, "AC", "=", "÷", "."];


type PanelProps = {
    operatingEvent: (element: string | number) => void
}

export function Panel(props: PanelProps) {

    const handler = (element: string | number) => {
        props.operatingEvent(element)
    };
    // const clickEvent = (event:any)=>{
    //     const element = event.target.value;
    //     props.operatingEvent(element);
    // }
    return (<div className={styles.panelContainer}>
        {
            num.map((element, idx) => {
                if (element === 0) {
                    return <button className={styles.zeroBtn} key={idx} onClick={() => {
                        handler(element);
                    }}>{element}</button>
                } else {
                    return <button className={styles.regularBtn} key={idx} onClick={() => {
                        handler(element);
                    }}>{element}</button>
                }


            }
            )
        }
    </div>)
}