import { log } from "console";
import React, { useEffect, useState, Component, ReactNode, useRef } from "react";
// import {
//   IonButtons,
//   IonContent,
//   IonHeader,
//   IonMenuButton,
//   IonSearchbar,
//   IonTitle,
//   IonToolbar,
// } from "@ionic/react";
import styles from "./Notes.module.css"
import { Link } from "react-router-dom";
import { IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonNavLink, IonPage } from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import DiaryEditor from "./DiaryEditor";
import MemoEditor, { TextEditor } from "./TextEditor";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from 'react-router-dom';


type MemoType ={
id:string;
content:string;
created_at: string;
deleted_at:string;
updated_at:string;
user_id:number
}



export const Notes: React.FC = () => {

  const [memoContent, setMemoContent] = useState<MemoType[]>([])
  const [memoEditorOpen, setMemoEditorOpen] = useState(false)

  async function getMemo() {
    const res = await fetch("http://localhost:8080/editors/memo", {
      method: "GET",
    });
    const memos = await res.json();
    setMemoContent(memos)
  }


  useEffect(() => {
    getMemo();
  },[])

  function openMemoEditor(){
    setMemoEditorOpen(true)
  }

  return (
    <>
    <div className={styles.memoWrapper}>
     {memoContent.map((item, index)=>(
          <Link to={{pathname: "./EditMemo", state: item }} className={styles.memoAContainer} key={index}>
          <div dangerouslySetInnerHTML={{__html : JSON.parse(item.content)}} className={styles.memoBlock}></div>
          <div className={styles.memoUpdatedTime}>{item.updated_at.slice(0,10)}</div>
          </Link>
     ))}
    </div>
   
    </>
  );
};

// export type MemoEditorContent = {
//   content: string,
//   created_at: string,
//   deleted_at:string,
//   id:string,
//   updated_at:string,
//   user_id:string
// }


export const EditMemo= ()=>{

  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [memoEditorContent, setMemoEditorContent] = useState({})

  function onWillDismiss_memo(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      console.log("memo")
    }
  }

 

  async function confirm_memo() {
    modal.current?.dismiss("", 'confirm');
    // let id = uuidv4()
    // const memoContent = document.querySelector('.ContentEditable__root')?.innerHTML
    // const res = await fetch ("http://localhost:8080/editors/new-memo",{
    //   method: "POST",
    //   headers:{"Content-type":"application/json"},
    //   body: JSON.stringify({
    //     id: id,
    //     content:memoContent
    //   })
    // })
  }
  const location = useLocation();
  const data = location.state;
  // console.log(data)

useEffect(()=>{
  // console.log()
  // let writingArea: any = document.querySelector(".ContentEditable__root")?.innerHTML
  // console.log(writingArea)
  // console.log(`${JSON.parse(data as string)}`)
  // writingArea = `${JSON.parse(data as string)}`;

  // setMemoEditorContent(`${JSON.parse(data as string)}`)
  setMemoEditorContent(data as {})
},[])
  

  return (
    <>
    <IonPage>
    <IonModal ref={modal}  onWillDismiss={(ev) => onWillDismiss_memo(ev)} isOpen={true}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <Link to={"./TodoList"}><IonButton>Cancel</IonButton></Link>
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
          <MemoEditor content={memoEditorContent}/>
        </IonContent>
      </IonModal>
      </IonPage>
    
    </>
  )
}


export default Notes;
