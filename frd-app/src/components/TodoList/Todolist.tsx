import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const content = {
  entityMap: {},
  blocks: [
    {
      key: "637gr",
      text: "Initialized from content state.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

class EditorConvertToJSON extends Component {
  constructor(props: any) {
    super(props);
    const contentState = convertFromRaw(content);
    this.state = {
      contentState,
    };
  }

  onContentStateChange: Function = (contentState: any) => {
    this.setState({
      contentState,
    });
  };

  render() {
    const  contentState:any  = this.state;
    return (
      <Editor
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onContentStateChange = {this.onContentStateChange(contentState)}
        hashtag={{
          separator: ' ',
          trigger: '#',
        }}
      />
    );
  }
}
