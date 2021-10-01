import React from 'react';
import { createContext } from 'react';
import { useState } from 'react';
import AddNew from '../../pages/Admin/AddNewTeamLeader/AddNewTeamLeader';
import Category  from './Category';

const catData = createContext();
const catData2 = createContext();
const CateFun = () => {
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

// Category Function
const category = (v) => {
console.log("done2", v)
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
        console.log("hdd")
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
  const valueProvider = {category, store}
return(
  <>
  

    <catData.Provider value= {"Prateek"}>
    

<Category />
    </catData.Provider>
 
    </>
   
)

}
export default CateFun;
export { catData };