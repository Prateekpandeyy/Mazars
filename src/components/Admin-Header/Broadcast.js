import { BroadcastChannel } from 'broadcast-channel'; 
import AdminHeader from './Admin-Header';



export const logOutAllCustTabs = () => {
    const logoutChannel =new BroadcastChannel('logout')
    logoutChannel.onmessage = () => {
        AdminHeader();
      logoutChannel.close();
    }
  }

