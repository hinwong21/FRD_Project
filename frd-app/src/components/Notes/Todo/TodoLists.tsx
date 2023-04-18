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
  IonCard,
  IonItem,
  IonAlert,
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
import { useDispatch } from 'react-redux';
import { setShouldGetDataTodo } from '../../../redux/Notes/todoSlice';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../redux/store/store';
import {isAfter} from "date-fns"

export interface TodoListLSItem {
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
  const shouldGetData = useSelector((state: IRootState) => state.todo.shouldGetDataTodo);
  const [todoListLS, setTodoListLS] = useState<TodoListLSItem[]>([]);
  const [presentAlert, setPresentAlert] = useState(false);
  const [ selectedTodo, setSelectedTodo] = useState("")
  const dispatch = useDispatch(); 

  const getTodoListLS = async () => {
    const { value } = await Preferences.get({ key: "todolist" });
    if (value !== null) {
      // console.log(value);
  const sortTodoListsByDueDate = (a:any, b:any) => {
    const aDueDate = new Date(b.due_date) as any;
    const bDueDate = new Date(a.due_date) as any;
    return aDueDate - bDueDate;
  };      
      setTodoListLS(JSON.parse(value).sort(sortTodoListsByDueDate));
    }
    console.log(JSON.parse(value as string));
    dispatch(setShouldGetDataTodo(false))
  };


 


  useEffect(() => {
    getTodoListLS();
  }, []);

  useEffect(()=>{
    getTodoListLS();
  },[shouldGetData])

  //for deletion
  let timer: any;
  function handlePointerDown(id:string) {
    timer = setTimeout(() => {
      console.log('Long press event detected!');
      setPresentAlert(true)
      setSelectedTodo(id)

    }, 500);
  }

  const handleAlertButtonClick = async (buttonIndex: number) => {
    if (buttonIndex === 1) {
      setPresentAlert(false)
      const deleteTodoListFromPreferences = async (id: string) => {
        const key = "todolist";
        const existingValue = await Preferences.get({ key });
        const existingData = existingValue.value ? JSON.parse(existingValue.value) : [];
        const newData = existingData.filter((todoList: any) => todoList.id !== id);
        const value = JSON.stringify(newData);
        await Preferences.set({ key, value });
        dispatch(setShouldGetDataTodo(true));
      }
    deleteTodoListFromPreferences(selectedTodo)
    } else if (buttonIndex === 0) {
      setPresentAlert(false)
      return;
    }
  };


  function handlePointerUp() {
    clearTimeout(timer);
  }

