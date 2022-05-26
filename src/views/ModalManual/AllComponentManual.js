import React from 'react';
import Query from './Query';
import QueryProcessing  from './QueryProcessing';
import Proposal from './Proposal';
import Assignment from './Assignment';
import Payment from './Payment';
import Scheduler from './Scheduler';
import Feedback from './Feedback';
import Content from './Content';
import Login from './Login';
import { Container } from '@material-ui/core';
import { useEffect } from 'react';
const AllComponentManual = (tar) => {
   
    const goToRow = (e) => {
     
const anchor = document.getElementById(e.tar)
      console.log(anchor)
     if(anchor){
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
     }
     
}

useEffect(() => {
    goToRow(tar)
}, [])
return(
    <>

<div style={{display : "flex", height : "80vh", overflow : "scroll", fontSize : "#fff"}}>
<Container maxWidth = "xl">
<Login />
<Query />
 <QueryProcessing />
 <Proposal />
 <Assignment />
 <Payment />
<Scheduler />
 <Feedback />
</Container>
</div>

</>
)
}
export default AllComponentManual;