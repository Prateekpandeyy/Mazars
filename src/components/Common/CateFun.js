import React from 'react';
import Select from "react-select";
import { useState , useEffect, useContext} from 'react';
import axios from "axios";
import { baseUrl } from '../../config/config';
import { Category33 } from './Category';
const CateFun = () => {
  const dataCate = useContext(Category33);
  const [tax, setTax] = useState([]);
  const [error, setError] = useState()
  const getCategory = async () => {
    await axios.get(`${baseUrl}/customers/getCategory?pid=0`).then((res) => {
      if (res.data.code === 1) {
      
        setTax(res.data.result);
      }
    });
  };
  
// UseEffect 
useEffect(() => {
getCategory();
}, []);
  const options = tax.map(d => (
    {
      "value": d.id,
      "label": d.details
    }))
return(
  <>
  
  <Select isMulti options={options}
                        className={error ? "customError" : ""}
                        styles={{
                          option: (styles, { data }) => {
                            return {
                              ...styles,
                              color: data.value === 2
                                ? "green"
                                : "blue"
                            };
                          },
                          multiValueLabel: (styles, { data }) => ({
                            ...styles,
                            color: data.value === 2
                              ? "green"
                              : "blue"
                          }),
                        }}
                       onChange={() => dataCate.Category()}
                      >
                      </Select>
                     
    </>
   
)

}
export default CateFun;
