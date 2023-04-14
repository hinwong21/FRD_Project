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
            <Link
              key={index}
              to={{
                pathname: "./EditTodo",
                state: { data: todo, id: todo.id },
              }}
              className={styles.todoListWrapper}
            >
              <div className={styles.todoProgressIcon}>
                {todo.task.some((taskItem) => !taskItem.checked) ? (
                  <FontAwesomeIcon icon={faSpinner} color="red" />
                ) : (
                  <FontAwesomeIcon icon={faSquareCheck} color="green" />
                )}
              </div>
              <div className={styles.todoListTitle}>{todo.title}</div>
              <div className={styles.todoListDate}>
                {todo.due_date.slice(0, 10)}
              </div>
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
  //pass to todoReEditor
  // const [todoContent, setTodoContent] = useState("")
  const [memoEditorContent, setMemoEditorContent] = useState({});
  const [memoEditorId, setMemoEditorId] = useState("");
  //collected from Re-editor
  const [todoListTitle, setTodoListTitle] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todoHashtag, setTodoHashtag] = useState([] as string[]);
  const [todoNewHashtag, setTodoNewHashtag] = useState([] as string[]);
  const [todoEmail, setTodoEmail] = useState([] as string[]);
  const [todoTask, setTodoTask] = useState([] as {}[]);
  const [todoMemoRelated, setTodoMemoRelated] = useState([] as string[]);
  const [todoMemoDeleted, setTodoMemoDeleted] = useState([] as string[]);
  const [deleteHashtagArr, setDeleteHashtagArr] = useState([] as string[]);
  const [deleteEmailArr, setDeleteEmailArr] = useState([] as string[]);

  function onWillDismiss_memo(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      console.log("todo");
    }
  }

  const todoContent = {
    title: todoListTitle,
    due_date: todoDate,
    hashtag: todoHashtag,
    newHashtag: todoNewHashtag,
    shared_email: todoEmail,
    tasks: todoTask,
    memo: todoMemoRelated,
    todoMemoDeleted: todoMemoDeleted,
    deleteHashtagArr: deleteHashtagArr,
    deleteEmailArr: deleteEmailArr,
  };

  async function confirm_memo() {
    modal.current?.dismiss("", "confirm");

    //update local storage
    async function updateTodoLS(
      todoListTitle: string,
      todoDate: string,
      todoHashtag: string[],
      todoNewHashtag: string[],
      todoEmail: string[],
      todoTask: {}[],
      todoMemoRelated: string[],
      memoEditorId: string
    ) {
      const key = "todolist";
      const existingValue = await Preferences.get({ key });
      const existingData = existingValue.value
        ? JSON.parse(existingValue.value)
        : [];
      const index = existingData.findIndex(
        (item: { id: string }) => item.id === memoEditorId
      );
      if (index !== -1) {
        existingData[index].task = todoTask;
        existingData[index].title = todoListTitle;
        existingData[index].updated_at = JSON.stringify(new Date());
        existingData[index].due_date = todoDate;
        existingData[index].hashtag = [...todoHashtag, ...todoNewHashtag];
        existingData[index].email_shared = todoEmail;
        existingData[index].memo = todoMemoRelated;
      }
      const value = JSON.stringify(existingData);
      await Preferences.set({ key, value });
    }
    updateTodoLS(
      todoListTitle,
      todoDate,
      todoHashtag,
      todoNewHashtag,
      todoEmail,
      todoTask,
      todoMemoRelated,
      memoEditorId
    );

    const updateTodoHashtagsInPreferences = async (
      todoNewHashtags: string[],
      todolistId: string
    ) => {
      const key = "todo_hashtag";
      const existingValue = await Preferences.get({ key });
      const existingData = existingValue.value
        ? JSON.parse(existingValue.value)
        : [];

      const filteredData = existingData.filter(
        (data: any) => data.todolist_id !== todolistId
      );

      const newData = todoNewHashtags.map((hashtag) => ({
        hashtag_name: hashtag,
        todolist_id: todolistId,
      }));
      const updatedData = [...filteredData, ...newData];

      const value = JSON.stringify(updatedData);
      await Preferences.set({ key, value });
    };
    updateTodoHashtagsInPreferences(
      [...todoHashtag, ...todoNewHashtag],
      memoEditorId
    );

    const updateTodoEmailInPreferences = async (
      todoEmail: string[],
      todolistId: string
    ) => {
      const key = "todo_shared";
      const existingValue = await Preferences.get({ key });
      const existingData = existingValue.value
        ? JSON.parse(existingValue.value)
        : [];

      const filteredData = existingData.filter(
        (data: any) => data.todolist_id !== todolistId
      );

      const newData = todoEmail.map((email) => ({
        user_email: email,
        todolist_id: todolistId,
      }));
      const updatedData = [...filteredData, ...newData];

      const value = JSON.stringify(updatedData);
      await Preferences.set({ key, value });
    };
    updateTodoEmailInPreferences(todoEmail, memoEditorId);

    const updateTodoMemoInPreferences = async (
      todoMemoRelated: string[],
      todolistId: string
    ) => {
      const key = "todo_memo";
      const existingValue = await Preferences.get({ key });
      const existingData = existingValue.value
        ? JSON.parse(existingValue.value)
        : [];

      const filteredData = existingData.filter(
        (data: any) => data.todolist_id !== todolistId
      );

      const newData = todoMemoRelated.map((email) => ({
        memo_id: email,
        todolist_id: todolistId,
      }));
      const updatedData = [...filteredData, ...newData];

      const value = JSON.stringify(updatedData);
      await Preferences.set({ key, value });
    };
    updateTodoMemoInPreferences(todoMemoRelated, memoEditorId);


    //update db
    let token = await getName("token");
    const res = await fetch("http://localhost:8090/editors/update-todo", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: memoEditorId,
        content: todoContent,
      }),
    });
    const json = await res.json();
    console.log(json);

  }

  type dataType = {
    data: string;
    id: string;
  };

  const location = useLocation();
  const data = location.state as dataType;
  // console.log(data.data);

  const handleCallback = (childData: any) => {
    console.log(childData);
    setTodoListTitle(childData.todoTitle);
    setTodoDate(childData.todoDate);
    setTodoHashtag(childData.todoHashtag);
    setTodoNewHashtag(childData.todoNewHashtag);
    setTodoEmail(childData.todoEmail);
    setTodoTask(childData.todoTask);
    setTodoMemoRelated(childData.todoMemoRelated);
    setTodoMemoDeleted(childData.todoMemoDeleted);
    setDeleteHashtagArr(childData.deleteHashtagArr);
    setDeleteEmailArr(childData.deleteEmailArr);
  };

  useEffect(() => {
    setMemoEditorContent(data.data);
    setMemoEditorId(data.id);
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
                <Link to={"./TodoList"}>
                  <IonButton strong={true} onClick={() => confirm_memo()}>
                    Confirm
                  </IonButton>
                </Link>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <TodoReEditor
              content={memoEditorContent}
              handleCallback={handleCallback}
            />
          </IonContent>
        </IonModal>
      </IonPage>
    </>
  );
};

export default TodoLists;
