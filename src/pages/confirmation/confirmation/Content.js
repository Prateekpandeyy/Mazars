import React, { useRef, useState } from "react";
import style from "./style.module.scss";
import {
  DataGrid,
  Grouping,
  GroupPanel,
  Column,
  Selection,
  Paging,
  Summary,
  TotalItem,
  MasterDetail,
  Scrolling,
  Pager,
} from "devextreme-react/data-grid";
import axiosInstance from "../../../apiServices";
import BackDrop from "./../../../component/Loader/BackDrop";
import MyContainer from "../../../component/commonFunction/MyContainer";
import { Box, Select, Button, Typography, Grid } from "@mui/material";
import { styled, makeStyles } from "@mui/styles";
import "antd/dist/antd.css";
// import { sales } from "./data.js";
import { FaFileCsv } from "react-icons/fa";
import { RiFileExcel2Fill, RiTimeLine } from "react-icons/ri";
import { AiFillPrinter } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { AiFillFilePdf } from "react-icons/ai";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import htmlImg from "./../../../images/PngImages/html.png";
import { ComponentToPrint } from "./../../../component/Transaction/ComponentToPrint";
import { DatePicker, Space } from "antd";

import moment from "moment";
const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";
const weekFormat = "MM/DD";
const monthFormat = "YYYY/MM";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
const customFormat = (value) => {
  return `${value.format(dateFormat)}`;
};
const TopBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  justifyContent: "space-between",
  padding: "20px",
});
const MyData = styled(Box)({
  width: "130px",
  height: "40px",
  borderRadius: "5px",
  border: "1px solid #0364BE",
  padding: "5px 10px",
  color: "#0364BE",

  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "20px",
  padding: "10px 18px",
  fontSize: "18px",
  boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
});
const MyButton = styled(Button)({
  borderRadius: "5px",
  backgroundColor: "#0364BE",
  boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
  borderRadius: "5px",
  minWidth: "120px",
  height: "35px",
});
const useStyle = makeStyles({
  boxRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  MySelect: {
    display: "flex",
    maxWidth: "180px",
    height: "40px",
    background: "#ffffff",
    border: "1px solid #EBEBEB",
    fontFamily: "poppins",
    fontWeight: "bold",
    boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
    borderRadius: "7px",
    padding: "0 10px",
    margin: "0 010px 0 0",
    fontSize: "18px",
  },
  MySelect2: {
    display: "flex",
    maxWidth: "300px",
    height: "40px",
    background: "#ffffff",
    border: "1px solid #EBEBEB",
    fontFamily: "poppins",
    fontWeight: "bold",
    boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
    borderRadius: "7px",
    padding: "0 10px",
    fontSize: "16px",
  },
});
const Content = () => {
  const [date, setDate] = useState("20210322");
  const [confirmationDrop, setConfirmationDrop] = useState(0);
  const [data, setData] = useState([]);
  console.log("data", data);
  const dataGridRef = React.createRef();
  const componentRef = useRef();
  const classes = useStyle();
  const [isLoading, setIsLoading] = useState(true);

  const dateFun = (e) => {
    let a = e.format("YYYYMMDD");
    console.log(a);
    setDate(a);
  };

  const onExporting = (e) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Main sheet");
    const dataGrid = dataGridRef.current.instance;
    exportDataGrid({
      component: dataGrid,
      worksheet: worksheet,
      customizeCell: function (options) {
        const excelCell = options;
        excelCell.font = { name: "Arial", size: 12 };
        excelCell.alignment = { horizontal: "left" };
      },
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          "DataGrid.xlsx"
        );
      });
    });
    e.cancel = true;
  };
  const onExportingCsv = (e) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Main sheet");
    const dataGrid = dataGridRef.current.instance;
    exportDataGrid({
      component: dataGrid,
      worksheet: worksheet,
      customizeCell: function (options) {
        const excelCell = options;
        excelCell.font = { name: "Arial", size: 12 };
        excelCell.alignment = { horizontal: "left" };
      },
    }).then(function () {
      workbook.csv.writeBuffer().then(function (buffer) {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          "DataGrid.csv"
        );
      });
    });
    e.cancel = true;
  };

  const fetchData = () => {
    try {
      axiosInstance
        .get(
          `Confirmation_Transaction/Confirmation?type=${confirmationDrop}&date=${date}`
        )
        .then((res) => {
          console.log(res.data);
          let arr = [];
          if (res.status === 200 && res.data) {
            res?.data.map((item) => arr.push(item));
            // arr.push(res.data);
          }
          setData(arr);
          setIsLoading(false);
        });
    } catch (err) {
      setIsLoading(false);
    }
  };

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
  const floatVal = (e) => {
    return parseFloat(Math.abs(e.value)).toFixed(2);
  };

  // Opening balance
  const calculateSelectedRow = (options) => {
    if (options.name === "sellQty") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.scripname)) {
          options.totalValue += options.value.Sell;
        }
      }
    }

    if (options.name === "BuyQty") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.scripname)) {
          options.totalValue += options.value.Buy;
        }
      }
    }
    if (options.name === "BuyAmount") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.scripname)) {
          options.totalValue += options.value.BuyAmount;
        }
      }
    }
    if (options.name === "NetAmount") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.scripname)) {
          options.totalValue += options.value.NetAmount;
        }
      }
    }
  };

  const confirmationDropDown = (e) => {
    console.log("values", e);
    setConfirmationDrop(e);
  };
  const handlePrint = useReactToPrint({
    content: () => dataGridRef.current,
  });
  const exportGrid = React.useCallback(() => {
    const doc = new jsPDF();
    const dataGrid = dataGridRef.current.instance;

    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: dataGrid,
    }).then(() => {
      doc.save("Customers.pdf");
    });
  });

  const onSelectionChanged = (e) => {
    e.component.refresh(true);
  };

  const customHeaderCell = (data) => {
    const { caption, name } = data?.column;
    return (
      <span
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          lineHeight: "30px",
          fontFamily: "poppins",
        }}
      >
        {caption || name}
      </span>
    );
  };
  const myBuyAmount2 = (e) => {
    let k = parseFloat(Math.abs(e.value)).toFixed(2);

    return k;
  };
  return (
    <>
     {/* <BackDrop isLoading={isLoading} /> */}
     <div className={style.mainResponse}>
      <TopBox>
        <Box className={classes.boxRoot} style={{ marginLeft: "5px" }}>
          <div className={style.selectConfirm}>
            <select
              className={classes.MySelect}
              onChange={(e) => {
                confirmationDropDown(e.target.value);
              }}
              value={confirmationDrop}
            >
              <option value={0}>Cumulative</option>
              <option value={1}>Confirmation</option>
            </select>
          </div>
          <Space
            direction="vertical"
            size={12}
            style={{ display: "flex", width: "300px", marginLeft: "0px" }}
          >
            <div className={style.datePick}>
              <Box className={classes.boxRoot} style={{ marginLeft: "-22px" }}>
                <DatePicker
                  defaultValue={moment(new Date(), "DD MMM, YYYY")}
                  defaultPickerValue={moment(new Date(), "DD MMM, YYYY")}
                  format={"DD/MM/YYYY"}
                  onChange={(date) => dateFun(date)}
                  allowClear={false}
                  suffixIcon
                  style={{
                    display: "flex",
                    maxWidth: "180px",
                    height: "40px",
                    background: "#ffffff",
                    border: "1px solid #EBEBEB",
                    fontFamily: "poppins",
                    fontWeight: "bold",
                    boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
                    borderRadius: "7px",
                    padding: "0 10px",
                    margin: "0 010px 10 0",
                    marginLeft: "50px",
                    fontSize: "18px",
                  }}
                />
              </Box>
            </div>
          </Space>
          <div className={style.btn}>
            <Box className={classes.boxRoot}>
              <MyButton
                variant="contained"
                style={{ marginLeft: "-100px", height: "60", width: "135px" }}
                onClick={fetchData}
              >
                Show
              </MyButton>
            </Box>
          </div>
        </Box>

        <Box className={classes.boxRoot}>
          <div className={style.docFiles}>
            <FaFileCsv
              onClick={onExportingCsv}
              style={{
                color: "#80BB55",
                margin: "2px 8px",
                fontSize: "30px",
                border: "1px solid #EBEBEB",
                boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
                borderRadius: "10px",
                padding: "5px",
                width: "40px",
                height: "40px",
              }}
            />
            <img
              src={htmlImg}
              style={{
                margin: "2px 8px",
                border: "1px solid #EBEBEB",
                boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
                borderRadius: "10px",
                padding: "5px",
                maxWidth: "40px",
                maxHeight: "40px",
              }}
            />
            <AiFillFilePdf
              onClick={onExporting}
              style={{
                color: "#107C41",
                margin: "2px 8px",
                border: "1px solid #EBEBEB",
                boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
                borderRadius: "10px",
                padding: "5px",
                width: "40px",
                height: "40px",
              }}
            />
            <AiFillPrinter
              onClick={handlePrint}
              style={{
                color: "#424343",
                margin: "2px 8px",
                border: "1px solid #EBEBEB",
                boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
                borderRadius: "10px",
                padding: "5px",
                width: "40px",
                height: "40px",
              }}
            />
            <GrDocumentText
              onClick={exportGrid}
              style={{
                color: "#696D6E",
                margin: "2px 8px",
                border: "1px solid #EBEBEB",
                boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
                borderRadius: "10px",
                padding: "5px",
                width: "40px",
                height: "40px",
              }}
            />
          </div>
         <div className={style.myHigh}> <MyData>High Light</MyData></div>
        </Box>
      </TopBox>
      <MyContainer>
        <Grid container>
          <Grid item sm={12} style={{ padding: "0 20px" }}>
            <DataGrid
              id="dataGrid"
              ref={dataGridRef}
              dataSource={data}
              keyExpr="scripname"
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
            >
              <Grouping expandMode="rowClick" />
              <GroupPanel visible={true} />
              <Paging enabled={true} defaultPageSize={15} />
              <Selection
                mode="multiple"
                allowSelectAll={true}
                showCheckBoxesMode="always"
              />

              <Column
                dataField="scripname"
                caption="Name"
                alignment="left"
              ></Column>
              <Column
                dataField="stlmnt"
                caption="Settlement"
                alignment="left"
              ></Column>
              <Column
                dataField="Sell"
                caption="Sales Qty"
                alignment="left"
              ></Column>
              <Column
                dataField="SellAmount"
                caption="Sales Value"
                customizeText={floatVal}
                alignment="left"
              ></Column>
              <Column
                dataField="Buy"
                caption="Purchase Qty"
                alignment="left"
              ></Column>
              <Column
                dataField="BuyAmount"
                caption="Purchase Value"
                customizeText={floatVal}
                alignment="right"
              ></Column>
              <Column
                dataField="Brokerage"
                caption="Brokerage"
                // calculateCellValue={finalBalance}
                // headerCellRender={customHeaderCell}
                alignment="right"
              ></Column>

              <Column
                dataField="Net"
                caption="Net Qty"
                // customizeText={floatVal}
                // calculateCellValue={finalBalance}
                // headerCellRender={customHeaderCell}
                alignment="center"
              ></Column>

              <Column
                dataField="NetAmount"
                caption="Net Value"
                customizeText={floatVal}
                // customizeText={floatVal}
                // calculateCellValue={finalBalance}
                // headerCellRender={customHeaderCell}
                alignment="center"
              ></Column>
              <Column
                dataField="AvgRate"
                caption="Market Rate"
                customizeText={floatVal}
                // customizeText={floatVal}
                // calculateCellValue={finalBalance}
                // headerCellRender={customHeaderCell}
                alignment="center"
              ></Column>
              <Summary calculateCustomSummary={calculateSelectedRow}>
                <TotalItem
                  cssClass={"openingBalance"}
                  displayFormat="Total"
                  showInColumn="scripname"
                />
                <TotalItem
                  name="sellQty"
                  summaryType="custom"
                  // customizeText={myBuyAmount}
                  displayFormat="{0}"
                  cssClass={"openingBalance"}
                  showInColumn="Sell"
                />
                <TotalItem
                  name="BuyQty"
                  summaryType="custom"
                  // customizeText={myBuyAmount3}
                  displayFormat="{0}"
                  cssClass={"openingBalance"}
                  showInColumn="Buy"
                />
                <TotalItem
                  name="BuyAmount"
                  summaryType="custom"
                  displayFormat="{0}"
                  cssClass={"openingBalance"}
                  showInColumn="BuyAmount"
                />
                <TotalItem
                  name="NetAmount"
                  summaryType="custom"
                  customizeText={myBuyAmount2}
                  displayFormat="{0}"
                  cssClass={"openingBalance"}
                  showInColumn="NetAmount"
                />
              </Summary>
            </DataGrid>
          </Grid>
        </Grid>
      </MyContainer>
    </div>
    </>
  );
};
export default Content;
