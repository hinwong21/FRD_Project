import { IonContent, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState } from 'react'


interface Genre {
  id: number;
  name: string;
  type: string;
}

const Genres: Genre[] = [
  {
    id: 1,
    name: 'Income',
    type: 'income',
  },
  {
    id: 2,
    name: 'Food',
    type: 'outcome',
  },
  {
    id: 3,
    name: 'Drink',
    type: 'outcome',
  },
    {
    id: 4,
    name: 'Transport',
    type: 'outcome',
  },
    {
    id: 3,
    name: 'Entertainment',
    type: 'outcome',
  },
    {
    id: 3,
    name: 'Bill',
    type: 'outcome',
  },
    {
    id: 3,
    name: 'Consumption',
    type: 'outcome',
  },
    {
    id: 3,
    name: 'Medical',
    type: 'outcome',
  },
    {
    id: 3,
    name: 'Electronic',
    type: 'outcome',
  },
];

const compareWith = (o1: Genre, o2: Genre) => {
  if (!o1 || !o2) {
    return o1 === o2;
  }

  if (Array.isArray(o2)) {
    return o2.some((o) => o.id === o1.id);
  }

  return o1.id === o2.id;
};

export const Transaction = () => {
  const [currentGenre, setCurrentGenre] = useState('');

  return (
    <IonList>
      <IonItem>
        <IonSelect
          placeholder="Select Genre"
          compareWith={compareWith}
          onIonChange={(ev) => setCurrentGenre(JSON.stringify(ev.detail.value))}
          multiple={true}
        >
          {Genres.map((Genre) => (
            <IonSelectOption key={Genre.id} value={Genre}>
              {Genre.name}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
      <IonItem lines="none">
        <IonLabel>Current value: {currentGenre}</IonLabel>
      </IonItem>
    </IonList>
  );
}




// function App() {
//     const today = new Date(); // 获取当前时间
//     const date = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`; // 格式化日期

//     return (
//         <div>
//             <h1>今日日期：{date}</h1>
//         </div>
//     );
// }
// export default App;
    // return (
    //     <IonPage>
    //         <IonContent fullscreen>
    //             <div>Statistics</div>
    //             <IonList>
    //                 <IonItem>
    //                     <IonSelect interface="action-sheet" placeholder="Select fruit">
    //                         <IonSelectOption value="income">Income</IonSelectOption>
    //                         <IonSelectOption value="Genre">Genre</IonSelectOption>
    //                         <IonSelectOption value="drink">Drink</IonSelectOption>
    //                         <IonSelectOption value="transport">Transport</IonSelectOption>
    //                         <IonSelectOption value="entertainment">Entertainment</IonSelectOption>
    //                         <IonSelectOption value="bill">Bill</IonSelectOption>
    //                         <IonSelectOption value="consumption">Consumption</IonSelectOption>
    //                         <IonSelectOption value="medical">Medical</IonSelectOption>
    //                         <IonSelectOption value="electronic">Electronic</IonSelectOption>
    //                     </IonSelect>
    //                 </IonItem>
    //             </IonList>

    //         </IonContent>
    //     </IonPage>
    // );