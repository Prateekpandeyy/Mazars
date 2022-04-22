import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../apiServices";
import Layout from "../../component/Layout/Layout";
import { Button, Grid } from "@mui/material";
import { styled } from "@mui/styles";
import styles from "./style.module.css";
import {
  DataGrid,
  Grouping,
  GroupPanel,
  Column,
  Selection,
  Paging,
  Summary,
  TotalItem,
 Editing
} from "devextreme-react/data-grid";
import Swal from "sweetalert2";
const MyButton = styled(Button)({
  borderRadius: "5px",
  backgroundColor: "#0364BE",
  boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
  borderRadius: "5px",
  minWidth: "120px",
});

function Pledge() {
  const dataGridRef = React.createRef();
  const [demateAccountNo, setDemateAccountNo] = useState([]);
  const [demateNo, setDemateNo] = useState("");
  const [sharesData, setSharesData] = useState([]);
 const [postData, setPostData] = useState([])
let scData = []
  // to fetch data according to demate no
  const fetchPledgeShareInfo = () => {  
    let resData = []
    try {
      axiosInstance
        .get(`Request/Request_Get_PledgeForMargin?dematActNo=${demateNo}`)
        .then((res) => {
          let arr = [];
          if (res.status === 200 && res.data) { 
            console.log("res", res.data)
            res.data.map((i) => {
              let finalValue = i.Holding_Rate * i.Request_Qty
              let a = {
                HairCut : i.HairCut,
                Holding_NetValue : i.Holding_NetValue,
                Holding_Qty : i.Holding_Qty,
                Holding_Rate : i.Holding_Rate,
                Holding_Value : i.Holding_Value,
                ISIN : i.ISIN,
                Request_Qty : i.Request_Qty,
                Request_Value : i.Request_Value,
                ScripCode : i.ScripCode,
                ScripName : i.ScripName, 
                finalValue : finalValue
              }
              arr.push(a)
            })
            // res?.data.map((item) => arr.push(item));
          }
          setSharesData(arr);
        });
    } catch (err) {}
  };

  const demateNoSet = (val) => {
    console.log("change", val);
    setDemateNo(val);
  };

  // Demate account Nos
  const fetchDemateAccount = () => {
    try {
      axiosInstance.get("Holding/Holding_MyDematAct_List").then((res) => {
        if (res?.data?.status === 200 || res?.data) {
          let arr = [];
          res.data?.map((item) => {
            arr.push({
              ClientCode: item.ClientCode,
              DematActNo: item.DematActNo,
            });
          });
          setDemateAccountNo(arr);
        }
      });
    } catch (err) {}
  };

  const postDatasubmit = () => {
    console.log("done")
    let postD = {
      data : postData
    }
    try {
      axiosInstance.post('Request/Request_Post_PledgeForMargin', postD)
      .then((res) => {
      console.log("done", res)
     if(res.data === "Success"){
      Swal.fire({
        title: "success",
        html : "Data Submit successfully", 
        icon : "success"
      })
     }
      })
    }
   
    catch (err) {}
  }
  const onRowPre = (e) => {
    if (e.rowType == "header") {
      e.rowElement.style.backgroundColor = "#E1F1FF";
      e.rowElement.style.fontFamily = "Poppins";
      e.rowElement.style.fontStyle = "normal";
      e.rowElement.style.fontSize = "18px";
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

  const onSelectionChanged = (e) => {
    let k = {}
    console.log("selectedData", e.selectedRowsData)
    e.component.refresh(true);
  e.selectedRowsData.map((i) => {
    k = {
      "dematActNo" : demateNo,
      "securities_Code" : i.ScripCode,
      "request_Qty" : String(i.Request_Qty)
    }
    scData.push(k)
  })
  setPostData(scData)
    console.log("eeee", e.selectedRowsData)
  };

  const onSaving = React.useCallback((e) => {
    e.cancel = true;

    if (e.changes.length) {
      console.log(e);
    }
  }, []);


  const QtydatatoPledge = (e, value) =>{
  
  let bb = e * value.data.Holding_Rate
 
   changeAmountToPledge(bb)

  }

  const changeQtyToPledge = (value) => {
  
  
      return (
        <>
          <input 
          type="number"
         
          className={styles.inputChnage}
          defaultValue={value?.data?.Request_Qty}
          name={value?.key}
          onChange={(e)=>QtydatatoPledge(e.target.value)}
          />
        </>
      );
   
  };

  const changeAmountToPledge = (e) => {
  let a = 0;
   
     a = e.data.Request_Qty * e.data.Holding_Rate 
    a = parseFloat(a).toFixed(2)
  
   return (
     <p> {a} </p>
   )
  
  };

  useEffect(() => {
    fetchDemateAccount();
  }, []);
  const calculateSelectedRow = (options) => {
    if (options.name === "OpeningBalance") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.value.Type !== "Total") {
          options.totalValue += options.value.Holding_Qty;
        }
      }
    }
    if (options.name === "Holding_Value") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.value.Type !== "Total") {
          options.totalValue += options.value.Holding_Value;
        }
      }
    }
    if (options.name === "Holding_NetValue") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.value.Type !== "Total") {
          options.totalValue += options.value.Holding_NetValue;
        }
      }
    }
    if (options.name === "Request_Qty") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.value.Type !== "Total") {
          options.totalValue += options.value.Request_Qty;
        }
      }
    }
  };
  const myBuyAmount3 = (e) => {
    let k = parseFloat(e.value).toFixed(2);
    return k;
  };
  const setCellValue = (newData, value, currentRowData) =>  {
    console.log("newValue", newData, value, currentRowData)
    newData.Request_Qty = value;
    newData.finalValue = currentRowData.Holding_Rate * value
    // newData.Count = value;
    // newData.TotalPrice = currentRowData.Price * value;
}
  return (
    <Layout
      mainLink="BP EQUTIES PVT. LTD >"
      subLink="Request > Pledge for Margin"
      noBreadcrumb={false}
      showNavigationButtons={false}
    >
      <div className="mainContainer">
        <div className={styles.pledgeHeader}>
          <div className={styles.selectDrop}>
            <Typography
              variant="body1"
              mr={2}
              style={{ fontWeight: "bold", fontSize: "16px" }}
            >
              Demat A/c No.
            </Typography>
            <select
              className={styles.drpDown}
              onChange={(e) => demateNoSet(e.target.value)}
              value={demateNo}
            >
              <option default> please select</option>
              {demateAccountNo?.map((val, index) => {
                return (
                  <>
                    <option key={index} value={val.DematActNo}>
                      {val.DematActNo}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
          <div className={styles.submitBtn}>
            <MyButton
              variant="contained"
              style={{ height: "60", width: "135px" }}
              onClick={fetchPledgeShareInfo}
            >
              Submit
            </MyButton>
          </div>
        </div>
        <Grid container>
          <Grid item sm={12} style={{ padding: "0 20px" }}>
            <DataGrid
              id="pledge"
              ref={dataGridRef}
              dataSource={sharesData}
              keyExpr="ScripCode"
              showRowLines={true}
              columnAutoWidth={true}
              onSelectionChanged={onSelectionChanged}
              onRowPrepared={onRowPre}
              columnMinWidth={30}
              showColumnLines={false}
              columnHidingEnabled={true}
              columnResizingMode="nextColumn"
              noDataText=""
              showBorders={false}
            //   onSaving={onSaving}
            >
                  <Selection
                mode="multiple"
                allowSelectAll={true}
                showCheckBoxesMode="always"
              />
              {/* <Editing mode="batch" allowUpdating={true} /> */}
              <Grouping expandMode="rowClick" />
              <GroupPanel visible={true} />
              <Paging enabled={true} defaultPageSize={15} />
            <Editing 
            allowUpdating = {true}
            mode = "cell" />

              <Column
                dataField="ScripCode"
                caption="Code"
                alignment="left"
                allowEditing={false}
              ></Column>
              <Column
                dataField="ScripName"
                caption="Name"
                alignment="left"
                allowEditing={false}
              ></Column>
              <Column dataField="ISIN" caption="ISIN" alignment="left"></Column>
              <Column
                dataField="Holding_Rate"
                caption="Rate"
                // customizeText={floatVal}
                alignment="left"
                allowEditing={false}
              ></Column>
              <Column
                dataField="Holding_Qty"
                caption="Qty"
                alignment="left"
                allowEditing={false}
              ></Column>
              <Column
                dataField="Holding_Value"
                caption="Value"
                // customizeText={floatVal}
                allowEditing={false}
                alignment="right"
              ></Column>
              <Column
                dataField="HairCut"
                caption="HairCut"
                // calculateCellValue={finalBalance}
                // headerCellRender={customHeaderCell}
                alignment="right"
                allowEditing={false}
              ></Column>

              <Column
                dataField="Holding_NetValue"
                caption="Net Value"
                // customizeText={floatVal}
                // calculateCellValue={finalBalance}
                // headerCellRender={customHeaderCell}
                alignment="center"
                allowEditing={false}
              ></Column>

              <Column
                dataField="Request_Qty"
                caption="Qty"
                allowEditing = {true}
                setCellValue={setCellValue}
                // cellRender={changeQtyToPledge}
                // customizeText={floatVal}
                // customizeText={floatVal}
                // calculateCellValue={finalBalance}
                // headerCellRender={customHeaderCell}
                alignment="center"
              ></Column>
              <Column
                dataField="finalValue"
                caption="Value"
               
                // customizeText={floatVal}
                // customizeText={floatVal}
                // calculateCellValue={finalBalance}
                // headerCellRender={customHeaderCell}
                alignment="center"
              ></Column>
             <Summary calculateCustomSummary={calculateSelectedRow}>
                    <TotalItem
                      cssClass={"openingBalance"}
                      displayFormat="Total"
                      showInColumn="ScripCode"
                    />
                    <TotalItem
                      name="OpeningBalance"
                      summaryType="custom"
                      // customizeText={myBuyAmount}
                      displayFormat="{0}"
                      cssClass={"openingBalance"}
                      showInColumn="Holding_Qty"
                    />
                    <TotalItem
                      name="Holding_Value"
                      summaryType="custom"
                       customizeText={myBuyAmount3}
                      displayFormat="{0}"
                      cssClass={"openingBalance"}
                      showInColumn="Holding_Value"
                    />
                    <TotalItem
                      name="Holding_NetValue"
                      summaryType="custom"
                      // customizeText={myBuyAmount4}
                      displayFormat="{0}"
                      cssClass={"openingBalance"}
                      showInColumn="Holding_NetValue"
                    />
                    <TotalItem
                      name="Request_Qty"
                      summaryType="custom"
                      // customizeText={myBuyAmount2}
                      displayFormat="{0}"
                      cssClass={"openingBalance"}
                      showInColumn="Request_Qty"
                    />
                    
                  </Summary>
            </DataGrid>
          </Grid>
        </Grid>
        <div style={{display: "flex", width: "100%", justifyContent: "center",  margin: "auto"}}>
        <MyButton
              variant="contained"
              style={{ height: "60", width: "135px" , margin: "10px"}}
             onClick={postDatasubmit}
            >
              Ok
            </MyButton>
            <MyButton
             
              style={{ height: "60", width: "135px" }}
             
            >
            Cancel
            </MyButton>
          </div>
        <div className={styles.mainBox}>
        <div className={styles.header}>
          Steps For Pledging Securities :
        </div>
        <ul className={styles.listView}>
            <li style={{fontFamily:"poppins",fontSize:"18px",marginLeft:"28px",marginTop:"26px",width:"auto"}}>Select available scrip and enter quantity to be pledged.</li>
            <li style={{fontFamily:"poppins",fontSize:"18px",marginLeft:"28px",marginTop:"12px",width:"auto"}}>Once all required items are specified,click [Submit] button.</li>
            <li style={{fontFamily:"poppins",fontSize:"18px",marginLeft:"28px",marginTop:"12px",width:"auto"}}>You will receive an SMS from CDSL with a link.</li>
            <li style={{fontFamily:"poppins",fontSize:"18px",marginLeft:"28px",marginTop:"12px",width:"auto"}}>Follow the link - enter your PAN or Demat A/C Number.</li>
            <li style={{fontFamily:"poppins",fontSize:"18px",marginLeft:"28px",marginTop:"12px",width:"auto"}}>An OTP will be sent to your mobile. Authenticate using OTP.</li>
            <li style={{fontFamily:"poppins",fontSize:"18px",marginLeft:"28px",marginTop:"12px",width:"auto"}}>A list of items you had submitted will be shown.</li>
            <li style={{fontFamily:"poppins",fontSize:"18px",marginLeft:"28px",marginTop:"12px",width:"auto"}}>You may still choose to select / Exclude items that you do not win submit.</li>
            <li style={{fontFamily:"poppins",fontSize:"18px",marginLeft:"28px",marginTop:"12px",width:"auto"}}>After having selected items as required, confirm your selection.</li>
        </ul>
</div>

      </div>
    </Layout>
  );
}

export default Pledge;