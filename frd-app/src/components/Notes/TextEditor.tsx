import {$getRoot, $getSelection} from 'lexical';
import {useEffect, useState} from 'react';
import {
  EditorComposer,
  Editor,
  ToolbarPlugin,
  AlignDropdown,
  BackgroundColorPicker,
  BoldButton,
  CodeFormatButton,
  FloatingLinkEditor,
  FontFamilyDropdown,
  FontSizeDropdown,
  InsertDropdown,
  InsertLinkButton,
  ItalicButton,
  TextColorPicker,
  TextFormatDropdown,
  UnderlineButton,
  Divider,
} from 'verbum';
import "./TextEditor.css"

export function TextEditor(props:any) {
  const [addContent, setAddContent] = useState(props.content)


  useEffect(()=>{
    let textArea  = document.querySelector(".ContentEditable__root")
    console.log(textArea)
    console.log(addContent)
    textArea!.innerHTML = addContent ;
  },[])
  
  return (
    <EditorComposer>
      <Editor hashtagsEnabled={true} emojisEnabled={true} autoLinkEnabled={true} >
        <ToolbarPlugin defaultFontSize="15px">
          <FontFamilyDropdown />
          <FontSizeDropdown />
          <Divider />
          <BoldButton />
          <ItalicButton />
          <UnderlineButton />
          <CodeFormatButton />
          <InsertLinkButton />
          <TextColorPicker />
          <BackgroundColorPicker />
          <TextFormatDropdown />
          <Divider />
          <InsertDropdown enableYoutube={true} enableImage={true}/>
          <Divider />
          <AlignDropdown />
        </ToolbarPlugin>
      </Editor>
    </EditorComposer>
  );
}

export default TextEditor;