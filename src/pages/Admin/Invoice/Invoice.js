import React, { useState, useEffect, useLayoutEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { baseUrl } from "../../../config/config";
import CreateInvoice from "./CreateInvoice";
import Generated from "./Generated";
const InvoiceTab = () => {
    const userid = window.localStorage.getItem("adminkey")
    const [tabIndex, setTabIndex] = useState(0);
    const myStyle1 = {
        backgroundColor: "grey",
        padding: "12px",
        borderRadius: "50px",
        width: "200px",
        textAlign: "center",
        color: "white",
        cursor: "pointer",
    };
    const myStyle2 = {
        padding: "12px",
        borderRadius: "50px",
        width: "200px",
        textAlign: "center",
        backgroundColor: "blue",
        color: "white",
        cursor: "pointer",
    };
return(
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList
                        style={{
                            listStyleType: "none",
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <Tab style={tabIndex == 0 ? myStyle2 : myStyle1}>
                           View Invoice
                        </Tab>
                        <Tab style={tabIndex == 1 ? myStyle2 : myStyle1}>
                          Create Invoice
                        </Tab>
                        
                    </TabList>

                    <TabPanel>
                    <Generated />
                    </TabPanel>
                    <TabPanel>
                    <CreateInvoice />
                      
                    </TabPanel>
                    
                </Tabs>
                </Layout>
)
}
export default InvoiceTab;