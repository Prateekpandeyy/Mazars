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
        theme: 'snow',
        modules: {
          table: true,
        }
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
 <div class="container" style={{padding: "0px", maxWidth : "1920px"}}>
  <div class="panel">
    <div id="snow-container"></div>
   
  </div>

</div>

   </>
  
  
  );
}
export default AddEditor;