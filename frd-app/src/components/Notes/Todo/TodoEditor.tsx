import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonInput,
  IonItem,
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
  IonToast,
  IonToolbar,
  ItemReorderEventDetail,
} from "@ionic/react";
import { KeyboardEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import styles from "./TodoEditor.module.css";
import { getName } from "../../../service/LocalStorage/LocalStorage";

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
  handleCallback: (arg0: { todoTitle: string,
    todoDate: string,
    todoHashtag: string[],
    todoEmail: string[],
    todoTask: {}[],
    todoMemoRelated: string[] 
  }) => void;
}) {
  const [todoListTitle, setTodoListTitle] = useState("New Todo");
  const [elements, setElements] = useState<
    { id: string; content: string; checked: boolean }[]
  >([]);
  const [newItemInputValue, setNewItemInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>(JSON.stringify(new Date()));
  const [hashtags, setHashtags] = useState<string[]>([
    "#work",
    "#personal",
    "#shopping",
  ]);
  const [searchTextHashtag, setSearchTextHashtag] = useState<string>("");
  const [hashTagShow, setHashTagShow] = useState(false);
  const [createHashTagShow, setCreateHashTagShow] = useState(false);
  const [filteredHashtags, setFilteredHashtags] = useState([] as string[]);
  const [memoIdRelated, setMemoIdRelated] = useState([] as string[]);
  const [isReordering, setIsReordering] = useState(false);
  const [hashTagSelected, setHashtagSelected] = useState([] as string[]);
  const [showAlertNewHashtag, setShowAlertNewHashtag] = useState(false);
  const [sharedEmail, setSharedEmail] = useState<
    string | undefined | null | number | any
  >("");
  const [sharedEmailInput, setSharedEmailInput] = useState("");
  const [sharedEmailArr, setSharedEmailArr] = useState([] as string[]);
  const [showAlertMsg, setShowAlertMsg] =useState("")
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
  };

  const handleReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    setElements(event.detail.complete(elements));
  };

  const handleSearchChange = (event: CustomEvent) => {
    setSearchTextHashtag(event.detail.value);
  };

  useEffect(() => {
    setFilteredHashtags(
      hashtags.filter((hashtag) =>
        searchTextHashtag === "" || searchTextHashtag === "#"
          ? setHashTagShow(false)
          : hashtag.toLowerCase().includes(searchTextHashtag.toLowerCase())
      )
    );
    // filteredHashtags.length>0?setHashTagShow(true):setHashTagShow(false)

    if (filteredHashtags.length > 0) {
      setHashTagShow(true);
      setCreateHashTagShow(false);
    } else if (filteredHashtags.length == 0 && searchTextHashtag.length > 0) {
      setHashTagShow(false);
      setCreateHashTagShow(true);
    } else {
      setCreateHashTagShow(false);
    }
  }, [searchTextHashtag]);

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
  };

  const handleMemoTodoLinkCallback = (childData: any) => {
    setMemoIdRelated(childData.memoTodoLink);
    // console.log(childData.memoTodoLink);
  };

  const handelHashtagSelect = (hashtag: string) => {
    if (!hashTagSelected.includes(hashtag)) {
      setHashtagSelected([...hashTagSelected, hashtag]);
    } else {
      setShowAlertNewHashtag(true);
      setShowAlertMsg("This hashtag has already been selected.")
    }
    setSearchTextHashtag("");
  };

  useEffect(() => {
    props.handleCallback({
      todoTitle: todoListTitle,
      todoDate: selectedDate,
      todoHashtag: hashTagSelected,
      todoEmail: sharedEmailArr,
      todoTask: elements,
      todoMemoRelated: memoIdRelated
    });
  }, [todoListTitle,selectedDate, hashTagSelected, sharedEmailArr, elements, memoIdRelated]);

  const handleEmailInputChange = (event: CustomEvent) => {
    setSharedEmailInput(event.detail.value);
  };

  function handleEmailSubmit(sharedEmailInput:string) {
    if (!sharedEmailArr.includes(sharedEmailInput)) {
      setSharedEmailArr([...sharedEmailArr, sharedEmailInput]);
    } else {
      setShowAlertNewHashtag(true);
      setShowAlertMsg("This email has already been selected.")
    }
    setSharedEmailInput("");
  }

  const handleCancelHashtag = (index: number) => {
    const newHashTagSelected = [...hashTagSelected];
    newHashTagSelected.splice(index, 1);
    setHashtagSelected(newHashTagSelected);
  };

  const handleCancelEmail = (index: number) => {
    const newSharedEmailArr = [...sharedEmailArr];
    newSharedEmailArr.splice(index, 1);
    setSharedEmailArr(newSharedEmailArr);
  };


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
            value={searchTextHashtag}
            placeholder="#hashtag"
            className={styles.hashtag}
            onIonChange={handleSearchChange}
            maxlength={15}
          ></IonInput>
          {hashTagShow && searchTextHashtag !== "" && (
            <div className={styles.hashtagAutoComplete}>
              {filteredHashtags.map((hashtag, index) => (
                <div
                  key={uuidv4()}
                  className={styles.hashtagItem}
                  onClick={() => {
                    handelHashtagSelect(hashtag);
                  }}
                >
                  <div className={styles.hashtagContent}>{hashtag}</div>
                </div>
              ))}
            </div>
          )}

          {createHashTagShow && searchTextHashtag !== "" && (
            <div className={styles.createHashWrapper}>
              <div className={styles.createHashTagItem}>
                <div className={styles.createHashTagBtnWrapper}>
                  <IonButton
                    size="small"
                    color="light"
                    className={styles.createHashtagBtn}
                  >
                    Create #
                  </IonButton>
                </div>
                <div className={styles.newHashtagText}>{searchTextHashtag}</div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.hashtagAndUseremailWrapper}>
          <div className={styles.hashtagGroupWrapper}>
            <IonInput
              placeholder="@User email"
              className={styles.useremail}
              type="email"
              value={sharedEmailInput}
              onIonChange={handleEmailInputChange}
              // onKeyPress={handleKeyPress}
            ></IonInput>

            {sharedEmailInput.length > 0 && (
              <div
                className={styles.sharedEmailItem}
                onClick={() => {
                  handleEmailSubmit(sharedEmailInput);
                }}
              >
                {sharedEmailInput}
              </div>
            )}
          </div>
        </div>
      </div>

      {(hashTagSelected.some(Boolean) || sharedEmailArr.some(Boolean)) && (
        <div className={styles.hashtagItemSelectedWrapper}>
          {hashTagSelected.filter(Boolean).map((hashtag, index) => (
            <div key={index} className={styles.adjustCancelBtn}>
              <div className={styles.hashtagItemSelected}>{hashtag}</div>
              <button
                className={styles.cancelButton}
                onClick={() => handleCancelHashtag(index)}
              >
                x
              </button>
            </div>
          ))}
          
          {sharedEmailArr.filter(Boolean).map((email, index) => (
            <div key={index} className={styles.adjustCancelBtn}>
            
              <div className={styles.hashtagItemSelected}>{email}</div>
              <button
                className={styles.cancelButton}
                onClick={() => handleCancelEmail(index)}
              >
                x
              </button>
            
            </div>
          ))}
          
        </div>
      )}



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

      <IonToast
        isOpen={showAlertNewHashtag}
        message={showAlertMsg}
        duration={5000}
      ></IonToast>
    </>
  );
}

interface handleMemoTodoLinkProps {
  handleMemoTodoLinkCallback: (arg01: { memoTodoLink: string[] }) => void;
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
  const [memoTodoLink, setMemoTodoLink] = useState([] as string[]);

  async function getMemo() {
    let token = await getName("token")
    const res = await fetch("http://localhost:8080/editors/memo", {
      headers:{
        Authorization:"Bearer " + token},
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

  const handleMemoSelection = (id: string)=>{
    setMemoTodoLink([...memoTodoLink, id])
  }

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
              memoTodoLink[index] === item.id
                ? styles.selectedMemoTodo
                : styles.memoAContainerTodo
            }
            key={index}
            onClick={() => {
              handleMemoSelection(item.id);
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
