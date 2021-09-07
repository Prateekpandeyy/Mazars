// import React, { useState, useEffect } from "react";
// import Layout from "../../../components/Layout/Layout";
// import Meeting from "../meeting/index";

// function MeetingComponent(props) {
//   const userid = window.localStorage.getItem("adminkey");

//   return (
//     <Layout adminDashboard="adminDashboard" adminUserId={userid}>
//       <Meeting />
//     </Layout>
//   );
// }

// export default MeetingComponent;
import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import Meeting from "../meeting/index";

function MeetingComponent(props) {
  const userid = window.localStorage.getItem("adminkey");

  console.log("ppp", props.match.params.id)
  return (
    <Layout adminDashboard="adminDashboard" adminUserId={userid}>
      <Meeting id={props.match.params.id} />
    </Layout>
    // <Meeting id={props.match.params.id} />
  );
}

export default MeetingComponent;