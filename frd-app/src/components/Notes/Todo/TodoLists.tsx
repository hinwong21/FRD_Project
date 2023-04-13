import {
  IonPage,
  IonContent,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonButton,
  IonButtons,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState, Component, useRef } from "react";
import styles from "../Notes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faSquare,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Preferences } from "@capacitor/preferences";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { getName } from "../../../service/LocalStorage/LocalStorage";
import { Link, useLocation } from "react-router-dom";
import ReEditTextEditor from "../Memo/ReEditTextEditor";
import TodoReEditor from "./TodoReEditor";

interface TodoListLSItem {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  title: string;
  due_date: string;
  hashtag: string[];
  email_shared: string[];
  task: {
    id: string;
    content: string;
    checked: boolean;
  }[];
  memo: any[];
}

export const TodoLists: React.FC = () => {
  // const [todoListLS, setTodoListLS] = useState([] as {}[])
  const [todoListLS, setTodoListLS] = useState<TodoListLSItem[]>([]);

  const getTodoListLS = async () => {
    const { value } = await Preferences.get({ key: "todolist" });
    if (value !== null) {
      setTodoListLS(JSON.parse(value));
    }
    console.log(JSON.parse(value as string));
  };

  useEffect(() => {
    getTodoListLS();
  }, []);

  return (
    <>
      <IonItemGroup>
        <IonItemDivider>
          <IonLabel className={styles.todoLabel}>Todo</IonLabel>
        </IonItemDivider>

        <div className={styles.todoListContainer}>
          {todoListLS.map((todo, index) => (
            <Link key={index} 
            to={{pathname:"./EditTodo", state:{data: todo, id: todo.id}}}
            className={styles.todoListWrapper}>
              <div className={styles.todoProgressIcon}>
                {todo.task.some((taskItem) => !taskItem.checked) ? (
                  <FontAwesomeIcon icon={faSpinner} color="red" />
                ) : (
                  <FontAwesomeIcon icon={faSquareCheck} color="green" />
                )}
              </div>
              <div className={styles.todoListTitle}>{todo.title}</div>
              <div>{todo.due_date.slice(0, 10)}</div>
            </Link>
          ))}
        </div>
      </IonItemGroup>
    </>
  );
};


export const EditTodo = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);


  const [memoEditorContent, setMemoEditorContent] = useState({});
  const [memoEditorId, setMemoEditorId] = useState("")

  function onWillDismiss_memo(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      console.log("todo");
    }
  }

  async function confirm_memo () {
    modal.current?.dismiss("", "confirm");
    let token = await getName("token")
    
    // const res = await fetch ("http://localhost:8080/editors/update-memo",{
    //   method: "PUT",
    //   headers:{
    //   Authorization:"Bearer " + token,
    //   "Content-type":"application/json"},
    //   body: JSON.stringify({
    //     id: memoEditorId,
    //     content:memoContent
    //   })
    // })
    // const json= await res.json()
    // console.log(json)
  }

  type dataType = {
    data:string,
    id:string
  }

  const location = useLocation();
  const data= location.state as dataType;
  
  
  useEffect(() => {
    setMemoEditorContent(`${JSON.parse(data.data as string)}`)
    setMemoEditorId(data.id)
  }, []);

  return (
    <>
      <IonPage>
        <IonModal
          ref={modal}
          onWillDismiss={(ev) => onWillDismiss_memo(ev)}
          isOpen={true}
        >
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <Link to={"./TodoList"}>
                  <IonButton>Cancel</IonButton>
                </Link>
              </IonButtons>
              <IonTitle>Edit Todo</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm_memo()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <TodoReEditor handleCallback={function (arg0: { todoTitle: string; todoDate: string; todoHashtag: string[]; todoNewHashtag: string[]; todoEmail: string[]; todoTask: {}[]; todoMemoRelated: string[]; }): void {
              throw new Error("Function not implemented.");
            } }
            />
          </IonContent>
        </IonModal>
      </IonPage>
    </>
  );
};

export default TodoLists;
