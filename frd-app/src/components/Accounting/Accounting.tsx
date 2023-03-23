import { IonPage, IonContent, IonButton } from "@ionic/react";
import React, { useState } from "react";
import Finance from "./Finance";
import { Finance_summary } from "./Finance_summary";
import style from './Accounting.module.scss'
import Calculator from "./Calculator";
import { useHistory } from 'react-router';

// export const Accounting = () => {
//   return <div>Accounting</div>;
// };
const Accounting: React.FC = () => {
  // let [isOpen, setIsOpen] = useState<boolean>(false);
  const history = useHistory()
  // const tran = useHistory()
  const handleClick = () => {
    history.push('/Calculator')
    // console.log('cal');

  }
  const goToTransaction = () => {
    history.push('/Transaction')
    // console.log('fei hui transaction');

  }
  return (
    <>
      <IonPage>
        <IonContent >
          <div className={style.demo}>
            <Finance_summary />
          </div>
          <div className={style.main}>
            <Finance /></div>
          {/* <Accounting /> */}
          {/* <div className={style.cal}>{<Calculator isOpen={isOpen} bigState={() => setIsOpen(!isOpen)} />}
            {/* <Link to="/Calculator"></Link> */}
          {/* <IonButton onClick={() => { setIsOpen(true) }}>Add Transaction</IonButton></div>  */}
          <IonButton onClick={goToTransaction}>Review</IonButton>
          <IonButton onClick={handleClick}>Add Transaction</IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Accounting;