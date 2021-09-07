import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

function ImageUploads() {

    const {  register, errors, reset, control, setValue } = useForm({
        defaultValues: {
          users: [{ upload: "" }],
        },
      });


  const { append, fields, remove } = useFieldArray({
    control,
    name: "upload",
  });
  
  return (
    <>
      <div className="question_query mb-2">
        <label className="form-label">Upload Your Document</label>
        <div className="btn btn-primary" onClick={() => append({ pics: "" })}>
          +
        </div>
      </div>

      {fields.map((item, index) => (
        <div className="question_query_field mb-2" key={index}>
          <input
            type="file"
            name={`upload[${index}].pics`}
            ref={register()}
            className="form-control-file"
            defaultValue={item.pics}
          />
          <div className="btn btn-primary ml-2" onClick={() => remove(index)}>
            -
          </div>
        </div>
      ))}
    </>
  );
}

export default ImageUploads;
