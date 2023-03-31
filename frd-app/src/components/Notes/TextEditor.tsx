import {$getRoot, $getSelection} from 'lexical';
import {useEffect} from 'react';
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

// const exampleTheme = {
//   ltr: 'ltr',
//   rtl: 'rtl',
//   placeholder: 'editor-placeholder',
//   paragraph: 'editor-paragraph',
//   quote: 'editor-quote',
//   heading: {
//     h1: 'editor-heading-h1',
//     h2: 'editor-heading-h2',
//     h3: 'editor-heading-h3',
//     h4: 'editor-heading-h4',
//     h5: 'editor-heading-h5',
//     h6: 'editor-heading-h6',
//   },
//   list: {
//     nested: {
//       listitem: 'editor-nested-listitem',
//     },
//     ol: 'editor-list-ol',
//     ul: 'editor-list-ul',
//     listitem: 'editor-listItem',
//     listitemChecked: 'editor-listItemChecked',
//     listitemUnchecked: 'editor-listItemUnchecked',
//   },
//   hashtag: 'editor-hashtag',
//   image: 'editor-image',
//   link: 'editor-link',
//   text: {
//     bold: 'editor-textBold',
//     code: 'editor-textCode',
//     italic: 'editor-textItalic',
//     strikethrough: 'editor-textStrikethrough',
//     subscript: 'editor-textSubscript',
//     superscript: 'editor-textSuperscript',
//     underline: 'editor-textUnderline',
//     underlineStrikethrough: 'editor-textUnderlineStrikethrough',
//   },
//   code: 'editor-code',
//   codeHighlight: {
//     atrule: 'editor-tokenAttr',
//     attr: 'editor-tokenAttr',
//     boolean: 'editor-tokenProperty',
//     builtin: 'editor-tokenSelector',
//     cdata: 'editor-tokenComment',
//     char: 'editor-tokenSelector',
//     class: 'editor-tokenFunction',
//     'class-name': 'editor-tokenFunction',
//     comment: 'editor-tokenComment',
//     constant: 'editor-tokenProperty',
//     deleted: 'editor-tokenProperty',
//     doctype: 'editor-tokenComment',
//     entity: 'editor-tokenOperator',
//     function: 'editor-tokenFunction',
//     important: 'editor-tokenVariable',
//     inserted: 'editor-tokenSelector',
//     keyword: 'editor-tokenAttr',
//     namespace: 'editor-tokenVariable',
//     number: 'editor-tokenProperty',
//     operator: 'editor-tokenOperator',
//     prolog: 'editor-tokenComment',
//     property: 'editor-tokenProperty',
//     punctuation: 'editor-tokenPunctuation',
//     regex: 'editor-tokenVariable',
//     selector: 'editor-tokenSelector',
//     string: 'editor-tokenSelector',
//     symbol: 'editor-tokenProperty',
//     tag: 'editor-tokenProperty',
//     url: 'editor-tokenOperator',
//     variable: 'editor-tokenVariable',
//   },
// };

// // When the editor changes, you can get notified via the
// // LexicalOnChangePlugin!
// function onChange(editorState: { read: (arg0: () => void) => void; }) {
//   editorState.read(() => {
//     // Read the contents of the EditorState here.
//     const root = $getRoot();
//     const selection = $getSelection();

//     console.log(root, selection);
//   });
// }

// // Lexical React plugins are React components, which makes them
// // highly composable. Furthermore, you can lazy load plugins if
// // desired, so you don't pay the cost for plugins until you
// // actually use them.
// function MyCustomAutoFocusPlugin() {
//   const [editor] = useLexicalComposerContext();

//   useEffect(() => {
//     // Focus the editor when the effect fires!
//     editor.focus();
//   }, [editor]);

//   return null;
// }

// // Catch any errors that occur during Lexical updates and log them
// // or throw them as needed. If you don't throw them, Lexical will
// // try to recover gracefully without losing user data.
// function onError(error: any) {
//   console.error(error);
// }

export function TextEditor() {
  return (
    <EditorComposer>
      <Editor hashtagsEnabled={true}>
        <ToolbarPlugin defaultFontSize="20px">
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
          <InsertDropdown enablePoll={true} />
          <Divider />
          <AlignDropdown />
        </ToolbarPlugin>
      </Editor>
    </EditorComposer>
  );
}

export default TextEditor;