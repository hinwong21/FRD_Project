import React, { useEffect, useRef, useState } from "react";
import {
  IonButton,
  IonFab,
  IonFabButton,
  IonFabList,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonContent,
  useIonModal,
  IonModal,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
} from "@ionic/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBook,
  faPen,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { DiaryEditor } from "./Diary/DiaryEditor";
import { TodoEditor } from "./Todo/TodoEditor";
import { TextEditor } from "./TextEditor/TextEditor";
import { v4 as uuidv4 } from "uuid";
import styles from "./Notes.module.css";
import "./Notes.module.css";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { getName } from "../../service/LocalStorage/LocalStorage";
import { Preferences } from "@capacitor/preferences";
import { useDispatch } from 'react-redux';
import { setShouldGetDataMemo } from '../../redux/Notes/memoSlice';
import { setShouldGetDataTodo } from '../../redux/Notes/todoSlice';
import { setShouldGetDataDiary } from '../../redux/Notes/diarySlice';

export const AddNotePopup: React.FC = () => {
  const [diaryOpen, setDiaryOpen] = useState(false);
  const [memoOpen, setMemoOpen] = useState(false);
  const [todoOpen, setTodoOpen] = useState(false);

  const handleOpenDiaryFunc = () => {
    setDiaryOpen(true);
  };

  const handleOpenMemoFunc = () => {
    setMemoOpen(true);
  };

  const handleOpenTodoFunc = () => {
    setTodoOpen(true);
  };

  const handleDiaryDismiss = (
    status: boolean | ((prevState: boolean) => boolean)
  ) => {
    setDiaryOpen(status);
  };

  const handleMemoDismiss = (
    status: boolean | ((prevState: boolean) => boolean)
  ) => {
    setMemoOpen(status);
  };

  const handleTodoDismiss = (
    status: boolean | ((prevState: boolean) => boolean)
  ) => {
    setTodoOpen(status);
    console.log(todoOpen);
  };

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
          {/* <IonFabButton > */}
          <IonFabButton id="openDiary" onClick={handleOpenDiaryFunc}>
            <div>
              <FontAwesomeIcon icon={faBook} />
            </div>
          </IonFabButton>
          <IonFabButton id="openMemo" onClick={handleOpenMemoFunc}>
            <div>
              <FontAwesomeIcon icon={faPen} />
            </div>
          </IonFabButton>
          <IonFabButton id="openTodo" onClick={handleOpenTodoFunc}>
            <div>
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </IonFabButton>
          {/* </IonFabButton> */}
        </IonFabList>
      </IonFab>

      <NewDiary
        isOpenStatus={diaryOpen}
        handleDiaryDismiss={handleDiaryDismiss}
      />
      <NewMemo isOpenStatus={memoOpen} handleMemoDismiss={handleMemoDismiss} />
      <NewTodo isOpenStatus={todoOpen} handleTodoDismiss={handleTodoDismiss} />
    </>
  );
};

export const NewDiary = (props: {
  handleDiaryDismiss: (arg0: boolean) => void;
  isOpenStatus: boolean | undefined;
}) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const dispatch = useDispatch();
  const [diaryWeather, setDiaryWeather] = useState("");
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");
  const [diaryContent, setDiaryContent] = useState("")

  function onWillDismiss_diary(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      props.handleDiaryDismiss(false);
      console.log("diary");
    }
  }

  let id = uuidv4();
  async function confirm_diary() {
    modal.current?.dismiss("", "confirm");
    props.handleDiaryDismiss(false);

    //update local storage
    const key = "diary";
    const data = {
      id: id,
      content: diaryContent,
      created_at: JSON.stringify(new Date()),
      updated_at: JSON.stringify(new Date()),
      deleted: false,
      weather: diaryWeather,
      title: title,
      mood: mood
    };
    const existingValue = await Preferences.get({ key });
    const existingData = existingValue.value
      ? JSON.parse(existingValue.value)
      : [];
    const value = JSON.stringify([...existingData, data]);
    await Preferences.set({ key, value });
    dispatch(setShouldGetDataDiary(true))

    //updated db
    let token = await getName("token");
    const res = await fetch("http://localhost:8090/editors/new-diary", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        content: diaryContent,
        weather: diaryWeather,
        title: title,
        mood: mood,
      }),
    });
    const json = await res.json();
    console.log(json);
  }

  function handleCallbackWeather(childData: any) {
    setDiaryWeather(childData);
  }

  function handleCallbackTitleAndMoodAndContent(childData: any) {
    setTitle(childData.title);
    setMood(childData.selected);
    setDiaryContent(childData.content)
  }

  return (
    <>
      <IonModal
        ref={modal}
        isOpen={props.isOpenStatus}
        onWillDismiss={(ev) => onWillDismiss_diary(ev)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => props.handleDiaryDismiss(false)}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>New Diary</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={() => confirm_diary()}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <DiaryEditor
            handleCallbackWeather={handleCallbackWeather}
            handleCallbackTitleAndMoodAndContent={handleCallbackTitleAndMoodAndContent}
          />
        </IonContent>
      </IonModal>
    </>
  );
};

