// import history from 'history/browser'
import { baseUrl } from "../../config/config";
import axios from "axios";
import { BroadcastChannel } from 'broadcast-channel';

const logoutChannel = new BroadcastChannel('logout')

export const CustLogout = () => {
  const token = window.localStorage.getItem("clientToken")
  const myConfig = {
    headers: {
      "uit": token
    }
  }
  axios.get(`${baseUrl}/customers/logout`, myConfig)
    .then((res) => {

      localStorage.removeItem("userid");
      localStorage.removeItem("custEmail");
      localStorage.removeItem("category");
      localStorage.removeItem("clientToken")
      // history.push("/");
      let loc = window.location.toString()
      if ((loc.includes("customer"))) {
        window.location.href = window.location.origin + "/";
      }
      else if ((loc.includes("admin")) || (loc.includes("teamleader")) ||
        (loc.includes("taxprofessional")) || (loc.includes("cms"))
      ) {
        console.log("No logging out in here elseIF")
        // window.location.href = window.location.origin + "/";
      }
      else {
        window.location.href = window.location.origin + "/";
        console.log("No logging out in here Else")
        //  window.location.href = window.location.origin + "/";
      }

      // window.addEventListner('storage',storageChange,false);

    })
  logoutChannel.postMessage("Logout")
  // console.log("Posting Done");
};

export const LogOutAllCustTabs = () => {
  logoutChannel.onmessage = () => {
    // console.log("Sending....")
    CustLogout();
    // console.log("About to Close XXXXXXXXXX")
    logoutChannel.close();
  }
}

