import React , {useState} from 'react';
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from "react-select";
import classNames from "classnames";
const NewPage = () =>{ 
    const data1 = [
        {
            label : "yryryr",
            value : 75765675
        },
        {
            label : "yryryr",
            value : 75765675
        },{
            label : "yryryr",
            value : 75765675
        },{
            label : "yryryr",
            value : 75765675
        },{
            label : "yryryr",
            value : 75765675
        }, 
    ]
    const [det, addDet] = useState();
    const userId = localStorage.getItem("userId")
return (
   <>
   <h1>My Page</h1>
<label className="form-label">State<span className="declined">*</span></label>
                     
                     <Select
         closeMenuOnSelect={true}
         onSelectResetsInput={false}
         options = {data1}
      
       />
<CKEditor

                     editor={ ClassicEditor }
                     config = {{

                      highlight: {
                        options: [
                            {
                                model: 'greenMarker',
                                class: 'marker-green',
                                title: 'Green marker',
                                color: 'var(--ck-highlight-marker-green)',
                                type: 'marker'
                            },
                            {
                                model: 'redPen',
                                class: 'pen-red',
                                title: 'Red pen',
                                color: 'var(--ck-highlight-pen-red)',
                                type: 'pen'
                            }
                        ]
                    },
                      fontFamily: {
                        options: [
                            'default',
                            'Ubuntu, Arial, sans-serif',
                            'Ubuntu Mono, Courier New, Courier, monospace'
                        ]
                    },
                    fontColor: {
                      colors: [
                          {
                              color: 'hsl(0, 0%, 0%)',
                              label: 'Black'
                          },
                          {
                              color: 'hsl(0, 0%, 30%)',
                              label: 'Dim grey'
                          },
                          {
                              color: 'hsl(0, 0%, 60%)',
                              label: 'Grey'
                          },
                          {
                              color: 'hsl(0, 0%, 90%)',
                              label: 'Light grey'
                          },
                          {
                              color: 'hsl(0, 0%, 100%)',
                              label: 'White',
                              hasBorder: true
                          },

                          // ...
                      ]
                  },
                    toolbar: [
                   ' highlight', 'heading',  'bold', 'fontColor', 'italic',  'bulletedList', 'numberedList', 'undo', 'redo'
                    ],
                  
                    }}
                    
                  
                    id="textarea22"
                    rows="6"
                    name="p_fact"
                
                    onChange={ ( event, editor ) => {
                      addDet(editor.getData());
                     

                    
                  } }

                ></CKEditor>
  
</>
  );
}

export default NewPage;




