import React, { useEffect, useState, useRef } from "react";
import { Quill } from "react-quill-with-table";
import QuillBetterTable from "quill-better-table";
import "react-quill-with-table/dist/quill.snow.css";
import "react-quill-with-table/dist/quill.bubble.css";

Quill.register("modules/better-table", QuillBetterTable);



function AddEditor() {
  const editor = useRef();
  const [text, setText] = useState("");
 useEffect(() => {
  var snow = new Quill('#snow-container', {
    modules: {
     table: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
        
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script':'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          [{ 'direction': 'rtl' }],                         // text direction
        
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        
          [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
          [{ 'font': [] }],
          [{ 'align': [] }],
        
          ['clean'],                                         // remove formatting button
          ['link', 'image'],
          ['spanblock']
        ]
     
    },

    placeholder: 'Compose an epic...',
    theme: 'snow'    
  });



      const table = snow.getModule('table');
      snow.on('text-change', function(delta, old, source) {
        if (source === 'user') {
       
          updateOutput();
        }
      });
      
      function updateOutput() {
        const snowContent = snow.getContents();
      }    
 }, [])
  return (
   <>
 <div className="container" style={{padding: "0px", width: "100%", margin: "0px", maxWidth : "210mm"}}>
  <div className="panel">
    <div id="snow-container"></div>
   
  </div>

</div>

   </>
  
  
  );
}
export default AddEditor;