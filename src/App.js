import React, { useEffect } from "react";
import WebRoutes from "./WebRoutes";
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
  return (
    <>
      <WebRoutes />
    </>
  );
}
