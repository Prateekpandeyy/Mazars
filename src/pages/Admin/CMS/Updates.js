import React , {useState} from 'react';
import Layout from "../../../components/Layout/Layout";
import {Container} from '@material-ui/core';
import {
  Card,
  CardBody,
} from "reactstrap";
import { styled } from "@material-ui/styles";
import { useHistory } from 'react-router';
const MyContainer = styled(Container)({

})
const Updates = () =>{ 
    const userId = window.localStorage.getItem("adminkey");
   
    let history = useHistory()
  
return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>

<MyContainer>
     
     <button 
    
      className="autoWidthBtn rightAlign my-2" onClick={(e) => {
        history.push("/admin/updatecontent")
      }}>Create message</button>
    <Card>
        <CardBody>
       
        </CardBody>
        </Card>
   
    </MyContainer>
</Layout>
  );
}

export default Updates;




