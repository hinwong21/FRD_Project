import React from "react";
import styles from "./TodoPreview.module.css";

export const TodoPreview = () => {
  return (
    <>
      <div className={styles.todoWrapper}>
        <div className={styles.todo}>
          <div className={styles.title}>What to do?</div>
        </div>
      </div>
    </>
  );
};

export default TodoPreview;
