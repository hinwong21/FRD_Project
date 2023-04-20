import {useEffect, useRef, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./TextEditor.css"
import { setNotesAlertMsg } from "../../../redux/Notes/notesAlertMsgSlice";
import { setNotesAlertShow } from "../../../redux/Notes/notesAlertSlice";
import { useSelector } from "react-redux";
import { IRootState } from "../../../redux/store/store";
import { IonToast } from '@ionic/react';
import { useDispatch } from "react-redux";

export function TextEditor(props: { handleEditorCallback: (arg0: { content: string; }) => void; }) {
  const [inputContent, setInputContent] = useState("")
  const [textContent, setTextContent] = useState("")
  const notesAlertShow = useSelector((state:IRootState)=> state.alert.errMsgShow)
  const notesAlertMsg = useSelector((state:IRootState)=> state.alertMsg.errMsg)
  const quillRef = useRef<ReactQuill | null>(null);
  const dispatch = useDispatch();

  const handleEditorChange = (value: string) => {
    setInputContent(value);
  };

  useEffect(()=>{
    const delta = quillRef.current?.getEditor().getContents();
    const content = JSON.stringify(delta);
    console.log(content)
    setTextContent(content)
    props.handleEditorCallback({
      content: textContent
    })
  },[inputContent])

  // document.querySelector(".ql-image")?.addEventListener("click",()=>{
  //   console.log(123)
  //   dispatch(setNotesAlertShow(true))
  //     dispatch(setNotesAlertMsg("Exceeded size limit. Please try inserting fewer images."))
  //     //reset the alert show value to false
  //     const timer = setTimeout(() => {
  //       dispatch(setNotesAlertShow(false))
  //     }, 5000);
  //     return () => clearTimeout(timer);  
  // })

  return (
    <>
      <ReactQuill
        ref={quillRef}
        value={inputContent}
        onChange={handleEditorChange}
        modules={{
          toolbar: [
            [{color :[]}],
            [{background :[]}],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
            [{align:[]}],
            ['link', 'image'],
            ['clean'],
          ],
        }}
        placeholder="Write something amazing..."
      />
      <IonToast isOpen={notesAlertShow} message={notesAlertMsg} duration={5000}></IonToast>
      </>
  )
}

export default TextEditor;