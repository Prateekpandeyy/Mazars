// import history from 'history/browser'
import { baseUrl } from "../../config/config";
import axios from "axios";
import { BroadcastChannel } from 'broadcast-channel';
 
const logoutChannel =new BroadcastChannel('logout')

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
        window.location.href = window.location.origin + "/";
        console.log("Logging Off Done");
       
        // window.addEventListner('storage',storageChange,false);

      })
      logoutChannel.postMessage("Logout")
      console.log("Posting Done");
  };
 
  export const LogOutAllCustTabs = () => {
    logoutChannel.onmessage = () => {
      console.log("Sending....")
      CustLogout();
      console.log("About to Close XXXXXXXXXX")
      logoutChannel.close();
    }
  }
  
