import React from "react";
import { Oval } from "react-loader-spinner";
import "./style.css";

const Loading = () => {
  return (
    <div className="loader-inline">
      <Oval color="#E1F1FF" height={80} width={80} />
    </div>
  );
};

export default Loading;
