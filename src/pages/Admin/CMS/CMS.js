import React , {useState} from 'react';
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import classNames from "classnames";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
import { makeStyles , styled} from '@mui/material';
import CmsContent from './CmsContent';
import FlashMessage from './FlashMessage';
const Cms = () =>{ 
    const userId = window.localStorage.getItem("adminkey");
    const [bgColor, setbgColor] = useState("#55425F");
    const [tabIndex, setTabIndex] = useState(0);
    const tableIndex = (index) => {
        setTabIndex(index)
        console.log(index)
        if(index === 0){
          setbgColor("#55425F")
        }
        else if(index === 1){
          setbgColor("#6e557b")
        }
        else if(index === 2){
          setbgColor("#6e557b")
        }
        else if(index === 3){
          setbgColor("#6e557b")
        }
      }
        
      const myStyle1 = {
        margin: "10px auto",
        fontSize : "14px"
      };
      const myStyle2 = {
      margin: "10px auto",
      
      color : "#55425f",
      fontWeight : 1000
      };
return (
    <Layout adminDashboard="adminDashboard" adminUserId={userId}>


<Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className="fixedTab">
            <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
             CMS
            </Tab>
            <Tab style={tabIndex == 1 ? myStyle2 : myStyle1} className="tabHover">
            Flash Messages
            </Tab>
           
          </TabList>

          <TabPanel>
            <CmsContent />
          </TabPanel>
           <TabPanel>
               <FlashMessage />
           </TabPanel>
         
        </Tabs>
     
     
</Layout>
  );
}

export default Cms;




