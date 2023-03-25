import { IonButton, IonButtons, IonContent, IonItem, IonLabel, IonList, IonModal, IonPage, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useRef, useState } from 'react'


interface Genre {
    id: number;
    name: string;
    type: string;
}

export const Genres: Genre[] = [
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
        id: 5,
        name: 'Entertainment',
        type: 'outcome',
    },
    {
        id: 6,
        name: 'Bill',
        type: 'outcome',
    },
    {
        id: 7,
        name: 'Consumption',
        type: 'outcome',
    },
    {
        id: 8,
        name: 'Medical',
        type: 'outcome',
    },
    {
        id: 9,
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

// export
let Transaction: React.FC<{ isTran: boolean, tr_set: (b: boolean) => void }> = ({ isTran, tr_set }) => {
    const [currentGenre, setCurrentGenre] = useState('');
    const modal = useRef<HTMLIonModalElement>(null);
    return (
        <IonModal ref={modal} isOpen={isTran}>

            <IonButtons slot="start">
                <IonButton onClick={() => { modal.current?.dismiss(); tr_set(false) }}>Close</IonButton>
            </IonButtons>
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
        </IonModal>
    );
}
export default Transaction;