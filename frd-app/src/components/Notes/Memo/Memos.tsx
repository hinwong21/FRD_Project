import React, { useEffect, useState, useRef } from "react";
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
  IonCard,
  IonAlert,
  IonToast,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import ReEditTextEditor from "./ReEditTextEditor";
import { useLocation } from "react-router-dom";
import { getName } from "../../../service/LocalStorage/LocalStorage";
import { Preferences } from "@capacitor/preferences";
import { useDispatch } from "react-redux";
import { setShouldGetDataMemo } from "../../../redux/Notes/memoSlice";
import { setNotesAlertMsg } from "../../../redux/Notes/notesAlertMsgSlice";
import { setNotesAlertShow } from "../../../redux/Notes/notesAlertSlice";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store/store";
import { api_origin } from "../../../service/api";


export type MemoType = {
  id: string;
  content: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
  user_id: number;
};

export const Memos: React.FC = () => {
  const shouldGetDataMemo = useSelector(
    (state: IRootState) => state.memo.shouldGetDataMemo
  );
  const notesAlertShow = useSelector((state:IRootState)=> state.alert.errMsgShow)
  const notesAlertMsg = useSelector((state:IRootState)=> state.alertMsg.errMsg)
  const [memoContent, setMemoContent] = useState<MemoType[]>([]);
  const [previewArr, setPreviewArr] = useState<JSX.Element[]>([]);
  const [presentAlert, setPresentAlert] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState("");
  const dispatch = useDispatch();

  async function getMemo() {
    const getMemoLS = async () => {
      const { value } = await Preferences.get({ key: "memo" });
      if (value !== null) {
        setMemoContent(JSON.parse(value));
      }
    };
    getMemoLS();
    dispatch(setShouldGetDataMemo(false));
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

  useEffect(() => {
    getMemo();
  }, []);

  useEffect(() => {
    getMemo();
  }, [shouldGetDataMemo]);

  useEffect(() => {
    setPreviewArr(createPreview());
  }, [memoContent]);

  //for deletion
  let timer: any;
  function handlePointerDown(id: string) {
    timer = setTimeout(() => {
      // console.log("Long press event detected!");
      setPresentAlert(true);
      setSelectedMemo(id);
    }, 500);
  }

  const handleAlertButtonClick = async (buttonIndex: number) => {
    if (buttonIndex === 1) {
      setPresentAlert(false);
      const deleteMemoFromPreferences = async (id: string) => {
        const key = "memo";
        const existingValue = await Preferences.get({ key });
        const existingData = existingValue.value
          ? JSON.parse(existingValue.value)
          : [];
        const newData = existingData.filter((memo: any) => memo.id !== id);
        const value = JSON.stringify(newData);
        await Preferences.set({ key, value });
        dispatch(setShouldGetDataMemo(true));
      };
      deleteMemoFromPreferences(selectedMemo);
    } else if (buttonIndex === 0) {
      setPresentAlert(false);
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
          <IonLabel className={styles.memoLabel}>Memo</IonLabel>
        </IonItemDivider>

        <IonAlert
          header="Delete this memo?"
          isOpen={presentAlert}
          animated={true}
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => handleAlertButtonClick(0),
            },
            {
              text: "Delete",
              role: "confirm",
              handler: () => handleAlertButtonClick(1),
            },
          ]}
          onDidDismiss={() => setPresentAlert(false)}
        ></IonAlert>

    <IonToast isOpen={notesAlertShow} message={notesAlertMsg} duration={5000}></IonToast>

        <div className={styles.mainMemoContainer}>
          <div className={styles.memoWrapper}>
            {memoContent.map((item, index) => (
              <Link
                to={{
                  pathname: "./EditMemo",
                  state: { data: JSON.parse(item.content), id: item.id },
                }}
                className={styles.memoAContainer}
                key={index}
              >
                <IonCard
                  className={styles.memoAContainer}
                  onPointerDown={() => handlePointerDown(item.id)}
                  onPointerUp={handlePointerUp}
                >
                  <div
                    // dangerouslySetInnerHTML={{ __html: JSON.parse(item.content).ops.insert }}
                    className={styles.memoBlock}
                  >
                    <div>{previewArr[index]}</div>
                  </div>

                  <div className={styles.memoUpdatedTime}>
                    {item.updated_at.slice(1, 11)}
                  </div>
                  <div className={styles.memoUpdatedTime}>
                    {item.updated_at.slice(12, 17)}
                  </div>
                </IonCard>
              </Link>
            ))}
          </div>
        </div>
      </IonItemGroup>
    </>
  );
};

export const EditMemo = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);
  const dispatch = useDispatch();

  const [memoEditorContent, setMemoEditorContent] = useState("");
  const [memoEditorId, setMemoEditorId] = useState("");
  const [memoContent, setMemoContent] = useState("");
  // const [showAlert, setShowAlert] = useState(false)
  // const [alertMsg, setAlertMsg] = useState("")

  async function onWillDismiss_memo(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      console.log("memo");
    }
  }

  async function confirm_memo() {
    let token = await getName("token");
    modal.current?.dismiss("", "confirm");

    //update local storage
    async function updateMemoLS(id: string, memoContent: string) {
      const key = "memo";
      const existingValue = await Preferences.get({ key });
      const existingData = existingValue.value
        ? JSON.parse(existingValue.value)
        : [];
      const index = existingData.findIndex(
        (item: { id: string }) => item.id === id
      );
      if (index !== -1) {
        existingData[index].content = memoContent;
        existingData[index].updated_at = JSON.stringify(new Date());
      }
      try{
        const value = JSON.stringify(existingData);
      console.log(value);
      await Preferences.set({ key, value });
      dispatch(setShouldGetDataMemo(true));
      } catch (error) {
      // console.log(error)
      dispatch(setNotesAlertShow(true))
      dispatch(setNotesAlertMsg("Exceeded size limit. Please try inserting fewer images."))
      //reset the alert show value to false
      const timer = setTimeout(() => {
        dispatch(setNotesAlertShow(false))
      }, 5000);
      return () => clearTimeout(timer);     
  }
}
updateMemoLS(memoEditorId, memoContent);
    
    
    //update db
    const res = await fetch(`${api_origin}/editors/update-memo`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: memoEditorId,
        content: memoContent,
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
    setMemoEditorContent(JSON.stringify(data.data));
    setMemoEditorId(data.id);
  }, []);

  function handleReEditEditorCallback(childData: {content:string}) {
    setMemoContent(childData.content);
      // const parsedContent = JSON.parse(childData.content).ops as any;
      // parsedContent.map((content: any, contentIndex: any) => {
      //   if (content.insert.image){
      //     setShowAlert(true)
      //     setAlertMsg("Caution: You may exceed the size limit. To avoid losing your content, please insert no more than one image.")
      //     const timer = setTimeout(() => {
      //      setShowAlert(false)
      //     }, 5000);
      //     return () => clearTimeout(timer);
      //   }

      // })
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

          {/* <IonToast isOpen={showAlert} message={alertMsg} duration={5000}></IonToast> */}

            <ReEditTextEditor
              content={memoEditorContent}
              handleReEditEditorCallback={handleReEditEditorCallback}
            />
          </IonContent>
        </IonModal>
      </IonPage>
    </>
  );
};

export default Memos;
