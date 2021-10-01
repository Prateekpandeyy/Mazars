
import React, { useState, useEffect,Component } from "react";
import CustomerFilter from '../src/components/Search-Filter/CustomerFilter';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Table,
} from "reactstrap";

function ConstantLoading(props) {
    const [loading, setLoading] = useState(false);
    // const [resetloading, setLoading] = useState(false);
    // useEffect(() => {
    //   if (resetloading) {
    //     setLoading(false);
    //   }
    // }, [resetloading]);
    useEffect(() => {
      SetLoadingMethod();
    }, []);
     const SetLoadingMethod = () => {
        
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      };
      

  return (
    <>
    <Card>
        <CardHeader>
      <CustomerFilter loadingMethod={SetLoadingMethod} />
      </CardHeader>
      </Card>
    </>
  );
}

export default ConstantLoading


