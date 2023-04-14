import { IonIcon } from "@ionic/react";
import { waterOutline } from "ionicons/icons";
import React, { useCallback, useState } from "react";

import styles from "./PeriodDate.module.scss";
import { LevelInfo } from "./PeriodDay";

export default function StatusItem(props: {
  icon: string;
  type: string;
  lv: number;
  onLevelChange: (newLevel: LevelInfo) => void;
}) {
  const [level, setLevel] = useState<number>(0);

  // const handleAdd = () => {
  //   if (level < props.lv) {
  //     setLevel(level + 1);
  //     // 呼叫父component中的函數更新level值
  //     props.onLevelChange({ type: `${props.type}`, lv: level + 1 });
  //   } else if (level >= props.lv) {
  //     return;
  //   }
  // };
  const handleAdd = useCallback(() => {
    if (level < props.lv) {
      setLevel(level + 1);
      // 呼叫父component中的函數更新level值
      props.onLevelChange({ type: `${props.type}`, lv: level + 1 });
    } else if (level >= props.lv) {
      return;
    }
  }, [level, props]);

  const handleSubtract = useCallback(() => {
    setLevel(level - 1);
    // 呼叫父component中的函數更新level值
    props.onLevelChange({ type: `${props.type}`, lv: level - 1 });
  }, [level, props]);

  return (
    <div className={styles.statusContainer}>
      <div className={styles.statusItem}>
        <div className={styles.item}>
          <IonIcon
            className={styles.statusIcon}
            icon={props.icon}
            slot="start"
          ></IonIcon>
          <div className={styles.type}>{props.type}</div>
        </div>
        {/* <LevelBtn lv={props.lv} getValue={props.getValue} /> */}
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
      </div>
    </div>
  );
}
