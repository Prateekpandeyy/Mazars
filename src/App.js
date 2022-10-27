import React, { useState, useEffect } from 'react'
import WebRoutes from './WebRoutes';
import { hot } from "react-hot-loader";
import IdleTimeOutHandler from './components/IdleTimeOutHandler';
 function App () {
 
  const clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  
  };
  useEffect(() => {
    clearCacheData()
  },[])
  return (
   <>
   
 
  

   <WebRoutes />
  
     
     
   </>
  )
}
export default  hot(module)(App)