import React, { useState } from "react";
import styles from "./PeriodDate.module.scss";

export default function LevelBtn(props: { lv: number }) {
  let [level, setLevel] = useState(0);
  const handleAdd = () => {
    if (level < props.lv) {
      setLevel(level + 1);
    } else if (level >= props.lv) {
      setLevel(5);
    }
  };

  const handleSubtract = () => {
    setLevel(level - 1);
  };

  return (
    <div>
      {level === 0 ? (
        <div onClick={handleAdd} className={styles.addStatus}>
          Add
        </div>
      ) : (
        <div>
          <span className={styles.miniBtnS} onClick={handleSubtract}>
            -
          </span>
          <span className={styles.levelNum}>{level}</span>

          <span className={styles.miniBtnA} onClick={handleAdd}>
            +
          </span>
        </div>
      )}
    </div>
  );
}
