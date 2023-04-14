import React, {
    useEffect,
    useState,
    useRef,
  } from "react";
  import styles from "../Notes.module.css";
  import { Link } from "react-router-dom";
  import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    IonPage,
    IonItemDivider,
    IonItemGroup,
    IonLabel,
  } from "@ionic/react";
  import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
  import ReEditTextEditor from "./ReEditTextEditor";
  import { useLocation } from "react-router-dom";
import { getName } from "../../../service/LocalStorage/LocalStorage";
import { Preferences } from "@capacitor/preferences";
  
  type MemoType = {
    id: string;
    content: string;
    created_at: string;
    deleted_at: string;
    updated_at: string;
    user_id: number;
  };
  
  export const Memos: React.FC = () => {
    const [memoContent, setMemoContent] = useState<MemoType[]>([]);
    const [previewArr, setPreviewArr] = useState<JSX.Element[]>([]);
  
    async function getMemo() {
      const getMemoLS = async () => {
        const { value } = await Preferences.get({ key: "memo" });
        if (value !== null) {
          setMemoContent(JSON.parse(value));
        }
      };
      getMemoLS()
    }

    function createPreview() {
      const previewArray: JSX.Element[] = []; 
      memoContent.map((item, index) => { 
        const parsedContent = JSON.parse(item.content).ops;
        const preview = parsedContent.map((content: any, contentIndex: any) => {
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
  
    useEffect(() => {
      getMemo();
    }, []);

    useEffect(()=>{
      setPreviewArr(createPreview())
    },[memoContent])
  
  
    return (
      <>

      <IonItemGroup>
          <IonItemDivider>
            <IonLabel className={styles.memoLabel}>Memo</IonLabel>
          </IonItemDivider>
        <div className={styles.memoWrapper}>
          {memoContent.map((item, index) => (
            <Link
              to={{ pathname: "./EditMemo", state: {data: JSON.parse(item.content), id: item.id} }}
              className={styles.memoAContainer}
              key={index}
            >
              <div
                // dangerouslySetInnerHTML={{ __html: JSON.parse(item.content).ops.insert }}
                className={styles.memoBlock}>
                  <div>
                    {previewArr[index]}
                  </div>
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
        </IonItemGroup>  
      
      </>
    );
  };
  
  
  
  export const EditMemo = () => {
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);
  
  
    const [memoEditorContent, setMemoEditorContent] = useState("");
    const [memoEditorId, setMemoEditorId] = useState("")
    const [memoContent, setMemoContent] = useState("")
  
    async function onWillDismiss_memo(ev: CustomEvent<OverlayEventDetail>) {
      if (ev.detail.role === "confirm") {
        console.log("memo");
      }
    }

    // async function updateMemo(id:string, memoContent:string) {
    //   const key = "memo";
    //   const existingValue = await Preferences.get({ key });
    //   const existingData = existingValue.value ? JSON.parse(existingValue.value) : [];
    //   const index = existingData.findIndex((item: { id: string; }) => item.id === id);
    //   if (index !== -1) {
    //     existingData[index].content = memoContent;
    //     existingData[index].updated_at = JSON.stringify(new Date());
    //   }
    //   const value = JSON.stringify(existingData);
    //   await Preferences.set({ key, value });
    // }

    async function confirm_memo () {
        let token = await getName("token")
        modal.current?.dismiss("", "confirm");

        //update local storage
      async function updateMemoLS(id:string, memoContent:string) {
        const key = "memo";
        const existingValue = await Preferences.get({ key });
        const existingData = existingValue.value ? JSON.parse(existingValue.value) : [];
        const index = existingData.findIndex((item: { id: string; }) => item.id === id);
        if (index !== -1) {
          existingData[index].content = memoContent;
          existingData[index].updated_at = JSON.stringify(new Date());
        }
        const value = JSON.stringify(existingData);
        console.log(value)
        await Preferences.set({ key, value });
      }

      updateMemoLS(memoEditorId, memoContent )

        //update db
      const res = await fetch ("http://localhost:8090/editors/update-memo",{
        method: "PUT",
        headers:{
        Authorization:"Bearer " + token,
        "Content-type":"application/json"},
        body: JSON.stringify({
          id: memoEditorId,
          content:memoContent
        })
      })
      const json= await res.json()
      console.log(json)

      
    }
  
    type dataType = {
      data:string,
      id:string
    }
  
    const location = useLocation();
    const data= location.state as dataType;
    
    
    useEffect(() => {
      setMemoEditorContent(JSON.stringify(data.data))
      setMemoEditorId(data.id)
    }, []);


    function handleReEditEditorCallback (childData:any){  
      setMemoContent(childData.content)
    }

  
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
                <IonTitle>Edit Memo</IonTitle>
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
              <ReEditTextEditor content={memoEditorContent} handleReEditEditorCallback={handleReEditEditorCallback}/>
            </IonContent>
          </IonModal>
        </IonPage>
      </>
    );
  };
  
  export default Memos;
  