import { IonPage, IonContent, IonButton } from "@ionic/react";
import React, { useCallback, useRef, useState } from "react";
import Finance from "./Finance";
import { Finance_summary } from "./Finance_summary";
import style from './Accounting.module.scss'
import Calculator from "./Calculator";
import { useHistory } from 'react-router';
import Transaction from "./Transaction";

// export const Accounting = () => {
//   return <div>Accounting</div>;
// };
const Accounting: React.FC = () => {

  let [isOpen, setIsOpen] = useState<boolean>(false);
  let [isTran, setIstran] = useState<boolean>(false);
  const history = useHistory()
  const cb_set = useCallback((boo: boolean) => handleClick(boo), [])
  const tr_set = useCallback((b: boolean) => anotherHandleClick(b), [])
  const anotherHandleClick = (b: boolean) => {
    setIstran(b)
  }

  const handleClick = (boo: boolean) => {
    console.log('hi');
    setIsOpen(boo)
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
          <Transaction isTran={isTran} tr_set={tr_set} />
          <Calculator isOpen={isOpen} cb_set={cb_set} />

          {/* <IonButton onClick={goToTransaction}>Review</IonButton> */}
          <IonButton expand="block"
            onClick={() => anotherHandleClick(true)}
          >Review</IonButton>
          <IonButton expand="block"
            onClick={() => handleClick(true)}
          >Add Transaction</IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Accounting;