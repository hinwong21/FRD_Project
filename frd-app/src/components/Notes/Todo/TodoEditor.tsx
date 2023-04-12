import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonPopover,
  IonReorder,
  IonReorderGroup,
  IonToolbar,
  ItemReorderEventDetail,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import styles from "./TodoEditor.module.css";

//NOTE: Three React.FC-- NewTodoItem, TodoEditor, MemoTodo

interface NewTodoItemProps {
  data: {
    element: {
      id: string;
      content: string;
      checked: boolean;
    };
    index: number;
    // checkedList: any
  };
  handleCheckChange: (id: string) => void;
  handleDelete: (id: string) => void;
}

const NewTodoItem: React.FC<NewTodoItemProps> = ({
  data,
  handleCheckChange,
  handleDelete,
}) => {
  return (
    <IonItemSliding>
      <IonItem className={styles.checkboxIonItem}>
        <div className={styles.checkboxDiv}>
          <IonCheckbox
            slot="end"
            checked={data.element.checked}
            onIonChange={() => {
              handleCheckChange(data.element.id);
            }}
          />
          <IonLabel
            className={styles.todoLabel}
            style={
              data.element.checked ? { textDecoration: "line-through" } : {}
            }
          >
            {data.element.content}
          </IonLabel>
          <IonReorder slot="end"></IonReorder>
        </div>
      </IonItem>
      <IonItemOptions side="start">
        <IonItemOption
          color="danger"
          onClick={() => {
            handleDelete(data.element.id);
          }}
        >
          Delete
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export function TodoEditor(props: {
  handleCallback: (arg0: { todoTitle: string }) => void;
}) {
  const [todoListTitle, setTodoListTitle] = useState("New Todo");
  const [elements, setElements] = useState<
    { id: string; content: string; checked: boolean }[]
  >([]);
  const [newItemInputValue, setNewItemInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [hashtags, setHashtags] = useState<string[]>([
    "#work",
    "#personal",
    "#shopping",
  ]);
  const [searchText, setSearchText] = useState<string>("");
  const [hashTagShow, setHashTagShow] = useState(false);
  const [createHashTagShow, setCreateHashTagShow] = useState(false);
  const [filteredHashtags, setFilteredHashtags] = useState([] as string[]);
  const [memoIdRelated, setMemoIdRelated] = useState("");
  const [isReordering, setIsReordering] = useState(false);
  const [hashTagSelected, setHashtagSelected] = useState([] as string[]);
  // const [deletedElements, setDeletedElements] = useState<{id:string, content:string, checked:boolean}[]>([]);

  const handleAddNewItem = () => {
    const uuid = uuidv4();
    const newItem = {
      id: uuid,
      content: `${newItemInputValue}`,
      checked: false,
    };
    setNewItemInputValue("");
    setElements([...elements, newItem]);
    // setCheckedList({...checkedList, [uuid]: false})
  };

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    setElements(event.detail.complete(elements));
  };

  const handleSearchChange = (event: CustomEvent) => {
    setSearchText(event.detail.value);
  };

  useEffect(() => {
    setFilteredHashtags(
      hashtags.filter((hashtag) =>
        searchText === "" || searchText === "#"
          ? setHashTagShow(false)
          : hashtag.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    // filteredHashtags.length>0?setHashTagShow(true):setHashTagShow(false)
    console.log("Hashtag length:" + filteredHashtags.length);
    console.log("Search Text Length:" + searchText.length);
    if (filteredHashtags.length > 0) {
      setHashTagShow(true);
      setCreateHashTagShow(false);
    } else if (filteredHashtags.length == 0 && searchText.length > 0) {
      console.log(1);
      setHashTagShow(false);
      setCreateHashTagShow(true);
    } else {
      console.log(2);
      setCreateHashTagShow(false);
    }
  }, [searchText]);
  console.log(createHashTagShow, 222);

  const handleCheckChange = (id: string) => {
    console.log("isReordering", isReordering);
    if (isReordering) return;
    const updatedTodos = elements.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          checked: !todo.checked,
        };
      }
      return todo;
    });
    setElements(updatedTodos);
  };

  const handleDelete = (id: string) => {
    const filteredTodos = elements.filter((element) => element.id !== id);
    setElements(filteredTodos);
  };

  const handleDateChange = (e: CustomEvent) => {
    setSelectedDate(e.detail.value);
    // console.log(e.detail.value)
  };

  const handleMemoTodoLinkCallback = (childData: any) => {
    setMemoIdRelated(childData.memoTodoLink);
    console.log(childData.memoTodoLink);
  };

  useEffect(() => {
    props.handleCallback({
      todoTitle: todoListTitle,
    });
  }, [todoListTitle]);

  return (
    <>
      <div className={styles.titleAndMemo}>
        <IonInput
          placeholder="Enter the title"
          className={styles.todoListTitle}
          clearInput={true}
          maxlength={30}
          onIonChange={(event) => {
            setTodoListTitle(event.target.value as string);
          }}
        ></IonInput>

        <IonButton
          color="light"
          id="chooseRelativeMemo"
          size="small"
          className={styles.diaryChooseMemo}
        >
          <FontAwesomeIcon icon={faNoteSticky} />
        </IonButton>
      </div>

      <IonPopover trigger="chooseRelativeMemo" keepContentsMounted={true}>
        <div className={styles.memoWrapperTodo}>
          <MemosTodo handleMemoTodoLinkCallback={handleMemoTodoLinkCallback} />
        </div>
      </IonPopover>

      <IonDatetimeButton
        color="light"
        datetime="datetime"
        className={styles.diaryChooseDate}
      ></IonDatetimeButton>
      <IonModal keepContentsMounted={true}>
        <IonDatetime
          id="datetime"
          presentation="date"
          onIonChange={(e) => {
            handleDateChange(e);
          }}
        ></IonDatetime>
      </IonModal>

      <div className={styles.hashtagAndUseremailWrapper}>
        <div className={styles.hashtagGroupWrapper}>
          <IonInput
            placeholder="#hashtag"
            className={styles.hashtag}
            onIonChange={handleSearchChange}
            maxlength={15}
          ></IonInput>
          {hashTagShow && searchText !== "" && (
            <div className={styles.hashtagAutoComplete}>
              {filteredHashtags.map((hashtag, index) => (
                <div key={uuidv4()} className={styles.hashtagItem}>
                  {hashtag}
                </div>
              ))}
            </div>
          )}
          <div className={styles.createHashWrapper}>
            {createHashTagShow && searchText !== "" && (
              <div className={styles.createHashTagItem}>
                <IonButton size="small" color="light">
                  Create #
                </IonButton>
                {searchText}
              </div>
            )}
          </div>
        </div>

        <IonInput
          placeholder="@User email"
          className={styles.useremail}
        ></IonInput>
      </div>

      <div className={styles.addTodoDiv}>
        <IonInput
          placeholder="Add a new task"
          value={newItemInputValue}
          className={styles.addNewTodoItem}
          maxlength={50}
          onIonChange={(event) => {
            setNewItemInputValue(event.target.value as string);
          }}
        ></IonInput>
        <button className={styles.addBtn}>
          <FontAwesomeIcon icon={faPlus} onClick={handleAddNewItem} />
        </button>
      </div>

      <div className={styles.todoWrapper}>
        <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
          {elements.map((element, index) => (
            <NewTodoItem
              key={uuidv4()}
              data={{ element: element, index: index }}
              handleCheckChange={handleCheckChange}
              handleDelete={handleDelete}
            />
          ))}
        </IonReorderGroup>
      </div>
    </>
  );
}

