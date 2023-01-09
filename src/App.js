import React, { useEffect } from "react";
import WebRoutes from "./WebRoutes";
import {logOutAllCustTabs} from "../src/components/Admin-Header/Broadcast";
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
    logOutAllCustTabs();
  }, []);
  return (
    <>
      <WebRoutes />
    </>
  );
}
