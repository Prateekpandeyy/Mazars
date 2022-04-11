import React , {useState, useEffect} from 'react';
import Layout from "../../../components/Layout/Layout";
import {Container} from '@material-ui/core';
import {
  Card,
  CardBody,
} from "reactstrap";
import axios from 'axios';
import { styled } from "@material-ui/styles";
import { useHistory } from 'react-router';
import { baseUrl } from '../../../config/config';
import DataTablepopulated from '../../../components/DataTablepopulated/DataTabel';
import  {DeleteIcon, EditQuery,} from "../../../components/Common/MessageIcon";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Markup } from 'interweave';
import CommonServices from "../../../common/common";
import GirdExamplefaq from './GridExamplefaq';
const MyContainer = styled(Container)({

})
const Updates = () =>{ 
    const userId = window.localStorage.getItem("adminkey");
    const [list, setList] = useState([])
    const [check, setCheck] = useState(false)
    let history = useHistory()
    useEffect(() => {
      getList()
    }, [])
  
    const getList = () => {
      axios.get(`${baseUrl}/cms/getallfaq?uid=${JSON.parse(userId)}`)
      .then((res) => {
      console.log("ress", res)
       if(res.data.code === 1){
        setList(res.data.result)
        
       }
      })
    }
   
 

return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>

<MyContainer>
<div className="headingContent">
        <h4>FAQs </h4>
        <Link to={`/cms/faq`}>
<button 
    
    className="autoWidthBtn rightAlign my-2">Add FAQ</button>
      </Link> 
        </div>

        <Card>
          <CardBody>
        
                    <GirdExamplefaq />
          </CardBody>
          </Card>
    </MyContainer>
</Layout>
  );
}

export default Updates;




