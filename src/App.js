import React, { useState, useEffect } from 'react'
import WebRoutes from './WebRoutes';
import IdleTimeOutHandler from './components/IdleTimeOutHandler';
export default function App () {
  const[isActive,setIsActive]=useState(true)
  const[isLogout,setLogout]=useState(false)


  return (
   <>
   
 
  

   <WebRoutes />
  
     
     
   </>
  )
}