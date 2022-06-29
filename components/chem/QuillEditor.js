import $ from "jquery";
import katex from "katex";
import React from "react";
import ReactQuill, { Quill } from "react-quill";

if (typeof window !== "undefined") {
  window.katex = katex;
  window.jQuery = window.$ = $;
  const mathquill4quill = require("mathquill4quill");
  require("mathquill/build/mathquill.js");
}

class QuillEditor extends React.Component {
  constructor(props) {
    super(props);
    this.reactQuill = React.createRef();
    this.attachQuillRefs = this.attachQuillRefs.bind(this);
  }

  componentDidMount() {
    this.attachQuillRefs();
  }

  attachQuillRefs() {
    const enableMathQuillFormulaAuthoring = mathquill4quill({ Quill, katex });
    enableMathQuillFormulaAuthoring(
      this.reactQuill.current.editor,
      this.props.options
    );
  }

  imageHandler() {
    var range = this.quill.getSelection();
    var value = prompt('Paste Image URL here');
    if (value) {
      this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
    }
  }

  render() {
    return (
      <ReactQuill
        ref={this.reactQuill}
        modules={{
          formula: true,
          toolbar: {
            container: [
              ["video", "image", "bold", "italic", "underline", "strike", "formula"],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ],
            handlers: {
              image: this.imageHandler
            }
          },
        }}
        // theme={"snow"}
        placeholder={"Compose an epic ..."}
        bounds={".quill"}
        value={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}

export default QuillEditor;