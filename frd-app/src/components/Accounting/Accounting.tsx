import { IonPage, IonContent } from "@ionic/react";
import React from "react";
import Finance from "./Finance";
import { Finance_summary } from "./Finance_summary";
import style from './Accounting.module.scss'

// export const Accounting = () => {
//   return <div>Accounting</div>;
// };
const Accounting: React.FC = () => {
  return (
    <>
    <IonPage>
      <IonContent >
        <div className={style.demo}>
          <Finance_summary />
          </div>
          <div className={style.main}>
          <Finance /></div>
          {/* <Calculator /> */}

      </IonContent>
    </IonPage>
    </>
  );
};

export default Accounting;