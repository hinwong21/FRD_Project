import React, {useRef, useState} from "react";
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
import MemoEditor, { TextEditor } from "./TextEditor/TextEditor";
import { v4 as uuidv4 } from "uuid";
import styles from "./Notes.module.css";
import "./Notes.module.css";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { getName } from "../../service/LocalStorage/LocalStorage";




export const AddNotePopup: React.FC = () => {
  const [diaryOpen, setDiaryOpen] = useState(false)
  const [memoOpen, setMemoOpen] = useState (false)
  const [todoOpen, setTodoOpen] = useState (false)

  // const list = {
  //   options: [
  //     {
  //       icon: <FontAwesomeIcon icon={faBook} />,
  //       text: "Diary",
  //       id: "openDiary",
  //     },
  //     {
  //       icon: <FontAwesomeIcon icon={faPen} />,
  //       text: "Memo",
  //       id: "openMemo"
  //     },
  //     {
  //       icon: <FontAwesomeIcon icon={faCheck} />,
  //       text: "TodoList",
  //       id: "openTodo"
  //     },
  //   ],
  // };

  const handleOpenDiaryFunc = ()=>{
    setDiaryOpen(true)
  }

  const handleOpenMemoFunc = ()=>{
    setMemoOpen(true)
  }

  const handleOpenTodoFunc = ()=>{
    setTodoOpen(true)
  }

  const handleDiaryDismiss = (status: boolean | ((prevState: boolean) => boolean))=>{
    setDiaryOpen(status)
  }

  const handleMemoDismiss = (status: boolean | ((prevState: boolean) => boolean))=>{
    setMemoOpen(status)
  }

  const handleTodoDismiss = (status: boolean | ((prevState: boolean) => boolean))=>{
    setTodoOpen(status)
    console.log(todoOpen)
  }

  
    return (
      <>

        <IonFab slot="fixed" vertical="bottom" horizontal="end" className={styles.fabButton}>
          <IonFabButton>
            <FontAwesomeIcon icon={faPlus} />
          </IonFabButton>
          <IonFabList side="top">
          
                {/* <IonFabButton > */}
                  <IonFabButton  id="openDiary"  onClick={handleOpenDiaryFunc}>
                  <div><FontAwesomeIcon icon={faBook} /></div>
                  </IonFabButton >
                  <IonFabButton  id="openMemo"  onClick={handleOpenMemoFunc}>
                  <div><FontAwesomeIcon icon={faPen} /></div>
                  </IonFabButton >
                  <IonFabButton  id="openTodo"  onClick={handleOpenTodoFunc}>
                  <div><FontAwesomeIcon icon={faCheck} /></div>
                  </IonFabButton >
                {/* </IonFabButton> */}
    
          </IonFabList>
        </IonFab>

          <NewDiary isOpenStatus = {diaryOpen} handleDiaryDismiss={handleDiaryDismiss}/>
          <NewMemo isOpenStatus = {memoOpen} handleMemoDismiss={handleMemoDismiss}/>
          <NewTodo isOpenStatus = {todoOpen} handleTodoDismiss={handleTodoDismiss}/>
      </>
    );
  };


  export const NewDiary= (props: { handleDiaryDismiss: (arg0: boolean) => void; isOpenStatus: boolean | undefined; })=>{
    
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);
    const [diaryWeather, setDiaryWeather] = useState("")
    const [title, setTitle] = useState("")
    const [mood, setMood] = useState("")

    function onWillDismiss_diary(ev: CustomEvent<OverlayEventDetail>) {
      if (ev.detail.role === 'confirm') {
        props.handleDiaryDismiss(false)
        console.log("diary")
      }
    }

    let id = uuidv4()
   async function confirm_diary() {
      modal.current?.dismiss("", 'confirm');
      props.handleDiaryDismiss(false)
      const diaryContent = document.querySelector('.ContentEditable__root')?.innerHTML
      let token = await getName("token")
      const res = await fetch ("http://localhost:8080/editors/new-diary",{
        method: "POST",
        headers:{
          Authorization:"Bearer " + token,
          "Content-type":"application/json"},
        body: JSON.stringify({
          id: id,
          content:diaryContent,
          weather: diaryWeather,
          title:title,
          mood:mood,
        })
      })
      const json= await res.json()
      console.log(json)
    }

    function handleCallbackWeather(childData: any) {
      setDiaryWeather(childData)
    }

    function handleCallbackTitleAndMood(childData:any){
      setTitle(childData.title)
      setMood(childData.selected)
      console.log(title)
      console.log(mood)
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
                <IonButton onClick={() => props.handleDiaryDismiss(false)}>Cancel</IonButton>
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
            <DiaryEditor handleCallbackWeather = {handleCallbackWeather} handleCallbackTitleAndMood={handleCallbackTitleAndMood}/>
          </IonContent>
        </IonModal>
      
      </>
    )
  }

  export const NewMemo= (props: { handleMemoDismiss: (arg0: boolean) => void; isOpenStatus: boolean | undefined; })=>{
   
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);

   async function onWillDismiss_memo(ev: CustomEvent<OverlayEventDetail>) {
      if (ev.detail.role === 'confirm') {
        console.log("memo")
        // props.handleMemoDismiss(false)
        // modal.current?.dismiss("", 'confirm');
      let id = uuidv4()
      const memoContent = document.querySelector('.ContentEditable__root')?.innerHTML
      props.handleMemoDismiss(false)
      let token = await getName("token")
      const res = await fetch ("http://localhost:8080/editors/new-memo",{
        method: "POST",
        headers:{
          Authorization:"Bearer " + token,
          "Content-type":"application/json"},
        body: JSON.stringify({
          id: id,
          content:memoContent
        })
      })
      const json= await res.json()
      console.log(json)
      }
    }

    async function confirm_memo() {
      let token = await getName("token")
      modal.current?.dismiss("", 'confirm');
      props.handleMemoDismiss(false)
      let id = uuidv4()
      const memoContent = document.querySelector('.ContentEditable__root')?.innerHTML
      const res = await fetch ("http://localhost:8080/editors/new-memo",{
        method: "POST",
        headers:{
          Authorization:"Bearer" + token,
          "Content-type":"application/json"},
        body: JSON.stringify({
          id: id,
          content:memoContent
        })
      })
      const json= await res.json()
      console.log(json)
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
                <IonButton onClick={() => props.handleMemoDismiss(false)}>Cancel</IonButton>
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
            <MemoEditor/>
          </IonContent>
        </IonModal>
      
      </>
    )
  }

  export const NewTodo= (props: { handleTodoDismiss: (arg0: boolean) => void; isOpenStatus: boolean | undefined; })=>{
    
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);
    const [todoListTitle, setTodoListTitle] = useState("")
    const [todoDate, setTodoDate] = useState("")
    const [todoHashtag, setTodoHashtag] = useState([] as string[])
    const [todoEmail, setTodoEmail] = useState([] as string[])
    const [todoTask, setTodoTask] = useState([] as {}[])
    const [todoMemoRelated, setTodoMemoRelated] = useState([] as string[])
  

    function onWillDismiss_todo(ev: CustomEvent<OverlayEventDetail>) {
      if (ev.detail.role === 'confirm') {
        props.handleTodoDismiss(false)
        console.log("todo")
      }
    }

    async function confirm_todo() {
      let token = await getName("token")
      modal.current?.dismiss("", 'confirm');
      props.handleTodoDismiss(false)

      let id = uuidv4()
      const todoContent = {
        id:id,
        title: todoListTitle,
        due_date: todoDate,
        hashtag: todoHashtag,
        shared_email: todoEmail,
        tasks: todoTask,
        memo: todoMemoRelated
      }
      const res = await fetch ("http://localhost:8080/editors/new-todo",{
        method: "POST",
        headers:{
          Authorization:"Bearer " + token,
          "Content-type":"application/json"},
        body: JSON.stringify({
          id: id,
          content:todoContent
        })
      })
      const json= await res.json()
      console.log(json)
    }


    function handleCallback(childData:any){
      setTodoListTitle(childData.todoTitle)
      setTodoDate(childData.todoDate)
      setTodoHashtag(childData.todoHashtag)
      setTodoEmail(childData.todoEmail)
      setTodoTask(childData.todoTask)
      setTodoMemoRelated(childData.todoMemoRelated)
    }

    return (
      <>
      <IonModal ref={modal} isOpen={props.isOpenStatus} onWillDismiss={(ev) => onWillDismiss_todo(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => props.handleTodoDismiss(false)}>Cancel</IonButton>
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
            <TodoEditor handleCallback = {handleCallback}/>
          </IonContent>
        </IonModal>
      </>
    )
  }

  

export default AddNotePopup;
