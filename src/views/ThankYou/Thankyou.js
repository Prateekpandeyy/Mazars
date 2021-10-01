import React from "react";
import Layout from "../../components/Layout/Layout";
import Swal from "sweetalert2";
import { useEffect } from "react";


const ThankYou = () => {
    const userId = window.localStorage.getItem("userid");
  

    const thankyou = () => {
        Swal.fire({
          title : "Scuuess",
          html : `<h1>Thank you , Your payment done successfully</h1>`,
          icon : "success"
        })
      }

  useEffect(() => {
   thankyou();
  }, []);
    return(
        <Layout custDashboard="custDashboard" custUserId={userId}>
        </Layout>
    )
  
}
export default ThankYou;