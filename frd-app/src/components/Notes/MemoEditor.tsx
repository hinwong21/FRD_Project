import React from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

export const MemoEditor:React.FC = () => {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  return (
    <>
  <Editor editorState={editorState} onChange={setEditorState} />
  </>
  );
}


export default MemoEditor;
