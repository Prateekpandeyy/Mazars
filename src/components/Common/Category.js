import React, {  useState,  useEffect, createContext} from "react";

import axios from "axios";
import { baseUrl } from "../../config/config";
import AddNew from "../../pages/Admin/AddNewTeamLeader/AddNewTeamLeader";
import CateFun from "./CateFun";
const Category33 = createContext();
const Category = (props) => {
     
       const [tax, setTax] = useState([]);
     
       const [error, setError] = useState()
       const [nn, setNn] = useState([])
       const [categoryData, setCategoryData] = useState([])
       const [custCate, setCustcate] = useState([])
       const [mcatname, setmcatname] = useState([]);
     const [mcategory, setmcategory] = useState([]);
     const [store, setStore] = useState([]);
     const [subData, subCategeryData] = useState([])
     var kk = []
     var vv = []
   
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
     

      // Category Function
const category = (v) => {
 
      setCategoryData(v)
      setNn((oldData) => {
        return [...oldData, mcategory]
      })
      setError("")
      setCustcate(v)
      v.map((val) => {
        vv.push(val.value)
        setmcategory(val.value);
        setmcatname((oldData) => {
          return [...oldData, val.label]
        })
        setStore(val.value)
      })
  
  
      if (vv.length > 0) {
        if (vv.includes("1") && vv.includes("2")) {

        }
        else if (vv.includes("1")) {
  
          for (let i = 0; i < subData.length; i++) {
            if (subData[i].value < 9) {
              kk.push(subData[i])
            }
          }
          subCategeryData(kk)
        }
        else if (vv.includes("2")) {
  
          for (let i = 0; i < subData.length; i++) {
            if (subData[i].value > 8) {
              kk.push(subData[i])
            }
          }
          subCategeryData(kk)
        }
      }
  
      else if (vv.length === 0) {
        subCategeryData("")
      }
  
    }
    const valueProvider = {category, tax, error, nn, categoryData, custCate, mcatname, mcategory, store, subData}
return(
   
    <>
   <Category33.Provider value={"myName"}>
<AddNew />

   </Category33.Provider>
     
                    

    </>
)
}

export default Category;

export {Category33}