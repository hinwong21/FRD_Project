import {useEffect, useRef, useState} from 'react';
// import {
//   EditorComposer,
//   Editor,
//   ToolbarPlugin,
//   AlignDropdown,
//   BackgroundColorPicker,
//   BoldButton,
//   CodeFormatButton,
//   FontFamilyDropdown,
//   FontSizeDropdown,
//   InsertDropdown,
//   InsertLinkButton,
//   ItalicButton,
//   TextColorPicker,
//   TextFormatDropdown,
//   UnderlineButton,
//   Divider,
// } from 'verbum';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./TextEditor.css"

export function TextEditor(props: { handleEditorCallback: (arg0: { content: string; }) => void; }) {
  const [inputContent, setInputContent] = useState("")
  const [textContent, setTextContent] = useState("")
  const quillRef = useRef<ReactQuill | null>(null);

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

  return (
      <ReactQuill
        ref={quillRef}
        value={inputContent}
        onChange={handleEditorChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        }}
        placeholder="Write something amazing..."
      />
  )
}

export default TextEditor;