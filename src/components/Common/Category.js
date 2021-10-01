import React, {  useState,  useEffect} from "react";
import Select from "react-select";
import axios from "axios";
import { baseUrl } from "../../config/config";
import { useContext } from "react";
import { catData } from './CateFun';
const Category = (props) => {
       const cateData2 = useContext(catData) 
       const [tax, setTax] = useState([]);
       const [error, setError] = useState()
       const options = tax.map(d => (
        {
          "value": d.id,
          "label": d.details
        }))

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
     
return(
   
    <>
   
     <Select isMulti options={options}
                        className={error ? "customError" : ""}
                        styles={{
                          option: (styles, { data }) => {
                            return {
                              ...styles,
                              color: data.value == 2
                                ? "green"
                                : "blue"
                            };
                          },
                          multiValueLabel: (styles, { data }) => ({
                            ...styles,
                            color: data.value == 2
                              ? "green"
                              : "blue"
                          }),
                        }}
                        //  onChange={(e) => cateData2.category(e)}
                      >
                      </Select>
                     <h1>{cateData2}</h1>

    </>
)
}

export default Category;

