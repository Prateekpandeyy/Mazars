import React, { useEffect, useState, useRef } from "react";
import { Quill } from "react-quill-with-table";
import QuillBetterTable from "quill-better-table";
import "react-quill-with-table/dist/quill.snow.css";
import "react-quill-with-table/dist/quill.bubble.css";
import {Markup} from 'interweave';
Quill.register("modules/better-table", QuillBetterTable);



function CustomQuillEditor(props) {
  const editor = useRef();
  const [text, setText] = useState(props.content);
  
 useEffect(() => {
   if(props.content){
    // var snow = new Quill('#snow-container', {
    //   theme: 'snow',
    //   modules: {
    //     table: true,
    //     toolbar: [
    //       [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    //       [{size: []}],
    //       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    //       [{'list': 'ordered'}, {'list': 'bullet'}, 
    //        {'indent': '-1'}, {'indent': '+1'}],
    //       ['link', 'image', 'video'],
    //       ['clean']
    //     ],
    //   }
    // });
       var snow = new Quill('#snow-container', {
             modules: {
              table: true,
                 toolbar: [
                     [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                     [{size: []}],
                     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                     [{'list': 'ordered'}, {'list': 'bullet'}, 
                      {'indent': '-1'}, {'indent': '+1'}],
                     ['link', 'image', 'video'],
                     ['clean']
                   ],
              
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
   }
 }, [props.content])
  return (
   <>

 {
   props.content ?
   <div class="container" style={{padding: "0px"}}>
   <div class="panel">
     <div id="snow-container">
      <Markup content={props.content} />
     </div>
   
   </div>
 
 </div>  : 
   <div class="container" style={{padding: "0px"}}>
   <div class="panel">
     <div id="snow-container">
   
     </div>
   
   </div>
 
 </div> 
 }
   </>
  
  
  );
}
export default CustomQuillEditor;