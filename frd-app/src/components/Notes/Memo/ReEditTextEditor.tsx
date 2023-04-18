import React, { SetStateAction, useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../TextEditor/TextEditor.css";

export function ReEditTextEditor(props: { content: string; handleReEditEditorCallback: (arg0: { content: string; }) => void; }) {
  const [textContent, setTextContent] = useState('');
  const [memoContent, setMemoContent] = useState("")
  const quillRef = useRef<ReactQuill | null>(null);


  useEffect(()=>{
    let Delta = Quill.import('delta');
    let passedDelta = new Delta(JSON.parse(props.content as string));
    quillRef.current?.getEditor().setContents(passedDelta)
  },[])

  const handleEditorChange = (value: string) => {
    setTextContent(value);
  };

  props.handleReEditEditorCallback({
    content: memoContent
  })


  useEffect(()=>{
    const delta = quillRef.current?.getEditor().getContents();
    const content = JSON.stringify(delta);
    console.log(content)
    setMemoContent(content)
  },[textContent])

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        // value={addContent}
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
    </div>
  );
}

export default ReEditTextEditor;
