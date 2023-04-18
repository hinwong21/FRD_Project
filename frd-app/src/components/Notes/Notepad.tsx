import React, { useEffect, useState, Component } from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonMenuButton,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Notes.module.css";
import { AddNotePopup } from "./AddNotePopup";
import { useParams } from "react-router";
import { Notes } from "./Notes";
import { Memos } from "./Memo/Memos";
import { Diaries } from "./Diary/Diaries";
import { TodoLists } from "./Todo/TodoLists";
import styles from "./Notes.module.css";
import { Preferences } from "@capacitor/preferences";
import { TodoListLSItem } from "./Todo/TodoLists";
import { MemoType } from "./Memo/Memos";
import { DiaryType } from "./Diary/Diaries";
import { WeatherType } from "./Diary/Diaries";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareCheck,
  faSquare,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { setSelectedSegment } from '../../redux/Notes/notepadSlice';
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store/store';
import { useDispatch } from 'react-redux';

export const Notepad: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  let titleName = "";
  let fetchPage = <></>;

  // const [selectedSegment, setSelectedSegment] = useState<string>("todo");
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTodoList, setFilteredTodoList] = useState<TodoListLSItem[]>(
    []
  );
  const [todoList, setTodoList] = useState<TodoListLSItem[]>([]);
  const [filteredMemo, setFilteredMemo] = useState<MemoType[]>([]);
  const [memo, setMemo] = useState<MemoType[]>([]);
  const [filteredDiary, setFilteredDiary] = useState<DiaryType[]>([]);
  const [diary, setDiary] = useState<DiaryType[]>([]);

  const [previewArr, setPreviewArr] = useState<JSX.Element[]>([]);
  const [input, setInput] = useState("");

  const [previewTextArray, setPreviewTextArray] = useState<JSX.Element[]>([]);
  const [previewImageArray, setPreviewImageArray] = useState<JSX.Element[]>([]);

  const selectedSegment = useSelector((state: IRootState) => state.notepad.selectedSegment);
  const dispatch = useDispatch(); 

  const handleSegmentChange = (event: CustomEvent) => {
    setSearchMode(false)
    // setSelectedSegment(event.detail.value);
    dispatch(setSelectedSegment(event.detail.value))
  };

  const getTodoList = async () => {
    const key = "todolist";
    const existingValue = await Preferences.get({ key });
    const existingData = existingValue.value
      ? JSON.parse(existingValue.value)
      : [];
    setTodoList(existingData);
    setFilteredTodoList(existingData);
  };

  const getMemo = async () => {
    const key = "memo";
    const existingValue = await Preferences.get({ key });
    const existingData = existingValue.value
      ? JSON.parse(existingValue.value)
      : [];
    setMemo(existingData);
    setFilteredMemo(existingData);
  };

  const getDiary = async () => {
    const key = "diary";
    const existingValue = await Preferences.get({ key });
    const existingData = existingValue.value
      ? JSON.parse(existingValue.value)
      : [];
    setDiary(existingData);
    setFilteredDiary(existingData);
  };

  useEffect(() => {
    getTodoList();
    getMemo();
    getDiary();
  }, []);

  useEffect(() => {
    setPreviewArr(createPreview());
    createPreviewDiary();
  }, [input]);

  const search = (input: string) => {
    console.log(input);
    if (input !== "") {
      setSearchMode(true);
      setInput(input);
      const query = input.toLowerCase();
      setSearchQuery(query);
      const filteredDataTodo = todoList.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.task.some((task) =>
            task.content.toLowerCase().includes(query)
          ) ||
          item.hashtag.some((tag) => tag.toLowerCase().includes(query))
      );
      setFilteredTodoList(filteredDataTodo);

      const filteredDataMemo = memo.filter((item) =>
        item.content.toLowerCase().includes(query)
      );
      setFilteredMemo(filteredDataMemo);

      const filteredDataDiary = diary.filter((item) =>
        item.content.toLowerCase().includes(query)||
        item.title.toLowerCase().includes(query)||
        item.mood.toLowerCase().includes(query)
      );
      setFilteredDiary(filteredDataDiary);

    } else {
      setSearchMode(false);
    }
  };

  function createPreview() {
    const previewArray: JSX.Element[] = [];
    filteredMemo.map((item, index) => {
      const parsedContent = JSON.parse(item.content).ops;
      const preview = parsedContent.map((content: any, contentIndex: any) => {
        if (content.insert) {
          if (typeof content.insert === "string") {
            const attrs = content.attributes || {};
            const style: React.CSSProperties = {};
            if (attrs.bold) style.fontWeight = "bold";
            if (attrs.italic) style.fontStyle = "italic";
            if (attrs.underline) style.textDecoration = "underline";
            style.color = "black";
            return (
              <span key={contentIndex} style={style}>
                {content.insert}
              </span>
            );
          } else if (content.insert.image) {
            return (
              <img
                key={contentIndex}
                src={content.insert.image}
                alt="Inserted Image"
                style={{ maxWidth: "80px" }}
              />
            );
          }
        } else if (content.attributes && content.attributes.link) {
          return (
            <a href={content.attributes.link} key={contentIndex}>
              {content.insert}
            </a>
          );
        }
        return null;
      });
      previewArray.push(<div key={index}>{preview}</div>);
    });

    return previewArray;
  }

  function createPreviewDiary() {
    const previewTextArray: JSX.Element[] = []; 
    const previewImageArray: JSX.Element[] = []; 
    filteredDiary.map((item, index) => { 
      const parsedContent = JSON.parse(item.content).ops;

      //get text content from diary and config preview block
      const previewText = parsedContent.map((content: any, contentIndex: any) => {
        if (content.insert) {
          if (typeof content.insert === "string") {
            const attrs = content.attributes || {};
            const style: React.CSSProperties = {};
            if (attrs.bold) style.fontWeight = "bold";
            if (attrs.italic) style.fontStyle = "italic";
            if (attrs.underline) style.textDecoration = "underline";
            style.color="black";
            return (
              <span key={contentIndex} style={style}>
                {content.insert}
              </span>
            );
          } 
        } else if (content.attributes && content.attributes.link) {
          return (
            <a href={content.attributes.link} key={contentIndex}>
              {content.insert}
            </a>
          );
        }
        return null;
      });
      previewTextArray.push(<div key={index}>{previewText}</div>); 


      //get image content from diary and config preview block
      const previewImg = parsedContent.map((content: any, contentIndex: any) => {
        if (content.insert) {
          if (content.insert.image) {
            return (
              <img
                key={contentIndex}
                src={content.insert.image}
                alt="Diary Image"
                style={{ width: "40vw" }}
              />
            );
          }
        } 
      });
      previewImageArray.push(<div key={index}>{previewImg}</div>); 
    });
    setPreviewImageArray(previewImageArray)
    setPreviewTextArray(previewTextArray)
  }


  //deletion- todo
  // let timer_todo: any;
  // function handlePointerDown(id:string) {
  //   timer_todo = setTimeout(() => {
  //     console.log('Long press event detected!');
  //     setPresentAlertTodo(true)
  //     setSelectedTodo(id)
  //   }, 500);
  // }

  // const handleAlertButtonClick = async (buttonIndex: number) => {
  //   if (buttonIndex === 1) {
  //     setPresentAlertTodo(false)
  //     const deleteTodoListFromPreferences = async (id: string) => {
  //       const key = "todolist";
  //       const existingValue = await Preferences.get({ key });
  //       const existingData = existingValue.value ? JSON.parse(existingValue.value) : [];
  //       const newData = existingData.filter((todoList: any) => todoList.id !== id);
  //       const value = JSON.stringify(newData);
  //       await Preferences.set({ key, value });
  //       dispatch(setShouldGetDataTodo(true));
  //     }
  //   deleteTodoListFromPreferences(selectedTodo)
  //   } else if (buttonIndex === 0) {
  //     setPresentAlertTodo(false)
  //     return;
  //   }
  // };


  // function handlePointerUp() {
  //   clearTimeout(timer_todo);
  // }


  return (
    <>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Notepad</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSegment value={selectedSegment} onIonChange={handleSegmentChange}>
          <IonSegmentButton value="todo">
            <IonLabel>Todo</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="memo">
            <IonLabel>Memo</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="diary">
            <IonLabel>Diary</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonSearchbar
          animated={true}
          showClearButton="always"
          type="search"
          onIonInput={(event) => {
            search(event.target.value as string);
          }}
        ></IonSearchbar>
        {!searchMode && selectedSegment === "memo" && <Memos />}
        {!searchMode && selectedSegment === "diary" && <Diaries />}
        {!searchMode && selectedSegment === "todo" && <TodoLists />}

        {searchMode && filteredTodoList.length > 0 && (
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel className={styles.todoLabel}>Todo</IonLabel>
            </IonItemDivider>
            <div className={styles.todoListContainer}>
              {filteredTodoList.map((todo, index) => (
                <Link
                  key={index}
                  to={{
                    pathname: "./EditTodo",
                    state: { data: todo, id: todo.id },
                  }}
                  className={styles.todoListWrapper2}
                >
                  <div className={styles.todoProgressIcon}>
                    {todo.task.some((taskItem) => !taskItem.checked) ? (
                      <FontAwesomeIcon icon={faSpinner} color="red" />
                    ) : (
                      <FontAwesomeIcon icon={faSquareCheck} color="blue" />
                    )}
                  </div>
                  <div className={styles.todoListTitle}>{todo.title}</div>
                  <div className={styles.todoListDate}>
                    Due on: {todo.due_date.slice(0, 10)}
                  </div>
                </Link>
              ))}
            </div>
          </IonItemGroup>
        )}

        {searchMode && filteredMemo.length > 0 && (
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel className={styles.memoLabel}>Memo</IonLabel>
            </IonItemDivider>
            <div className={styles.mainMemoContainer}>
              <div className={styles.memoWrapper}>
                {filteredMemo.map((item, index) => (
                  <Link
                    to={{
                      pathname: "./EditMemo",
                      state: { data: JSON.parse(item.content), id: item.id },
                    }}
                    className={styles.memoAContainer}
                    key={index}
                  >
                    <div className={styles.memoBlock}>
                      <div>{previewArr[index]}</div>
                    </div>

                    <div className={styles.memoUpdatedTime}>
                      {item.updated_at.slice(1, 11)}
                    </div>
                    <div className={styles.memoUpdatedTime}>
                      {item.updated_at.slice(12, 17)}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </IonItemGroup>
        )}

        {searchMode && filteredDiary.length > 0 && (
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel className={styles.memoLabel}>Diary</IonLabel>
            </IonItemDivider>
            <div className={styles.diaryWrapper}>
          {filteredDiary.map((item, index) => (
            <Link
              to={{
                pathname: "./EditDiary",
                state: {
                  data: item.content,
                  id: item.id,
                  weather: item.weather,
                  mood: item.mood,
                  title: item.title,
                },
              }}
              className={styles.diaryAContainer}
              key={index}
            >
              
              <div className={styles.diaryUpdatedTime}>
                <div className={styles.diaryDateAdjPosition}>
                  <div className={styles.diaryWeek}>
                    {item.weather.date.slice(0, 3).toUpperCase()}
                  </div>
                  <div className={styles.diaryDate}>
                 
                      {JSON.parse(item.created_at).slice(8, 10)}
                  
                      {JSON.parse(item.created_at).slice(5, 7) === "01"
                        ? "JAN"
                        : JSON.parse(item.created_at).slice(5, 7) === "02"
                        ? "FEB"
                        : JSON.parse(item.created_at).slice(5, 7) === "03"
                        ? "MAR"
                        : JSON.parse(item.created_at).slice(5, 7) === "04"
                        ? "APR"
                        : JSON.parse(item.created_at).slice(5, 7) === "05"
                        ? "MAY"
                        : JSON.parse(item.created_at).slice(5, 7) === "06"
                        ? "JUN"
                        : JSON.parse(item.created_at).slice(5, 7) === "07"
                        ? "JUL"
                        : JSON.parse(item.created_at).slice(5, 7) === "08"
                        ? "AUG"
                        : JSON.parse(item.created_at).slice(5, 7) === "09"
                        ? "SEP"
                        : JSON.parse(item.created_at).slice(5, 7) === "10"
                        ? "OCT"
                        : JSON.parse(item.created_at).slice(5, 7) === "11"
                        ? "NOV"
                        : JSON.parse(item.created_at).slice(5, 7) === "12"
                        ? "DEC"
                        : ""}
                   
                      {JSON.parse(item.created_at).slice(0, 4)}
                    </div>
                  </div>
                
              </div>
              <div className={styles.diaryContent}>
                <div className={styles.diaryTitle}>
                  <div className={styles.diaryTitleText}>{item.title}</div>
                </div>
                
                <div className={styles.diaryBlock}>
                  {previewTextArray.length>0 && <div className={styles.previewText}>{previewTextArray[index]}</div>}
                  {previewImageArray.length>0 && <div className={styles.previewImage}>{previewImageArray[index]}</div>}
                </div>

                <div className={styles.diaryMood}>
                {item.mood === "happy"
                  ? "😄"
                  : item.mood === "sad"
                  ? "🥴"
                  : item.mood === "shocked"
                  ? "😨"
                  : item.mood === "soso"
                  ? "😐"
                  : item.mood === "angry"
                  ? "😡"
                  : ""}
              </div>
              </div>
            </Link>
          ))}
        </div>
          </IonItemGroup>
        )}

        <AddNotePopup />
      </IonContent>
    </>
  );
};

export default Notepad;
