import * as React from 'react';
import { useState } from 'react';
import { EditorState, convertToRaw, draftToHtml } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

// Hooks version of the Class below (done by me)
const WYSIWYGEditor = ({ input, meta , showData}) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    // const onEditorStateChange = editorState => {
    //   setEditorState(editorState)
    //   return (draftToHtml(convertToRaw(editorState.getCurrentContent())))
  
    // } 
   const  onEditorStateChange = (editorState) => {
        // console.log(editorState)
      setEditorState(editorState)
      showData(editorState)
      };

    return (
        <div className="editor">
            <Editor 
            editorState={editorState} 
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
         
            />
            {
                console.log('editorState => ', convertToRaw(editorState.getCurrentContent()))
            }
        </div>
    )
}

export default WYSIWYGEditor;