export const NewMemo = (props: {
  handleMemoDismiss: (arg0: boolean) => void;
  isOpenStatus: boolean | undefined;
}) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const dispatch = useDispatch();
  const [memoContent, setMemoContent] = useState("");

  async function onWillDismiss_memo(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      console.log("memo");
      props.handleMemoDismiss(false);
      modal.current?.dismiss("", "confirm");
    }
  }

  async function confirm_memo() {
    modal.current?.dismiss("", "confirm");
    props.handleMemoDismiss(false);
    let id = uuidv4();
    // props.handleMemoDismiss(false);

    //update local storage
    const key = "memo";
    const data = {
      id: id,
      content: memoContent,
      created_at: JSON.stringify(new Date()),
      updated_at: JSON.stringify(new Date()),
      deleted: false,
    };
    const existingValue = await Preferences.get({ key });
    const existingData = existingValue.value
      ? JSON.parse(existingValue.value)
      : [];
    const value = JSON.stringify([...existingData, data]);
    await Preferences.set({ key, value });
    dispatch(setShouldGetDataMemo(true))


    //updated DB
    let token = await getName("token");
    const res = await fetch("http://localhost:8090/editors/new-memo", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        content: memoContent,
      }),
    });
    const json = await res.json();
    console.log(json);
  }

  function handleEditorCallback(childData: any) {
    setMemoContent(childData.content);
    console.log(memoContent)
  }

  return (
    <>
      <IonModal
        ref={modal}
        isOpen={props.isOpenStatus}
        onWillDismiss={(ev) => onWillDismiss_memo(ev)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => props.handleMemoDismiss(false)}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>New Memo</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={() => confirm_memo()}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <TextEditor handleEditorCallback={handleEditorCallback} />
        </IonContent>
      </IonModal>
    </>
  );
};

export type TodoListLS = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  title: string;
  due_date: string;
  hashtag: [];
  email_shared: [];
  task: [];
  memo: [];
};

export type HashtagLS = {
  name: string;
};

