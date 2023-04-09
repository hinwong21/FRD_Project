import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonPopover,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPlus, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import styles from "./TodoEditor.module.css";

interface NewTodoItemProps {
  content: string;
}

const NewTodoItem: React.FC<NewTodoItemProps> = ({ content }) => {
  const [isChecked, setIsCheck] = useState(false);

  return (
    <div className={styles.checkboxDiv}>
      <IonCheckbox></IonCheckbox>
      <IonLabel slot="start">{content}</IonLabel>
      <IonButton
        color="light"
        id="chooseDate"
        size="small"
        className={styles.diaryChooseDate}
      >
        <FontAwesomeIcon icon={faCalendar} />
      </IonButton>

      <IonPopover trigger="chooseDate" keepContentsMounted={true} arrow={false}>
        <IonDatetime presentation="date"></IonDatetime>
        <IonToolbar>
          <IonButton size="small" color="medium">
            Filter
          </IonButton>
        </IonToolbar>
      </IonPopover>
      <IonButton
        color="light"
        id="chooseDate"
        size="small"
        className={styles.diaryChooseDate}
      >
        <FontAwesomeIcon icon={faNoteSticky} />
      </IonButton>
    </div>
  );
};

export function TodoEditor(props: {
  handleCallback: (arg0: { todoTitle: string }) => void;
}) {
  const [todoListTitle, setTodoListTitle] = useState("New Todo");
  const [elements, setElements] = useState<string[]>([]);
  const [newItemInputValue, setNewItemInputValue] = useState("");

  const handleAddNewItem = () => {
    const newItem = `${newItemInputValue}`;
    setElements([...elements, newItem]);
  };

  useEffect(() => {
    props.handleCallback({
      todoTitle: todoListTitle,
    });
  }, [todoListTitle]);

  return (
    <>
      <IonInput
        placeholder="Enter the title"
        className={styles.todoListTitle}
        clearInput={true}
        maxlength={30}
        onIonChange={(event) => {
          setTodoListTitle(event.target.value as string);
        }}
      ></IonInput>

      <div className={styles.addTodoDiv}>
        <IonInput
          placeholder="Add a new task"
          className={styles.addNewTodoItem}
          maxlength={50}
          onIonChange={(event) => {
            setNewItemInputValue(event.target.value as string);
          }}
        ></IonInput>
        <button className={styles.addBtn}>
          <FontAwesomeIcon icon={faPlus} onClick={handleAddNewItem} />
        </button>
      </div>
      <div>
        {elements.map((element, index) => (
          <NewTodoItem key={index} content={element} />
        ))}
      </div>
    </>
  );
}

export default TodoEditor;
