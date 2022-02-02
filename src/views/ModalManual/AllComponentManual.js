import React from 'react';
import Query from './Query';
import QueryProcessing  from './QueryProcessing';
import Proposal from './Proposal';
import Assignment from './Assignment';
import Payment from './Payment';
import Scheduler from './Scheduler';
import Feedback from './Feedback';
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

<div style={{display : "flex", height : "100vh", overflow : "scroll"}} onClick= {() =>   goToRow(tar)}>
<Container>
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