import { IonPage, IonContent, IonItemDivider, IonItemGroup, IonLabel } from "@ionic/react";
import React, { useEffect, useState, Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw } from "draft-js";
import styles from "../Notes.module.css";


export const TodoLists: React.FC = () => {
  return (
    <>
      <IonItemGroup>
        <IonItemDivider>
          <IonLabel className={styles.todoLabel}>Todo</IonLabel>
        </IonItemDivider>
        </IonItemGroup>
    </>
  );
};

export default TodoLists;