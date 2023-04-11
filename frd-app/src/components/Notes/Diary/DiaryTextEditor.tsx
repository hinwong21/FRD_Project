import {useEffect, useState} from 'react';
import {
  EditorComposer,
  Editor,
  ToolbarPlugin,
  AlignDropdown,
  BackgroundColorPicker,
  BoldButton,
  CodeFormatButton,
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
import "../TextEditor/TextEditor.css"

export function DiaryTextEditor() {

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
          <InsertDropdown />
          <Divider />
          <AlignDropdown />
        </ToolbarPlugin>
      </Editor>
    </EditorComposer>
  );
}

export default DiaryTextEditor;