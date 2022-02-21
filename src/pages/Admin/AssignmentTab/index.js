import React, { useState, useEffect, useLayoutEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import { Tab, Tabs, TabPanel, TabList } from "react-tabs";
import AssignmentComponent from "./AllAssignment";
import DraftReport from "./DraftReport";
import FinalReport from "./FinalReport";

function AssignmentTab(props) {
 

    const userid = window.localStorage.getItem("adminkey");

    const [allAssignmentCount, setAllAssignmentCount] = useState("");
    const [draft, setDraft] = useState("");
    const [final, setFinal] = useState();
    const [bgColor, setbgColor] = useState("#615339")

    useEffect(() => {
        CountAllAssignment();
        CountDraftReport();
        CountFinalReport();
    }, []);


    const CountAllAssignment = (data) => {
        axios.get(`${baseUrl}/tl/getAssignments`).then((res) => {
         
            if (res.data.code === 1) {
                setAllAssignmentCount(res.data.result.length);
            }
        });
    };

    const CountDraftReport = () => {
        axios.get(`${baseUrl}/tl/getAssignments?assignment_status=Draft_Report&stages_status=1`).then((res) => {
          ;
            if (res.data.code === 1) {
                setDraft(res.data.result.length);
            }
        });
    };

    const CountFinalReport = () => {
        axios.get(`${baseUrl}/tl/getAssignments?assignment_status=Delivery_of_report&stages_status=1`).then((res) => {
          ;
            if (res.data.code === 1) {
                setFinal(res.data.result.length);
            }
        });
    };

    const [tabIndex, setTabIndex] = useState(0);
    useLayoutEffect(() => {
        setTabIndex(props.location.index || 0);
    }, [props.location.index]);


    const tableIndex = (index) => {
        setTabIndex(index)
        console.log(index)
        if(index === 0){
          setbgColor("#615339")
        }
        else if(index === 1){
          setbgColor("#907b56")
        }
        else if(index === 2){
          setbgColor("#907b56")
        }
        else if(index === 3){
          setbgColor("#907b56")
        }
      }
        
      const myStyle1 = {
        margin: "10px auto"
      };
      const myStyle2 = {
        margin: "10px auto",
     
        color : "#5a625a",
        fontWeight : 1000
         };
      
      
    
    

    return (
        <Layout adminDashboard="adminDashboard" adminUserId={userid}>
        
            <Tabs selectedIndex={tabIndex} onSelect={(index) => tableIndex(index)}>
      <TabList
          className="fixedTab"
          >
                        <Tab style={tabIndex == 0 ? myStyle2 : myStyle1} className="tabHover">
                            All Assignments ({allAssignmentCount})
                        </Tab>
                        <Tab style={tabIndex == 1 ? myStyle2 : myStyle1} className="tabHover">
                            Inprogress; Draft Reports  ({draft})
                        </Tab>
                        <Tab style={tabIndex == 2 ? myStyle2 : myStyle1} className="tabHover">
                        Inprogress; Delivery of Final Reports ({final})
                        </Tab>

                    </TabList>

                    <TabPanel>
                        <AssignmentComponent />
                    </TabPanel>

                    <TabPanel>
                        <DraftReport />
                    </TabPanel>

                    <TabPanel>
                        <FinalReport />
                    </TabPanel>
                </Tabs>
           
        </Layout>
    );
}

export default AssignmentTab;

