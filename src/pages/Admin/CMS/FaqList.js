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

const MyContainer = styled(Container)({

})
const Updates = () =>{ 
    const userId = window.localStorage.getItem("adminkey");
    const [list, setList] = useState([])
    let history = useHistory()
    useEffect(() => {
      getList()
    }, [])
  
    const getList = () => {
      axios.get(`${baseUrl}/admin/pagelist?uid=${JSON.parse(userId)}&id=4`)
      .then((res) => {
      console.log("ress", res)
       if(res.data.code === 1){
        setList(res.data.result)
        
       }
      })
    }
    const columns = [
     
      {
        dataField : "",
        text : "",
        formatter : function myUpdates(cell, row) {
            return(
              <Markup content={row.content} />
            )
          }
      },
     
    ]
    
  
  
return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>

<MyContainer>
<Link to={`/admin/faqedit/4`}>
<button 
    
    className="autoWidthBtn rightAlign my-2">Update FAQ</button>
      </Link>
   
    <Card>
        <CardBody>
        <DataTablepopulated 
                   bgColor="#fff"
                   keyField={'id'}
                   data={list}
                   columns={columns}>
                    </DataTablepopulated>
        </CardBody>
        </Card>
   
    </MyContainer>
</Layout>
  );
}

export default Updates;




