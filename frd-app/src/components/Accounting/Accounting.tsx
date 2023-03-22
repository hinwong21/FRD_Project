import { IonPage, IonContent } from "@ionic/react";
import React from "react";
import { Finance_summary } from "./Finance_summary";

// export const Accounting = () => {
//   return <div>Accounting</div>;
// };
const Accounting: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Finance_summary />
        {/* <Finance1 /> */}
        {/* <Calculator /> */}
      </IonContent>
    </IonPage>
  );
};

export default Accounting;