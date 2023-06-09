import {
  IonAvatar,
    IonButton,
    IonButtons,
    IonCard,
    IonCheckbox,
    IonContent,
    IonDatetime,
    IonDatetimeButton,
    IonHeader,
    IonImg,
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
    IonTitle,
    IonToast,
    IonToolbar,
    ItemReorderEventDetail,
  } from "@ionic/react";
  import { KeyboardEvent, SetStateAction, useEffect, useRef, useState } from "react";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faPlus, faNoteSticky } from "@fortawesome/free-solid-svg-icons";
  import { v4 as uuidv4 } from "uuid";
  import styles from "./TodoEditor.module.css";
  import { getName } from "../../../service/LocalStorage/LocalStorage";
  import { Preferences } from "@capacitor/preferences";
  import "./modal.css"
  
  //NOTE: Three React.FC in this file-- NewTodoItem, TodoEditor, MemoTodo
  
  interface NewTodoItemProps {
    data: {
      element: {
        id: string;
        content: string;
        checked: boolean;
      };
      index: number;
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
  
  export function TodoReEditor(props:any) {
    const [todoListTitle, setTodoListTitle] = useState("New Todo");
    const [elements, setElements] = useState<
      { id: string; content: string; checked: boolean }[]
    >([]);
    const [newItemInputValue, setNewItemInputValue] = useState("");
    const [selectedDate, setSelectedDate] = useState<string>(JSON.stringify(new Date()));
    const [hashtags, setHashtags] = useState([] as string[]);
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
    const [newlyCreatedHashtagArr, setNewlyCreatedHashtagArr] = useState([] as string[])
    const [memoOpen, setMemoOpen] = useState (false)
    const [memoToDeleteArr, setMemosToDeleteArr] = useState([] as string[])
    const [deleteHashtagArr, setDeleteHashtagArr] = useState([] as string[])
    const [deleteEmailArr, setDeleteEmailArr] = useState([] as string[])
  
  
    useEffect(()=>{
      getHashtags();
      setElements(props.content.task)
      setTodoListTitle(props.content.title)
      setSelectedDate(props.content.due_date)
      setHashtagSelected(props.content.hashtag)
      setSharedEmailArr(props.content.email_shared)
      setMemoIdRelated(props.content.memo)
    },[props.content.memo])

    useEffect(()=>{
      setMemoIdRelated(props.content.memo)
    },[props.content.memo])
      

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
  
    const getHashtags= async()=>{
      const { value } = await Preferences.get({ key: "hashtags" });
      if (value !== null) {
        const value_json = JSON.parse(value)
        const data = value_json.map((obj: { name: any }) => obj.name);
        setHashtags(data);
      }
  }
  
    useEffect(() => {
      setFilteredHashtags(
        hashtags.filter((hashtag) =>
          searchTextHashtag === "" || searchTextHashtag === "#"
            ? setHashTagShow(false)
            : hashtag.toLowerCase().includes(searchTextHashtag.toLowerCase())
        )
      );
      
  
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
      setMemosToDeleteArr(childData.memosToDelete);
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
        todoNewHashtag: newlyCreatedHashtagArr,
        todoEmail: sharedEmailArr,
        todoTask: elements,
        todoMemoRelated: memoIdRelated,
        todoMemoDeleted: memoToDeleteArr,
        deleteHashtagArr: deleteHashtagArr,
        deleteEmailArr: deleteEmailArr
      });
    }, [todoListTitle,selectedDate, hashTagSelected, sharedEmailArr, elements, memoIdRelated, memoToDeleteArr, deleteHashtagArr, deleteEmailArr]);
  
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
  
    const handleCancelHashtag = (index: number, hashtag:string) => {
      const newHashTagSelected = [...hashTagSelected];
      newHashTagSelected.splice(index, 1);
      setHashtagSelected(newHashTagSelected);
      setDeleteHashtagArr([...deleteHashtagArr, hashtag])
    };
  
    const handleCancelNewlyCreatedHashtag = (index: number) => {
      const newNewlyCreatedHashtagArr = [...newlyCreatedHashtagArr];
      newNewlyCreatedHashtagArr.splice(index, 1);
      setNewlyCreatedHashtagArr(newNewlyCreatedHashtagArr);
      
    };
  
    const handleCancelEmail = (index: number, email:string) => {
      const newSharedEmailArr = [...sharedEmailArr];
      newSharedEmailArr.splice(index, 1);
      setSharedEmailArr(newSharedEmailArr);
      setDeleteEmailArr([...deleteEmailArr, email])
    };
  
    const handleNewlyCreatedHashtag = (text: string) => {
      if (!newlyCreatedHashtagArr.includes(text)) {
        setNewlyCreatedHashtagArr([...newlyCreatedHashtagArr, text]);
      } else {
        setShowAlertNewHashtag(true);
        setShowAlertMsg("This hashtag has already been created.")
      }
      setSearchTextHashtag("");
    };

    const handleChooseMemoOnclick = ()=>{
      if (!memoOpen){
        setMemoOpen(true)
      }else{
        setMemoOpen(false)
      }
    }
  
  
    return (
      <>
        <div className={styles.titleAndMemo}>
          <IonInput
            className={styles.todoListTitle}
            
            clearInput={true}
            maxlength={30}
            value={todoListTitle}
            onIonChange={(event) => {
              setTodoListTitle(event.target.value as string);
            }}
          ></IonInput>
  
          <IonButton
            color="light"
            onClick={()=>{handleChooseMemoOnclick()}}
            size="small"
            className={styles.diaryChooseMemo}
          >
            <FontAwesomeIcon icon={faNoteSticky} />
          </IonButton>
        </div>
  
        <IonPopover  isOpen={memoOpen} keepContentsMounted={true}>
          <div className={styles.memoWrapperTodo}>
            <MemosTodo handleMemoTodoLinkCallback={handleMemoTodoLinkCallback} content={memoIdRelated}/>
          </div>
        </IonPopover>

        {/* <IonModal id="example-modal" isOpen={true} className={styles.memoModal}>
          <IonContent>
            <IonToolbar>
              <IonTitle>Memo</IonTitle>
              <IonButtons slot="end">
                <IonButton color="light" >
                  Close
                </IonButton>
              </IonButtons>
            </IonToolbar>
            
          </IonContent>
        </IonModal> */}
  
        <IonDatetimeButton
          color="light"
          datetime="datetime"
          className={styles.diaryChooseDate}
        ></IonDatetimeButton>
        <IonModal keepContentsMounted={true}>
          <IonDatetime
            id="datetime"
            presentation="date"
            value={selectedDate}
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
                      onClick={()=>{handleNewlyCreatedHashtag(searchTextHashtag)}}
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
                placeholder="People"
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
  
        {(hashTagSelected.some(Boolean) || sharedEmailArr.some(Boolean) || newlyCreatedHashtagArr.some(Boolean)) && (
          <div className={styles.hashtagItemSelectedWrapper}>
            {hashTagSelected.filter(Boolean).map((hashtag, index) => (
              <div key={index} className={styles.adjustCancelBtn}>
                <div className={styles.hashtagItemSelected}>{hashtag}</div>
                <button
                  className={styles.cancelButton}
                  onClick={() => handleCancelHashtag(index, hashtag)}
                >
                  x
                </button>
              </div>
            ))}
  
            {newlyCreatedHashtagArr.filter(Boolean).map((hashtag, index) => (
              <div key={index} className={styles.adjustCancelBtn}>
                <div className={styles.hashtagItemSelected}>{hashtag}</div>
                <button
                  className={styles.cancelButton}
                  onClick={() => handleCancelNewlyCreatedHashtag(index)}
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
                  onClick={() => handleCancelEmail(index,email)}
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
    handleMemoTodoLinkCallback: (arg01: { memoTodoLink: string[], memosToDelete: string[] }) => void;
    content:string[]
  } 
  
  export type MemoType = {
      id: string;
      content: string;
      created_at: string;
      deleted_at: string;
      updated_at: string;
      user_id: number;
    };
  
  export const MemosTodo: React.FC<handleMemoTodoLinkProps> = ({
    handleMemoTodoLinkCallback, content
  }) => {

   
  
    const [memoContent, setMemoContent] = useState<MemoType[]>([]);
    const [memoTodoLink, setMemoTodoLink] = useState(content);
    const [previewArr, setPreviewArr] = useState<JSX.Element[]>([]);
    const [memosToDelete, setMemosToDelete] = useState([] as string[]);
  

    async function getMemo() {
      const getMemoLS = async () => {
        const { value } = await Preferences.get({ key: "memo" });
        console.log(value)
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

    useEffect(()=>{
      setPreviewArr(createPreview())
      setMemoTodoLink(content)
    },[memoContent])


    //for fixing the useState delay problem
    //coloring the selected memo for todolist
    useEffect(()=>{
      console.log("the state has changed.", memoTodoLink)
    },[memoTodoLink])

    
  
    useEffect(() => {
      handleMemoTodoLinkCallback({
        memoTodoLink,
        memosToDelete
      });
      // console.log(memoTodoLink)
    }, [memoTodoLink, memosToDelete, memoContent]);



    const handleMemoSelection = (id: string) => {
      const memoLinkContainsId = memoTodoLink.some((memoId) => memoId === id);
      console.log(memoTodoLink)
      if (memoLinkContainsId) {
        const updatedMemoTodoLink = memoTodoLink.filter((memoId) => memoId !== id);
        setMemoTodoLink(updatedMemoTodoLink);
        setMemosToDelete([...memosToDelete, id]);
      } else {
        setMemoTodoLink([...memoTodoLink, id]);
      }
    };
  
    useEffect(() => {
      getMemo();
    }, []);



     //for deletion
  let timer: any;
  function handlePointerDown(id: string) {
    timer = setTimeout(() => {
      console.log("123")
    }, 500);
  }

  
    return (
      <>
        <IonItemGroup className={styles.memoTodoScrollGroup}>
          {memoContent.map((item, index) => (
            <IonCard
              className={
                memoTodoLink.includes(item.id)
                  ? styles.selectedMemoTodo
                  : styles.memoAContainerTodo
              }
              key={item.id}
              onClick={() => {
                handleMemoSelection(item.id);
              }}
              onPointerDown={() => handlePointerDown(item.id)}>
              <div className={styles.memoBlockTodo}>
                    {previewArr[index]}
              </div>
            </IonCard>
          ))}
        </IonItemGroup>
      </>
    );
  };


  // const SelectMemoShowing: React.FC = () => {
  //   const modal = useRef<HTMLIonModalElement>(null);
  
  //   return (
      
        
  //   );
  // };
  
  export default TodoReEditor;
  