  return (
    <>
      <IonItemGroup>
        <IonItemDivider>
          <IonLabel className={styles.todoLabel}>Todo</IonLabel>
        </IonItemDivider>

        <IonAlert
        header="Delete this todolist?"
        isOpen={presentAlert}
        animated={true}
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => handleAlertButtonClick(0),
          },
          {
            text: 'Delete',
            role: 'confirm',
            handler: () => handleAlertButtonClick(1),
          },
        ]}
        onDidDismiss={() => setPresentAlert(false)}
      ></IonAlert>

       
        
        

        <div className={styles.todoListContainer}>
         
          {todoListLS.map((todo, index) => (
            <Link
              key={index}
              to={{
                pathname: "./EditTodo",
                state: { data: todo, id: todo.id },
              }}
              className={styles.todoListWrapper}
            ><IonCard className={styles.todoListWrapper2} onPointerDown={()=>handlePointerDown(todo.id)} onPointerUp={handlePointerUp} >
              <div className={styles.todoProgressIcon} >
                {todo.task.some((taskItem) => !taskItem.checked) ? (
                  <FontAwesomeIcon icon={faSpinner} color="red" />
                ) : (
                  <FontAwesomeIcon icon={faSquareCheck} color="blue" />
                )}
              </div>
              <div className={styles.titleAndHashtagContainer}>
              <div className={styles.todoListTitle}>{todo.title}</div>
              <div className={styles.todoPreviewHashtag}>{todo.hashtag.map((item, index)=>(
                <div key={index} className={styles.todoPreviewHashtagStyle}>{item}</div>
              ))}</div>
              </div>
              <div className={styles.todoListDate} >
                Due on: {todo.due_date.slice(0, 10)}
              </div>
              </IonCard>
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
  const dispatch = useDispatch();
  //pass to todoReEditor
  const [memoEditorContent, setMemoEditorContent] = useState({});
  const [memoEditorId, setMemoEditorId] = useState("");
  //collected from Re-editor
  const [todoListTitle, setTodoListTitle] = useState("");
  const [todoDate, setTodoDate] = useState("");
  const [todoDueDate, setTodoDueDate] = useState("")
  const [todoHashtag, setTodoHashtag] = useState([] as string[]);
  const [todoNewHashtag, setTodoNewHashtag] = useState([] as string[]);
  const [todoEmail, setTodoEmail] = useState([] as string[]);
  const [todoTask, setTodoTask] = useState([] as {}[]);
  const [todoMemoRelated, setTodoMemoRelated] = useState([] as string[]);
  const [todoMemoDeleted, setTodoMemoDeleted] = useState([] as string[]);
  const [deleteHashtagArr, setDeleteHashtagArr] = useState([] as string[]);
  const [deleteEmailArr, setDeleteEmailArr] = useState([] as string[]);
  // const [submitConfirmed, setSubmitConfirmed] = useState(false)

  function onWillDismiss_memo(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      console.log("todo");
    }
  }

  useEffect(()=>{
    console.log("the state has change", todoListTitle, todoDueDate, todoHashtag, todoNewHashtag, todoEmail, todoTask, todoMemoRelated, todoMemoDeleted, deleteHashtagArr, deleteEmailArr )
  },[todoListTitle, todoDueDate, todoHashtag, todoNewHashtag, todoEmail, todoTask, todoMemoRelated, todoMemoDeleted, deleteHashtagArr, deleteEmailArr])
  
    const handleCallback = (childData: any) => {
      setTodoListTitle(childData.todoTitle);
      setTodoDueDate(childData.todoDate);
      setTodoHashtag(childData.todoHashtag);
      setTodoNewHashtag(childData.todoNewHashtag);
      setTodoEmail(childData.todoEmail);
      setTodoTask(childData.todoTask);
      setTodoMemoRelated(childData.todoMemoRelated);
      setTodoMemoDeleted(childData.todoMemoDeleted);
      setDeleteHashtagArr(childData.deleteHashtagArr);
      setDeleteEmailArr(childData.deleteEmailArr);
    };

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

  useEffect(()=>{
    console.log(todoDueDate)

    async function updateTodoLS_dueDate(
      todoDueDate: string,
    ) {
      const key = "todolist";
      const existingValue = await Preferences.get({ key });
      console.log(todoDueDate,3)
      const existingData = existingValue.value
        ? JSON.parse(existingValue.value)
        : [];
      const index = existingData.findIndex(
        (item: { id: string }) => item.id === memoEditorId
      );
      if (index !== -1) {
        existingData[index].due_date = todoDueDate;
      }
      const value = JSON.stringify(existingData);
      console.log(value)
      await Preferences.set({ key, value });
      dispatch(setShouldGetDataTodo(true))
    }

    updateTodoLS_dueDate(todoDueDate)

  },[todoDueDate])


  async function confirm_memo() {
    modal.current?.dismiss("", "confirm");
    
    //update local storage
    async function updateTodoLS(
      todoListTitle: string,
      // todoDueDate: string,
      todoHashtag: string[],
      todoNewHashtag: string[],
      todoEmail: string[],
      todoTask: {}[],
      todoMemoRelated: string[],
      memoEditorId: string
    ) {
      const key = "todolist";
      const existingValue = await Preferences.get({ key });
      console.log(todoDueDate,3)
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
        // existingData[index].due_date = todoDueDate;
        existingData[index].hashtag = [...todoHashtag, ...todoNewHashtag];
        existingData[index].email_shared = todoEmail;
        existingData[index].memo = todoMemoRelated;
      }
      const value = JSON.stringify(existingData);
      console.log(value)
      await Preferences.set({ key, value });
      dispatch(setShouldGetDataTodo(true))
    }
    updateTodoLS(
      todoListTitle,
      // todoDueDate,
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