interface handleMemoTodoLinkProps {
  handleMemoTodoLinkCallback: (arg01: { memoTodoLink: string }) => void;
}

export const MemosTodo: React.FC<handleMemoTodoLinkProps> = ({
  handleMemoTodoLinkCallback,
}) => {
  type MemoType = {
    id: string;
    content: string;
    created_at: string;
    deleted_at: string;
    updated_at: string;
    user_id: number;
  };

  const [memoContent, setMemoContent] = useState<MemoType[]>([]);
  const [memoTodoLink, setMemoTodoLink] = useState("");

  async function getMemo() {
    const res = await fetch("http://localhost:8080/editors/memo", {
      method: "GET",
    });
    const memos = await res.json();
    setMemoContent(memos);
  }

  useEffect(() => {
    handleMemoTodoLinkCallback({
      memoTodoLink,
    });
  }, [memoTodoLink]);

  useEffect(() => {
    getMemo();
  }, []);

  return (
    <>
      <IonItemGroup className={styles.memoTodoScrollGroup}>
        {memoContent.map((item, index) => (
          <div
            // className={styles.memoAContainerTodo}
            className={
              memoTodoLink === item.id
                ? styles.selectedMemoTodo
                : styles.memoAContainerTodo
            }
            key={index}
            onClick={() => {
              setMemoTodoLink(item.id);
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: JSON.parse(item.content) }}
              className={styles.memoBlockTodo}
            ></div>
          </div>
        ))}
      </IonItemGroup>
    </>
  );
};

export default TodoEditor;
