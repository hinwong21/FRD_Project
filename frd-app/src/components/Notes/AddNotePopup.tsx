import React, { useState } from "react";
import { IonButton, IonFab, IonFabButton, IonFabList } from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBook,
  faPen,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { DiaryEditor } from "./DiaryEditor";
import { TodoListEditor } from "./TodoListEditor";
import MemoEditor, { TextEditor } from "./TextEditor";

import styles from "./Notes.module.css";
import "./Notes.module.css";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";

export const AddNotePopup: React.FC = () => {
  const [diaryOpen, setDiaryOpen] = useState(false);

  const list = {
    options: [
      {
        icon: <FontAwesomeIcon icon={faBook} />,
        text: "Diary",
      },
      {
        icon: <FontAwesomeIcon icon={faPen} />,
        text: "Memo",
      },
      {
        icon: <FontAwesomeIcon icon={faCheck} />,
        text: "TodoList",
      },
    ],
  };

  // function openEditor(editorType:string){
  //   console.log(editorType)

  // }

  // const [present, dismiss] = useIonModal(NewEventForm, {
  //   onDismiss: (data: string, role: string) => dismiss(data, role),
  // });

  // function openModal() {
  //   present({
  //     onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
  //       if (ev.detail.role === "confirm") {
  //         // setMessage(`Hello, ${ev.detail.data}!`);
  //       }
  //     },
  //   });
  // }

  return (
    <>
      <IonFab
        slot="fixed"
        vertical="bottom"
        horizontal="end"
        className={styles.fabButton}
      >
        <IonFabButton>
          <FontAwesomeIcon icon={faPlus} />
        </IonFabButton>
        <IonFabList side="top">
          {list.options.map((item, index) => (
            <IonFabButton key={index}>
              <IonButton>
                <div>{list.options[index].icon}</div>
              </IonButton>
            </IonFabButton>
          ))}
        </IonFabList>
      </IonFab>
    </>
  );
};

export default AddNotePopup;
