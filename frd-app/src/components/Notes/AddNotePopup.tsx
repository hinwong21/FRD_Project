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
  const [diaryWeather, setDiaryWeather] = useState("");
  const [title, setTitle] = useState("");
  const [mood, setMood] = useState("");

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
    const diaryContent = document.querySelector(
      ".ContentEditable__root"
    )?.innerHTML;
    let token = await getName("token");
    const res = await fetch("http://localhost:8080/editors/new-diary", {
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

  function handleCallbackTitleAndMood(childData: any) {
    setTitle(childData.title);
    setMood(childData.selected);
    console.log(title);
    console.log(mood);
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
            handleCallbackTitleAndMood={handleCallbackTitleAndMood}
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
  const [memoContent, setMemoContent] = useState("")

  async function onWillDismiss_memo(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      console.log("memo");
      props.handleMemoDismiss(false)
      modal.current?.dismiss("", 'confirm');
      // let id = uuidv4();
      // const memoContent = document.querySelector(
      //   ".ContentEditable__root"
      // )?.innerHTML;
      // props.handleMemoDismiss(false);
      // let token = await getName("token");
      // const res = await fetch("http://localhost:8080/editors/new-memo", {
      //   method: "POST",
      //   headers: {
      //     Authorization: "Bearer " + token,
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     id: id,
      //     content: memoContent,
      //   }),
      // });
      // const json = await res.json();
      // console.log(json);
    }
  }

  async function confirm_memo() {
    modal.current?.dismiss("", "confirm");
    props.handleMemoDismiss(false);
    let id = uuidv4();
      props.handleMemoDismiss(false);
      let token = await getName("token");
      const res = await fetch("http://localhost:8080/editors/new-memo", {
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

  function handleEditorCallback(childData:any){
    // console.log(childData.content)
    setMemoContent(childData.content)
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
              <IonButton strong={true} 
              onClick={() => confirm_memo()}
              >
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <TextEditor handleEditorCallback = {handleEditorCallback} />
        </IonContent>
      </IonModal>
    </>
  );
};

export type TodoListLS = {
          id: string,
          created_at: string,
          updated_at: string,
          deleted: boolean,
          title: string,
          due_date: string,
          hashtag: [],
          email_shared: [],
          task: [],
          memo: [],
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
  const [todoListTitle, setTodoListTitle] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todoHashtag, setTodoHashtag] = useState([] as string[]);
  const [todoNewHashtag, setTodoNewHashtag] = useState([] as string[]);
  const [todoEmail, setTodoEmail] = useState([] as string[]);
  const [todoTask, setTodoTask] = useState([] as {}[]);
  const [todoMemoRelated, setTodoMemoRelated] = useState([] as string[]);

  //for local storage
  const [todoListLS, setTodoListLS] = useState<{ [key: number]: TodoListLS[] }>(
    {}
  );
  const [todoMemoLS, setTodoMemoLS] = useState({});
  const [todoHashtagLS, setTodoHashtagLS] = useState({});
  const [todoSharedLS, setTodoSharedLS] = useState({});
  const [hashtagLS, setHashtagLS] = useState<{ [key: number]: HashtagLS[] }>(
    {}
  );

  useEffect(() => {
    const getTodoListLS = async () => {
      const { value } = await Preferences.get({ key: "todolist" });
      if (value !== null) {
        setTodoListLS(JSON.parse(value));
      }
    };

    const getTodoMemoLS = async () => {
      const { value } = await Preferences.get({ key: "todo_memo" });
      if (value !== null) {
        setTodoMemoLS(JSON.parse(value));
      }
    };

    const getTodoHashtagLS = async () => {
      const { value } = await Preferences.get({ key: "todo_hashtag" });
      if (value !== null) {
        setTodoHashtagLS(JSON.parse(value));
      }
    };

    const todoSharedLS = async () => {
      const { value } = await Preferences.get({ key: "todo_shared" });
      if (value !== null) {
        setTodoSharedLS(JSON.parse(value));
      }
    };

    const getHastagLS = async () => {
      const { value } = await Preferences.get({ key: "hashtags" });
      if (value !== null) {
        setHashtagLS(JSON.parse(value));
      }
    };

    getTodoListLS();
    getTodoMemoLS();
    getTodoHashtagLS();
    todoSharedLS();
    getHastagLS();
  }, []);

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
    //express
    const res = await fetch("http://localhost:8080/editors/new-todo", {
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

    //local storage

    await Preferences.set({
      key: "todolist",
      value: JSON.stringify([
        ...Object.values(todoListLS),
        {
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
        },
      ]),
    });


    const addHashtagsToPreferences = async (todoNewHashtag: string[]) => {
      const key = 'hashtags';
      for (const hashtag of todoNewHashtag) {
        const data = { name: hashtag };
        const existingValue = await Preferences.get({ key });
        console.log(existingValue,1);
        
        const existingData = existingValue.value ? JSON.parse(existingValue.value) : [];
        const value = JSON.stringify([...existingData, data]);
        await Preferences.set({ key, value });
      }
    };

    addHashtagsToPreferences(todoNewHashtag);

    todoMemoRelated.map(async (memo, index) => {
      await Preferences.set({
        key: "todo_memo",
        value: JSON.stringify([
          ...Object.values(todoMemoLS),
          { memo_id: memo, todolist_id: id },
        ]),
      });
    });

    todoHashtag.map(async (hashtag, index) => {
      await Preferences.set({
        key: "todo_hashtag",
        value: JSON.stringify([
          ...Object.values(todoHashtagLS),
          { hashtag_name: hashtag, todolist_id: id },
        ]),
      });
    });

    todoNewHashtag.map(async (hashtag, index) => {
      await Preferences.set({
        key: "todo_hashtag",
        value: JSON.stringify([
          ...Object.values(todoHashtagLS),
          { hashtag_name: hashtag, todolist_id: id },
        ]),
      });
    });

    todoEmail.map(async (email, index) => {
      await Preferences.set({
        key: "todo_shared",
        value: JSON.stringify([
          ...Object.values(todoSharedLS),
          { user_email: email, todolist_id: id },
        ]),
      });
    });
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
