import {useEffect, useState} from 'react';
import {
  EditorComposer,
  Editor,
} from 'verbum';
import "../TextEditor/TextEditor.css"

export function DiaryViewer(props:any) {
  const [addContent, setAddContent] = useState(props.content)
  
  
  useEffect(()=>{
    let textArea  = document.querySelector(".ContentEditable__root")
    textArea!.innerHTML = addContent;
  },[])
  
  return (
    <EditorComposer>
      <Editor>
      </Editor>
    </EditorComposer>
  );
}

export default DiaryViewer;