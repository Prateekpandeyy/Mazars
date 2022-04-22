import React, { useEffect, useState } from "react";
import MyContainer from "../../commonFunction/MyContainer";
import Layout from "../../Layout/Layout";
import { Button } from "@mui/material";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  DataGrid,
  Column,
  Summary,
  TotalItem,
  Editing,
} from "devextreme-react/data-grid";
import { Typography } from "@mui/material";
import style from "./style.module.scss";
import axiosInstance from "../../../apiServices";
import { borderColor, fontWeight } from "@mui/system";
const InActive = styled.div`
  display: flex;
  width: 360px;
  height: 45px;
  align-items: center;
`;
const ActiveLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 0px 10px;
`;
const MyLabel = styled.label`
  display: flex;
  justify-content: flex-start;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 33px;
  text-align: center;
  color: #3d3d3d;
`;
const RadioWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 50px auto;
`;
const MyInput = styled.input`
  width: 171px;
  height: 45px;
  text-align: right;

  background: #ffffff;
  border: 1px solid #1080e8;
  box-sizing: border-box;
  border-radius: 8px;
  outline: none;
  padding: 0 10px;
`;
const MyButton = styled(Button)({
  borderRadius: "5px",
  backgroundColor: "#0364BE",
  boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
  borderRadius: "5px",
  minWidth: "120px",
});
function Payout() {
  const [data, setData] = useState([]);
  const [branchRequest, setBranchRequest] = useState("");
  const [resAmount, setResAmount] = useState("");
  const [requestValue, setRequestValue] = useState([]);
  const [rValue, setRvalue] = useState(0.0);
  const [saveData, setSaveData] = useState([]);
  let a = [];
  let b = 0;
  const token = localStorage.getItem("token");
  const myConfig = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const fetchData = () => {
    try {
      axiosInstance.get(`Request/Request_Get_FundRequest`).then((res) => {
        let kk = [];
        let arr = [];
        let obj = {};
        if (res.status === 200 && res.data) {
          res?.data.data.map((item) => arr.push(item));
          // arr.push(res.data);
          res.data.data.map((i) => {
            let amount = i.payOut;
            let cesCd = i.cesCd;
            obj = {
              amount: String(amount),
              cesCd: cesCd,
            };
            kk.push(obj);
          });
        }
        setSaveData(kk);
        setBranchRequest(res.data.branchRequest);
        setResAmount(res.data.rmsAmount);
        setData(arr);
      });
    } catch (err) {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  const customHeaderCell = (data) => {
    const { caption, name } = data?.column;
    return (
      <span
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          lineHeight: "30px",
          fontFamily: "poppins",
        }}
      >
        {caption || name}
      </span>
    );
  };
  const onRowPre = (e) => {
    if (e.rowType == "header") {
      e.rowElement.style.backgroundColor = "#E1F1FF";
      e.rowElement.style.fontFamily = "Poppins";
      e.rowElement.style.fontStyle = "normal";
      e.rowElement.style.fontSize = "16px";
      e.rowElement.style.color = "#3D3D3D";
      e.rowElement.style.fontWeight = 600;

      e.rowElement.style.lineHeight = "35px";
    }
    if (e.rowType == "data") {
      e.rowElement.style.margin = "10px";
      e.rowElement.style.fontFamily = "Poppins";
      e.rowElement.style.fontStyle = "normal";
      e.rowElement.style.fontSize = "16px";
      e.rowElement.style.color = "#3D3D3D";
      e.rowElement.style.lineHeight = "35px";
      e.rowElement.style.fontWeight = 400;
    }
  };

  const requestInput = (insta) => {
    // const getRequestValue = (e, index) => {
    //   let data = [...requestValue];
    //   data[index] = e.target.value;
    //   setRequestValue(data);
    //   let sum = 0;
    //   for (let i = 0; i < data.length; i++) {
    //     let dnum = Number(data[i]);
    //     sum += dnum;
    //   }
    //   setRvalue(sum);
    //   console.log("bbb", sum);
    // };
    return (
      <div
        style={{
          width: "auto",
          height: "45px",
          marginLeft: "1px",
          marginTop: "1px",
          background: "#FFFFFF",
          border: "2px solid #1080E8",
          boxSizing: "border-box",
          borderRadius: "8px",
          cursor: "pointer",
          borderColor: "steelblue",
          textAlign: "center",
          color: "steelblue",
          fontWeight: "bold",
        }}
      >
        {insta.value}
      </div>
    );
  };
  const calculateSelectedRow = (options) => {
    if (options.name === "payout") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.value.Type !== "Total") {
          options.totalValue += Math.abs(options.value.payOut);
        }
      }
    }
    if (options.name === "request") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.value.Type !== "Total") {
          options.totalValue = rValue;
        }
      }
    }
  };
  const myBuyAmount = (e) => {
    let k = parseFloat(e.value).toFixed(2);
    return k;
  };
  const saveDatafun = () => {
    let details = {
      data: saveData,
    };
    axiosInstance
      .post("Request/Request_Post_FundRequest", details)
      .then((res) => {
        if (res.data === "Success") {
          Swal.fire({
            title: "success",
            html: "data submit successfully",
            icon: "success",
          });
        }
        console.log(res);
      });
  };
  return (
    <Layout
      mainLink="BP EQUTIES PVT. LTD >"
      subLink="Request > Payout"
      noBreadcrumb={false}
      showNavigationButtons={false}
    >
      <div className={style.mainContainer}>
        <div className={style.radioButton}>
          <input type="radio" name="same" defaultChecked style={{ cursor: "pointer" }} />
          <Typography
            style={{
              fontWeight: "bold",
              fontFamily: "poppins",
              fontSize: "18px",
              marginTop: "-5px",
              marginLeft: "8px",
            }}
          >
            Fund
          </Typography>
          <input
            type="radio"
            style={{
              marginLeft: "28px",
              marginTop: "-50px",
              cursor: "pointer",
            }}
            name="same"
          />
          <Typography
            style={{
              fontWeight: "bold",
              fontFamily: "poppins",
              fontSize: "18px",
              marginTop: "-5px",
              marginLeft: "7px",
            }}
          >
            Share
          </Typography>
        </div>
        <div className={style.contain}>
          <DataGrid
            dataSource={data}
            // onRowPrepared={onRowPre}
            // onSelectionChanged={onSelectionHolding}
            alignment="center"
            showRowLines={true}
            columnAutoWidth={true}
            showColumnLines={false}
            columnHidingEnabled={true}
            allowColumnReordering={true}
            wordWrapEnabled={true}
            onRowPrepared={onRowPre}
            showColumnHeaders={true}
            columnResizingMode="nextColumn"
            showBorders={false}
            scrolling={{
              columnRenderingMode: "standard",
              mode: "standard",
              preloadEnabled: false,
              renderAsync: undefined,
              rowRenderingMode: "virtual",
              scrollByContent: true,
              scrollByThumb: false,
              showScrollbar: "onHover",
              useNative: "auto",
            }}
          >
            <Editing
              allowUpdating={true}
              // allowAdding={true}
              // allowDeleting={true}
              mode="cell"
            />
            <Column
              dataField="exchSeg"
              caption="Company Exchange Segment"
              // cellRender={cellRender}
              alignment="center"
              allowEditing={false}
              headerCellRender={customHeaderCell}
            ></Column>
            <Column
              dataField="payOut"
              caption="PayOut"
              allowEditing={false}
              headerCellRender={customHeaderCell}
              alignment="left"
            ></Column>
            <Column
              dataField="request"
              caption="Request"
              headerCellRender={customHeaderCell}
              cellRender={requestInput}
              alignment="center"
            ></Column>
            <Summary calculateCustomSummary={calculateSelectedRow}>
              <TotalItem
                cssClass={"openingBalance"}
                displayFormat="Total"
                showInColumn="exchSeg"
              />
              <TotalItem
                name="payout"
                summaryType="custom"
                customizeText={myBuyAmount}
                displayFormat="{0}"
                cssClass={"openingBalance"}
                showInColumn="payOut"
              />
              <TotalItem
                name="request"
                summaryType="sum"
                customizeText={myBuyAmount}
                displayFormat="{0}"
                cssClass={"openingBalance"}
                showInColumn="request"
                column="request"
                alignment="center"
              />
            </Summary>
          </DataGrid>
        </div>
        <div className={style.ammount}>
          Branch Request Amount :{" "}
          <span className="openingBalance"> {branchRequest} </span>
        </div>
        <div className={style.bmsAmmount}>
          BMS Ammount : <span className="openingBalance">{resAmount}</span>
        </div>

        <div className={style.buttonOk}>
          <MyButton variant="contained" onClick={saveDatafun}>
            Ok
          </MyButton>
          {/* </div>
          <div className={style.buttonCancel}> */}
          <MyButton variant="contained" style={{ marginLeft: "20px" }}>
            Cancel
          </MyButton>
        </div>
      </div>
    </Layout>
  );
}

export default Payout;
