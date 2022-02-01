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
const AllComponentManual = () => {
return(
    <>

<div style={{display : "flex", height : "100vh", overflow : "scroll"}}>
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