export const NewTodo = (props: {
  handleTodoDismiss: (arg0: boolean) => void;
  isOpenStatus: boolean | undefined;
}) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const dispatch = useDispatch();
  const [todoListTitle, setTodoListTitle] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todoHashtag, setTodoHashtag] = useState([] as string[]);
  const [todoNewHashtag, setTodoNewHashtag] = useState([] as string[]);
  const [todoEmail, setTodoEmail] = useState([] as string[]);
  const [todoTask, setTodoTask] = useState([] as {}[]);
  const [todoMemoRelated, setTodoMemoRelated] = useState([] as string[]);


  function onWillDismiss_todo(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      props.handleTodoDismiss(false);
      console.log("todo");
    }
  }

  async function confirm_todo() {
    let token = await getName("token");
    modal.current?.dismiss("", "confirm");
    props.handleTodoDismiss(false);

    let id = uuidv4();
    const todoContent = {
      title: todoListTitle,
      due_date: todoDate,
      hashtag: todoHashtag,
      newHashtag: todoNewHashtag,
      shared_email: todoEmail,
      tasks: todoTask,
      memo: todoMemoRelated,
    };

  
    //local storage
    const addTodolistToPreferences= async (todoListTitle:string,todoDate:string, todoHashtag:string[], todoNewHashtag:string[], todoEmail:string[],todoTask:{}[],todoMemoRelated:string[])=>{
      const key = "todolist";
      const data = {
      id: id,
      created_at: JSON.stringify(new Date()),
      updated_at: "",
      deleted: false,
      title: todoListTitle,
      due_date: todoDate,
      hashtag: [...todoHashtag, ...todoNewHashtag],
      email_shared: todoEmail,
      task: todoTask,
      memo: todoMemoRelated,
    }
    const existingValue = await Preferences.get({ key });
    const existingData = existingValue.value
      ? JSON.parse(existingValue.value)
      : [];
    const value = JSON.stringify([...existingData, data]);
    await Preferences.set({ key, value });
    dispatch(setShouldGetDataTodo(true))
    }

    addTodolistToPreferences(todoListTitle,todoDate, todoHashtag, todoNewHashtag, todoEmail,todoTask,todoMemoRelated);

    const addHashtagsToPreferences = async (todoNewHashtag: string[]) => {
      const key = "hashtags";
      for (const hashtag of todoNewHashtag) {
        const data = { name: hashtag };
        const existingValue = await Preferences.get({ key });
        console.log(existingValue, 1);

        const existingData = existingValue.value
          ? JSON.parse(existingValue.value)
          : [];
        const value = JSON.stringify([...existingData, data]);
        await Preferences.set({ key, value });
      }
    };
    addHashtagsToPreferences(todoNewHashtag);

    const addTodoMemoRelatedToPreferences = async (todoMemoRelated: string[],id:string)=>{
      const key = "todo_memo";
      todoMemoRelated.map(async (memo, index) => {
      const data = { memo_id: memo, todolist_id: id }
      const existingValue = await Preferences.get({ key });
      const existingData = existingValue.value
        ? JSON.parse(existingValue.value)
        : [];
      const value = JSON.stringify([...existingData, data]);
      await Preferences.set({ key, value });
      })
    }

    addTodoMemoRelatedToPreferences(todoMemoRelated, id)


    const addTodoHashtagToPreferences = async (todoHashtag: string[],id:string)=>{
      const key = "todo_hashtag";
      todoHashtag.map(async (hashtag, index) => {
      const data = { hashtag_name: hashtag, todolist_id: id }
      const existingValue = await Preferences.get({ key });
      const existingData = existingValue.value
        ? JSON.parse(existingValue.value)
        : [];
      const value = JSON.stringify([...existingData, data]);
      await Preferences.set({ key, value });
      })
    }
    addTodoHashtagToPreferences(todoHashtag,id)

    const addTodoNewHashtagToPreferences = async (todoNewHashtag: string[],id:string)=>{
      const key = "todo_hashtag";
      todoNewHashtag.map(async (hashtag, index) => {
      const data = { hashtag_name: hashtag, todolist_id: id }
      const existingValue = await Preferences.get({ key });
      const existingData = existingValue.value
        ? JSON.parse(existingValue.value)
        : [];
      const value = JSON.stringify([...existingData, data]);
      await Preferences.set({ key, value });
      })
    }
    addTodoNewHashtagToPreferences(todoNewHashtag, id)

  

  const addTodoEmailToPreferences = async (todoEmail: string[],id:string)=>{
    const key = "todo_shared";
    todoEmail.map(async (email, index) => {
    const data = { user_email: email, todolist_id: id }
    const existingValue = await Preferences.get({ key });
    const existingData = existingValue.value
      ? JSON.parse(existingValue.value)
      : [];
    const value = JSON.stringify([...existingData, data]);
    await Preferences.set({ key, value });
    })
  }
  addTodoEmailToPreferences(todoEmail, id)

  //update db
  const res = await fetch("http://localhost:8090/editors/new-todo", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      content: todoContent,
    }),
  });
  const json = await res.json();
  console.log(json);

  }



  function handleCallback(childData: any) {
    setTodoListTitle(childData.todoTitle);
    setTodoDate(childData.todoDate);
    setTodoHashtag(childData.todoHashtag);
    setTodoNewHashtag(childData.todoNewHashtag);
    setTodoEmail(childData.todoEmail);
    setTodoTask(childData.todoTask);
    setTodoMemoRelated(childData.todoMemoRelated);
  }

  return (
    <>
      <IonModal
        ref={modal}
        isOpen={props.isOpenStatus}
        onWillDismiss={(ev) => onWillDismiss_todo(ev)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => props.handleTodoDismiss(false)}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>{todoListTitle}</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={() => confirm_todo()}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <TodoEditor handleCallback={handleCallback} />
        </IonContent>
      </IonModal>
    </>
  );
};

export default AddNotePopup;
