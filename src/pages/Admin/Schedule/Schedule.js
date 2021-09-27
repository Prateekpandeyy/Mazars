// import React, { useState, useEffect } from "react";
// import Layout from "../../../components/Layout/Layout";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   Row,
//   Col,
// } from "reactstrap";
// import Demo from "./Demo";

// function Schedule() {
//   const userid = window.localStorage.getItem("adminkey");

//   return (
//     <Layout adminDashboard="adminDashboard" adminUserId={userid}>
//       <Card>
//         <CardHeader>
//           <Row>
//             <Col md="7">
//               <CardTitle tag="h4">Schedule </CardTitle>
//             </Col>
//             <Col md="5"></Col>
//           </Row>
//         </CardHeader>
//         <Demo />
//       </Card>
//     </Layout>
//   );
// }

// export default Schedule;
import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Recording from "../Recording/Recording";
import {
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import "../AdminStyle/style.css"
import Demo from "./Demo";

function Schedule() {
    const userid = window.localStorage.getItem("adminkey");
   
  
    return (
      <Layout adminDashboard="adminDashboard" adminUserId={userid}>
     
        
      <Demo />
    
    </Layout>
    );
}

export default Schedule;