import React, { useEffect } from "react";
import WebRoutes from "./WebRoutes";
import {LogOutAllCustTabs} from "./components/Admin-Header/CustLogout";
import ErrorContainer from "./ErrorContainer";

export default function App() {
  const clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
  };
  useEffect(() => {
    clearCacheData();
    
  }, []);
  useEffect(() => {
    // console.log("IN USE")
    LogOutAllCustTabs();
    // console.log("......Received")
  }, []);
  return (
    <>
      <ErrorContainer>
      <WebRoutes />
      </ErrorContainer>
    </>
  );
}
