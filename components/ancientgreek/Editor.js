import React, { Component } from "react";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
    () => {
        return import("react-draft-wysiwyg").then(mod => mod.Editor);
    },
    { ssr: false }
);

class AncientGreekEditor extends Component {
    constructor(props) {
        super(props);
        console.log(props.starterText);
        if(props.starterText === "") {
            this.state = { editorState: EditorState.createEmpty() };
        } else {
            this.state = {editorState : EditorState.createWithContent(convertFromRaw(JSON.parse(props.starterText))) };
        }
        this.changeText = props.changeText;
    }

    onEditorStateChange = editorState => {
        this.setState({ editorState });
        this.changeText(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    };

    render() {
        const { editorState } = this.state;

        return (
            <div>
                <Editor
                    editorState={editorState}
                    wrapperClassName="rich-editor demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    placeholder="Write text"
                />
            </div>
        );
    }
}

export default AncientGreekEditor;