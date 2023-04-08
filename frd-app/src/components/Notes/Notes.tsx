import React, { useEffect, useState, useRef } from "react";
import styles from "./Notes.module.css";
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
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import ReEditTextEditor from "./Memo/ReEditTextEditor";
import { useLocation } from "react-router-dom";

type MemoType = {
  id: string;
  content: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
  user_id: number;
};

export const Notes: React.FC = () => {
  const [memoContent, setMemoContent] = useState<MemoType[]>([]);

  async function getMemo() {
    const res = await fetch("http://localhost:8080/editors/memo", {
      method: "GET",
    });
    const memos = await res.json();
    setMemoContent(memos);
  }

  useEffect(() => {
    getMemo();
  }, []);

  return (
    <>
      <div>Good Day, {}</div>

      <IonItemGroup>
        <IonItemDivider>
          <IonLabel>Today</IonLabel>
        </IonItemDivider>

        {/* <IonItem>
         
        </IonItem> */}
      </IonItemGroup>

      <IonItemGroup>
        <IonItemDivider>
          <IonLabel>Tomorrow</IonLabel>
        </IonItemDivider>

        {/* <IonItem>
         
        </IonItem> */}
      </IonItemGroup>

      <IonItemGroup>
        <IonItemDivider>
          <IonLabel>The Day After Tomorrow</IonLabel>
        </IonItemDivider>

        {/* <IonItem>
         
        </IonItem> */}
      </IonItemGroup>
    </>
  );
};

export const EditMemo = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonInputElement>(null);

  const [memoEditorContent, setMemoEditorContent] = useState({});
  const [memoEditorId, setMemoEditorId] = useState("");

  function onWillDismiss_memo(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      console.log("memo");
    }
  }

  async function confirm_memo() {
    modal.current?.dismiss("", "confirm");

    const memoContent = document.querySelector(
      ".ContentEditable__root"
    )?.innerHTML;
    const res = await fetch("http://localhost:8080/editors/update-memo", {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        id: memoEditorId,
        content: memoContent,
      }),
    });
    // await res.json()
  }

  type dataType = {
    data: string;
    id: string;
  };

  const location = useLocation();
  const data = location.state as dataType;

  useEffect(() => {
    setMemoEditorContent(`${JSON.parse(data.data as string)}`);
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
              <IonTitle>New Memo</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm_memo()}>
                  Confirm
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <ReEditTextEditor content={memoEditorContent} />
          </IonContent>
        </IonModal>
      </IonPage>
    </>
  );
};

export default Notes;
