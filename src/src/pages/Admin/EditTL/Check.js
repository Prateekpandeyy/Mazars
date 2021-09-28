import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import states from "./states.json";
import axios from "axios";
import { baseUrl } from "../../../config/config";

export default function App({ uid, selectedOption }) {
  const { register, handleSubmit, reset } = useForm();

  console.log("selectedOption", selectedOption);
  //   const usersUrl = `${baseUrl}/tl/getTeamLeader?id=${uid}`;

  const [interest, setInterest] = useState(selectedOption);

  useEffect(() => {
    const fetchData = async () => {
      //   const res = await axios.get(usersUrl);
      //   console.log("data", res.data);
      // var item = res.data.result[0].name
      //   console.log("arr", item.name);
      const a = interest.name;
      console.log("a", a);

      reset({
        street: "123 Fake St",
        state: "CO",
        // parent: a,
      });
    };

    fetchData();
  }, [reset]);

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Street:</label>
          <input name="street" ref={register} />
        </div>

        <div>
          <label>State:</label>
          <select name="state" ref={register}>
            <option key="" value="" />
            {states.map((option) => (
              <option key={option.id} value={option.id}>
                {option.value}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
