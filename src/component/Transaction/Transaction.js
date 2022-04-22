import React, { useState, useEffect, useRef } from "react";
import Layout from "../Layout/Layout";
import MyContainer from "../commonFunction/MyContainer";
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
import axios from "axios";
import { baseUrl } from "../baseUrl/BaseUrl";
import { Box, Select, Button, Typography, Grid } from "@mui/material";
import { styled, makeStyles } from "@mui/styles";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { FaFileCsv } from "react-icons/fa";
import { RiFileExcel2Fill, RiTimeLine } from "react-icons/ri";
import { AiFillPrinter } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { AiFillFilePdf } from "react-icons/ai";
import htmlImg from "../../images/PngImages/html.png";
import { ComponentToPrint } from "./ComponentToPrint";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import BackDrop from "../Loader/BackDrop";
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
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
const Transaction = () => {
  // useState declear
  const [transactionData, setTransationData] = useState([]);
  const [timeVal, setTimeVal] = useState("1");
  const [toDate, setDate] = useState("20200401");
  const [fromDate, setFromDate] = useState("20210331");
  const [test, setTest] = useState("1");
  const [showTime, setShowTime] = useState(true);
  const [agts, setShowagts] = useState(false);
  const [gal, setGal] = useState("");
  const [agtsVal, setAgtsVal] = useState("C");
  const [transactionAccount, setTransactionAccount] = useState([]);
  const [agtsTransaction, setAgtsTransaction] = useState([]);
  const [bal, setBal] = useState(0);
  const [ref, setRef] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyle();
  const dataGridRef = React.createRef();
  const componentRef = useRef();
  let bb = 0;
  //token
  const token = localStorage.getItem("token");
  useEffect(() => {
    getTransationData();
  }, []);
  const startupSelectedKeys = [540691];
  const allowedPageSizes = [5, 10, 15];
  //onSelection function
  const onSelectionChanged = (e) => {
    e.component.refresh(true);
  };
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
  // onRow pre function (table row & column styling function)
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

    if (e.rowIndex % 2 === 0) {
      e.rowElement.style.backgroundColor = "#E1F1FF";
    }
  };

  // transaction data
  const getTransationData = () => {
    const details = {
      fromDate: "20220401",
      toDate: "20210331",
      type: 2,
    };
    const myConfig = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      axios
        .get(
          `${baseUrl}/Confirmation_Transaction/Transaction_Summary?tradeType=${test}&selectType=${timeVal}&fromDate=${toDate}&toDate=${fromDate}`,
          myConfig
        )
        .then((res) => {
          setTransationData(res.data);
          setIsLoading(false);
        });
    } catch (eror) {
      setIsLoading(false);
    }
  };

  // Summary calculate function
  const calculateSelectedRow = (options) => {
    if (options.name === "SelectedRowsSummaryBuytime") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.Stlmnt)) {
          options.totalValue += options.value.BuyAmount;
        }
      }
    }

    if (options.name === "SelectedRowsSummarySelltime") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.Stlmnt)) {
          options.totalValue += options.value.SellAmount;
        }
      }
    }
    if (options.name === "SelectedRowsSummaryNettime") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.Stlmnt)) {
          options.totalValue += options.value.NetAmount;
        }
      }
    }
    if (options.name === "SelectedRowsSummaryBuy") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.ScripCode)) {
          options.totalValue += options.value.BuyAmount;
        }
      }
    }

    if (options.name === "SelectedRowsSummarySell") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.ScripCode)) {
          options.totalValue += options.value.SellAmount;
        }
      }
    }
    if (options.name === "SelectedRowsSummaryNet") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.ScripCode)) {
          options.totalValue += options.value.NetAmount;
        }
      }
    }
    if (options.name === "SelectedRowsSummaryref") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.DocumentNo)) {
          options.totalValue += options.value.Amount;
        }
      }
    }
    if (options.name === "Credit3") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.DocumentNo)) {
          options.totalValue += options.value.Credit;
        }
      }
    }
    if (options.name === "SelectedRowsSummaryrefcredit") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.DocumentNo)) {
          options.totalValue += options.value.Credit;
        }
      }
    }
    if (options.name === "SelectedRowsSummaryrefdebit") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.DocumentNo)) {
          options.totalValue += options.value.Debit;
        }
      }
    }
    if (options.name === "Debit3") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.DocumentNo)) {
          options.totalValue += options.value.Debit;
        }
      }
    }
  };

  const myBuyAmount = (e) => {
    let k = parseFloat(e.value).toFixed(2);
    return k;
  };
  const myNetAmount = (e) => {
    let k = parseFloat(e.value).toFixed(2);
    return k;
  };
  // select box value
  const mySel = (e) => {
    setTransactionAccount([]);
    setTransationData([]);
    setTest(e.target.value);

    if (e.target.value == 1 || e.target.value == 2) {
      setRef(false);
      setShowTime(true);
      setShowagts(false);
    } else if (e.target.value == 3 || e.target.value == 4) {
      setShowTime(false);
      setRef(true);
    } else if (e.target.value === 5 || e.target.value == 5) {
      setRef(false);
      setShowTime(false);
    } else if (e.target.value == 7) {
      setShowagts(true);
      setRef(false);
    } else {
      setShowTime(false);
    }
  };
  // datepicker function
  const getValue = (e) => {
    setDate(e[0].format("YYYYMMDD"));
    setFromDate(e[1].format("YYYYMMDD"));
  };

  // Show Function
  const getTransationShow = () => {
    setIsLoading(true);
    if (test == 1) {
      const details = {
        fromDate: fromDate,
        toDate: toDate,
        type: 2,
      };
      const myConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        axios
          .get(
            `${baseUrl}/Confirmation_Transaction/Transaction_Summary?tradeType=${test}&selectType=${timeVal}&fromDate=${toDate}&toDate=${fromDate}`,
            myConfig
          )
          .then((res) => {
            setTransationData(res.data);
            setIsLoading(false);
          });
      } catch (error) {
        setIsLoading(false);
      }
    } else if (test == 2 && timeVal == 1) {
      let data = [];
      let k = 0;
      const details = {
        fromDate: fromDate,
        toDate: toDate,
        type: 2,
      };
      const myConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      axios
        .get(
          `${baseUrl}/Confirmation_Transaction/Transaction_Summary?tradeType=${test}&selectType=${timeVal}&fromDate=${toDate}&toDate=${fromDate}`,
          myConfig
        )
        .then((res) => {
          res.data.map((i) => {
            let k = balanceValueFun(i);
            let a = {
              finalbalance: k,
              Balance: i.Balance,
              Beneficiery: i.Beneficiery,
              Credit: i.Credit,
              Date: i.Date,
              Debit: i.Debit,
              Description: i.Description,
              Settlment: i.Settlment,
              TrxNo: i.TrxNo,
            };
            data.push(a);
          });
          setTransationData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else if (test == 2 && timeVal == 2) {
      const details = {
        fromDate: fromDate,
        toDate: toDate,
        type: 2,
      };
      const myConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      axios
        .get(
          `${baseUrl}/Confirmation_Transaction/Transaction_Summary?tradeType=${test}&selectType=${timeVal}&fromDate=${toDate}&toDate=${fromDate}`,
          myConfig
        )
        .then((res) => {
          setTransationData(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else if (test == 3 || test == 4 || test == 5 || test == 6) {
      const details = {
        fromDate: fromDate,
        toDate: toDate,
        type: 2,
      };
      const myConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      axios
        .get(
          `${baseUrl}/Confirmation_Transaction/Transaction_Accounts?type=${
            test - 2
          }&fromDate=${toDate}&toDate=${fromDate}`,
          myConfig
        )
        .then((res) => {
          setTransactionAccount(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    } else if (test == 7) {
      const details = {
        fromDate: fromDate,
        toDate: toDate,
        type: 2,
      };
      const myConfig = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        axios
          .get(
            `${baseUrl}/Confirmation_Transaction/Transaction_AGTS?segment=${agtsVal}&fromDate=${toDate}&toDate=${fromDate}`,
            myConfig
          )
          .then((res) => {
            setAgtsTransaction(res.data);
            setIsLoading(false);
          });
      } catch (error) {
        setIsLoading(false);
      }
    }
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
  // buy Amount Function
  const buyAmountFun = (e) => {
    return parseFloat(Math.abs(e.BuyAmount)).toFixed(2);
  };
  const sellAmountFun = (e) => {
    return parseFloat(Math.abs(e.SellAmount)).toFixed(2);
  };
  const netAmountFun = (e) => {
    return parseFloat(Math.abs(e.NetAmount)).toFixed(2);
  };
  const avgRate = (e) => {
    return parseFloat(Math.abs(e.AvgRate)).toFixed(2);
  };
  const timeFun = (e) => {
    setTimeVal(e.target.value);
    setTransationData([]);
  };
  // date Render
  const dateRender = (e) => {
    return moment(e.Date).format("DD/MM/YYYY");
  };
  // Paritculars fun
  const particularsFun = (e) => {
    if (e.Debit === 0) {
      return `By ${e.Description} / ${e.Settlment} / ${e.Beneficiery}`;
    } else {
      return `To ${e.Description} / ${e.Settlment} / ${e.Beneficiery}`;
    }
  };

  const balanceValueFun = (e) => {
    let kk = 0;
    if (e.Debit === 0) {
      kk = parseInt(parseInt(e.Balance) + e.Credit);
    } else {
      kk = parseInt(parseInt(e.Balance) - e.Debit);
    }

    bb += parseInt(kk);
    return bb;
  };
  const refNo = (e) => {
    return parseFloat(e.DocumentNo);
  };
  const amountValue = (e) => {
    return parseFloat(e.Amount);
  };
  const mycreditAmount = (e) => {
    return parseFloat(e.value).toFixed(2);
  };
  const mydebitAmount = (e) => {
    return parseFloat(e.value).toFixed(2);
  };
  // float value
  const floatVal = (e) => {
    return parseFloat(Math.abs(e.value)).toFixed(2);
  };
  return (
    <Layout mainLink="Transaction" noBreadcrumb={false}>
      <BackDrop isLoading={isLoading} />
      <div className={style.mainTransaction}>
      <TopBox>
        <Box className={classes.boxRoot} style={{ marginLeft: "-22px" }}>
          <div className={style.tradMenu}>
            <select
              className={classes.MySelect}
              value={test}
              onChange={(e) => mySel(e)}
            >
              <option value={1}>Trades</option>
              <option value={2}> Deliveries</option>
              <option value={3}>Receipts</option>
              <option value={4}>Payments</option>
              <option value={5}>Journals</option>
              <option value={6}>Bills</option>
              <option value={7}>AGTS</option>
              {/* <option value={8}>Mutual Funds</option> */}
            </select>
          </div>
          {showTime === true || agts === true ? (
            <div className={style.itemMenu}>
              <Box className={classes.boxRoot} style={{ marginLeft: "4px" }}>
                <select
                  className={classes.MySelect}
                  value={timeVal}
                  onChange={(e) => timeFun(e)}
                >
                  <option value={1}>Item Wise</option>
                  <option value={2}> Date Wise</option>
                </select>
              </Box>
            </div>
          ) : (
            ""
          )}
          {agts === true ? (
            <div className={style.cashMenu}>
              <Box className={classes.boxRoot}>
                <select
                  className={classes.MySelect}
                  value={agtsVal}
                  onChange={(e) => setAgtsVal(e.target.value)}
                >
                  <option value="C">Cash</option>
                  <option value="F"> Comm</option>
                  <option value="K">F &#38; O</option>
                  <option value="X"> FX</option>
                </select>
              </Box>
            </div>
          ) : (
            ""
          )}
          {/* <Box className={classes.boxRoot}> */}
          <div className={style.dates}>
            <Space
              direction="vertical"
              size={12}
              style={{ display: "flex", width: "300px", margin: "0 20px" }}
            >
              <RangePicker
                defaultValue={[
                  moment("01/04/2020", dateFormat),
                  moment("31/03/2021", dateFormat),
                ]}
                format={dateFormat}
                onChange={getValue}
              />
            </Space>
          </div>
          {/* </Box> */}
          <div className={style.buttons}>
            <Box className={classes.boxRoot}>
              <MyButton
                variant="contained"
                onClick={getTransationShow}
                style={{ marginLeft: "5px", height: "60", width: "135px" }}
              >
                Show
              </MyButton>
            </Box>
          </div>
        </Box>

        <div className={style.menus}>
          <Box className={classes.boxRoot}>
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

            <div className={style.hiLight}>
              <MyData>High Light</MyData>
            </div>
          </Box>
        </div>
      </TopBox>
      {/* <MyContainer> */}
      <Grid container style={{ padding: "20px", marginLeft: "-20px" }}>
        <Grid>
          <ComponentToPrint ref={dataGridRef} />
          {showTime === true &&
          test === "1" &&
          timeVal === "1" &&
          agts === false ? (
            <DataGrid
              id="transactionDataGridtrade"
              ref={dataGridRef}
              onSelectionChanged={onSelectionChanged}
              dataSource={transactionData}
              keyExpr="ScripCode"
              showRowLines={true}
              onRowPrepared={onRowPre}
              columnAutoWidth={true}
              showColumnLines={false}
              columnHidingEnabled={true}
              columnResizingMode="nextColumn"
              noDataText=""
              showBorders={false}
            >
              <Selection mode="multiple" showCheckBoxesMode="always" />
              <Grouping expandMode="rowClick" />
              <GroupPanel visible={true} />
              <Paging enabled={true} defaultPageSize={15} />

              <Column
                dataField="ScripCode"
                caption="Script Code"
                alignment="left"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="ScripName"
                caption="Name"
                alignment="left"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Buy"
                caption="Buy Qty"
                alignment="left"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="BuyAmount"
                caption="Buy Amount"
                customizeText={floatVal}
                alignment="left"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Sell"
                caption="Sales Qty"
                alignment="left"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="SellAmount"
                caption="Sales Amount"
                calculateCellValue={sellAmountFun}
                customizeText={floatVal}
                alignment="left"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="Net"
                caption="Net Qty"
                alignment="left"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="NetAmount"
                caption="Net Amount"
                calculateCellValue={netAmountFun}
                customizeText={floatVal}
                alignment="left"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="AvgRate"
                caption="Avg.Rate"
                alignment="left"
                calculateCellValue={avgRate}
                customizeText={floatVal}
                headerCellRender={customHeaderCell}
              />

              <Summary calculateCustomSummary={calculateSelectedRow}>
                <TotalItem
                  name="SelectedRowsSummaryBuy"
                  summaryType="custom"
                  displayFormat="{0}"
                  cssClass={"totalSummaryStyle"}
                  customizeText={myBuyAmount}
                  showInColumn="BuyAmount"
                />
                <TotalItem
                  name="SelectedRowsSummarySell"
                  summaryType="custom"
                  displayFormat="{0}"
                  cssClass={"totalSummaryStyle"}
                  customizeText={myBuyAmount}
                  showInColumn="SellAmount"
                />
                <TotalItem
                  name="SelectedRowsSummaryNet"
                  summaryType="custom"
                  displayFormat="{0}"
                  cssClass={"totalSummaryStyle"}
                  customizeText={myBuyAmount}
                  showInColumn="NetAmount"
                />
                <TotalItem
                  cssClass={"totalSummaryStyle"}
                  displayFormat="Total"
                  showInColumn="ScripCode"
                />
              </Summary>
            </DataGrid>
          ) : (
            ""
          )}
          {showTime === true &&
          test === "2" &&
          timeVal === "1" &&
          agts === false ? (
            <DataGrid
              id="transactionDataGrid"
              ref={dataGridRef}
              onSelectionChanged={onSelectionChanged}
              dataSource={transactionData}
              keyExpr="TrxNo"
              showRowLines={true}
              onRowPrepared={onRowPre}
              columnAutoWidth={true}
              columnMinWidth={80}
              showColumnLines={false}
              columnHidingEnabled={true}
              columnResizingMode="nextColumn"
              noDataText=""
              showBorders={false}
            >
              <Selection mode="multiple" showCheckBoxesMode="always" />
              <Grouping expandMode="rowClick" />
              <GroupPanel visible={true} />
              <Paging enabled={true} defaultPageSize={15} />
              <Column
                dataField="TrxNo"
                caption="Tax No"
                headerCellRender={customHeaderCell}
              />

              <Column
                caption="Date"
                type="date"
                calculateCellValue={dateRender}
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Particulars"
                caption="Particulars"
                calculateCellValue={particularsFun}
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Debit"
                caption="Debit"
                alignment="left"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Credit"
                caption="Credit"
                alignment="left"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="finalbalance"
                caption="Balance"
                alignment="left"
                headerCellRender={customHeaderCell}
              />
            </DataGrid>
          ) : (
            ""
          )}
          {showTime === true &&
          test === "2" &&
          timeVal === "2" &&
          agts === false ? (
            <DataGrid
              id="transactionDataGrid"
              ref={dataGridRef}
              onSelectionChanged={onSelectionChanged}
              dataSource={transactionData}
              keyExpr="ISIN"
              showRowLines={true}
              onRowPrepared={onRowPre}
              columnAutoWidth={true}
              columnMinWidth={80}
              showColumnLines={false}
              columnHidingEnabled={true}
              columnResizingMode="nextColumn"
              noDataText=""
              showBorders={false}
            >
              <Selection mode="multiple" showCheckBoxesMode="always" />
              <Grouping expandMode="rowClick" />
              <GroupPanel visible={true} />
              <Paging enabled={true} defaultPageSize={15} />

              <Column
                caption="Date"
                type="date"
                calculateCellValue={dateRender}
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="ISIN"
                caption="ISIN"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="SecurityDescription"
                caption="Security Description"
              />
              <Column
                dataField="Debit"
                caption="Debit"
                alignment="center"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Credit"
                caption="Credit"
                alignment="center"
                headerCellRender={customHeaderCell}
              />
            </DataGrid>
          ) : (
            ""
          )}
          {showTime === true &&
          test === "1" &&
          timeVal === "2" &&
          agts === false ? (
            <DataGrid
              id="transactionDataGrid"
              ref={dataGridRef}
              onSelectionChanged={onSelectionChanged}
              dataSource={transactionData}
              keyExpr="Stlmnt"
              showRowLines={true}
              onRowPrepared={onRowPre}
              columnAutoWidth={true}
              columnMinWidth={80}
              showColumnLines={false}
              columnHidingEnabled={true}
              columnResizingMode="nextColumn"
              noDataText=""
              showBorders={false}
            >
              <Selection mode="multiple" showCheckBoxesMode="always" />
              <Grouping expandMode="rowClick" />
              <GroupPanel visible={true} />
              <Paging enabled={true} defaultPageSize={15} />

              <Column
                dataField="Date"
                caption="Date"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Stlmnt"
                caption="Settlement"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Buy"
                caption="Purchase Qty"
                alignment="center"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="BuyAmount"
                caption="Buy Amount"
                calculateCellValue={buyAmountFun}
                customizeText={floatVal}
                alignment="center"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Sell"
                caption="Sales Qty"
                alignment="center"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="SellAmount"
                caption="Sales Amount"
                calculateCellValue={sellAmountFun}
                customizeText={floatVal}
                alignment="center"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="Net"
                caption="Net Qty"
                alignment="center"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="NetAmount"
                caption="Net Amount"
                calculateCellValue={netAmountFun}
                customizeText={floatVal}
                alignment="center"
                headerCellRender={customHeaderCell}
              />

              <Summary calculateCustomSummary={calculateSelectedRow}>
                <TotalItem
                  name="SelectedRowsSummaryBuytime"
                  summaryType="custom"
                  displayFormat="{0}"
                  cssClass={"totalSummaryStyle"}
                  customizeText={myBuyAmount}
                  showInColumn="BuyAmount"
                />
                <TotalItem
                  name="SelectedRowsSummarySelltime"
                  summaryType="custom"
                  displayFormat="{0}"
                  cssClass={"totalSummaryStyle"}
                  customizeText={myBuyAmount}
                  showInColumn="SellAmount"
                />
                <TotalItem
                  name="SelectedRowsSummaryNettime"
                  summaryType="custom"
                  displayFormat="{0}"
                  cssClass={"totalSummaryStyle"}
                  customizeText={myBuyAmount}
                  showInColumn="NetAmount"
                />
              </Summary>
            </DataGrid>
          ) : (
            ""
          )}
          {showTime === false && agts === false && ref === true ? (
            <DataGrid
              id="gridContainer"
              ref={dataGridRef}
              onSelectionChanged={onSelectionChanged}
              dataSource={transactionAccount}
              keyExpr="DocumentNo"
              showRowLines={true}
              onRowPrepared={onRowPre}
              columnAutoWidth={true}
              columnMinWidth={80}
              showColumnLines={false}
              columnHidingEnabled={true}
              columnResizingMode="nextColumn"
              noDataText=""
              showBorders={false}
            >
              <Selection
                mode="multiple"
                selectAllMode="allPages"
                showCheckBoxesMode="always"
              />
              <Grouping expandMode="rowClick" />
              <GroupPanel visible={true} />
              <Paging enabled={true} defaultPageSize={15} />
              <Column
                dataField="DocumentNo"
                caption="RefNo"
                alignment="left"
                calculateCellValue={refNo}
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Date"
                caption="Date"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Particular"
                caption="Particulars"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="Chequeno"
                caption="Instrument"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Amount"
                caption="Amount"
                calculateCellValue={amountValue}
                customizeText={floatVal}
                alignment="center"
                headerCellRender={customHeaderCell}
              />

              <Summary calculateCustomSummary={calculateSelectedRow}>
                <TotalItem
                  cssClass={"warning4"}
                  displayFormat="Total"
                  showInColumn="DocumentNo"
                />
                <TotalItem
                  name="SelectedRowsSummaryref"
                  summaryType="custom"
                  displayFormat="{0}"
                  cssClass={"warning4"}
                  customizeText={myBuyAmount}
                  showInColumn="Amount"
                />
              </Summary>
            </DataGrid>
          ) : (
            ""
          )}
          {showTime === false && agts === false && ref === false ? (
            <DataGrid
              id="gridContainer"
              ref={dataGridRef}
              onSelectionChanged={onSelectionChanged}
              dataSource={transactionAccount}
              keyExpr="DocumentNo"
              showRowLines={true}
              onRowPrepared={onRowPre}
              columnAutoWidth={true}
              columnMinWidth={80}
              showColumnLines={false}
              columnHidingEnabled={true}
              columnResizingMode="nextColumn"
              noDataText=""
              showBorders={false}
            >
              <Selection
                mode="multiple"
                selectAllMode="allPages"
                showCheckBoxesMode="always"
              />
              <Grouping expandMode="rowClick" />
              <GroupPanel visible={true} />
              <Paging enabled={true} defaultPageSize={15} />
              <Column
                dataField="DocumentNo"
                caption="RefNo"
                alignment="left"
                calculateCellValue={refNo}
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Date"
                caption="Date"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Particular"
                caption="Particulars"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="Debit"
                caption="Debit"
                customizeText={mydebitAmount}
                alignment="center"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Credit"
                caption="Credit"
                customizeText={mycreditAmount}
                alignment="center"
                headerCellRender={customHeaderCell}
              />

              <Summary calculateCustomSummary={calculateSelectedRow}>
                <TotalItem
                  cssClass={"warning4"}
                  displayFormat="Total"
                  showInColumn="DocumentNo"
                />
                <TotalItem
                  name="SelectedRowsSummaryrefdebit"
                  summaryType="custom"
                  displayFormat="{0}"
                  cssClass={"warning4"}
                  showInColumn="Debit"
                />
                <TotalItem
                  name="SelectedRowsSummaryrefcredit"
                  summaryType="custom"
                  displayFormat="{0}"
                  cssClass={"warning4"}
                  showInColumn="Credit"
                />
              </Summary>
            </DataGrid>
          ) : (
            ""
          )}
          {/* <div className="loading-spinner"> */}

          {/* {!isLoading && ( */}
          {agts === true && !isLoading ? (
            <DataGrid
              id="gridContainer"
              ref={dataGridRef}
              onSelectionChanged={onSelectionChanged}
              dataSource={agtsTransaction}
              keyExpr="Brokerage"
              showRowLines={true}
              onRowPrepared={onRowPre}
              columnAutoWidth={true}
              columnMinWidth={30}
              showColumnLines={false}
              columnHidingEnabled={true}
              columnResizingMode="nextColumn"
              noDataText=""
              showBorders={true}
            >
              <Selection
                mode="multiple"
                selectAllMode="allPages"
                showCheckBoxesMode="always"
              />
              <Grouping expandMode="rowClick" />
              <GroupPanel visible={true} />
              <Paging enabled={true} defaultPageSize={15} />
              <Column
                dataField="Exchange"
                caption="Exch"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Date"
                caption="Date"
                calculateCellValue={dateRender}
                alignment="center"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="Stlmnt"
                caption="Settlement"
                alignment="center"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="BSFlag"
                caption="B/s"
                alignment="center"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="Quantity"
                caption="Qty"
                alignment="center"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="MarketRate"
                caption="Rate"
                alignment="center"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="NetRate"
                caption="Net Rate"
                alignment="center"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="Brokerage"
                caption="Brokerage"
                alignment="center"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="ExchTRX_Chrg"
                caption="Exch Trx"
                alignment="center"
                headerCellRender={customHeaderCell}
              />

              <Column
                dataField="StampDuty"
                caption="Stamp Duty"
                alignment="center"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="SEBITO"
                caption="SEBI TO"
                alignment="center"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="Others"
                caption="Others"
                alignment="center"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="STT"
                caption="STT"
                alignment="center"
                headerCellRender={customHeaderCell}
              />
              <Column
                dataField="GST"
                caption="GST"
                alignment="center"
                headerCellRender={customHeaderCell}
              />

              <Summary calculateCustomSummary={calculateSelectedRow}>
                <TotalItem
                  name="SelectedRowsSummary"
                  summaryType="custom"
                  id="myDataGrid"
                  displayFormat="{0}"
                  customizeText={myNetAmount}
                  cssClass={"warning4"}
                  showInColumn="NetAmount"
                />
                <TotalItem
                  name="SelectedRowsSummaryBuy"
                  summaryType="custom"
                  displayFormat="{0}"
                  cssClass={"warning4"}
                  customizeText={myBuyAmount}
                  showInColumn="BuyAmount"
                />
                <TotalItem
                  cssClass={"warning4"}
                  displayFormat="Total"
                  showInColumn="ScripCode"
                />
              </Summary>
            </DataGrid>
          ) : (
            ""
          )}
          {/* :Transaction */}
          {/* )} */}
          {/* </div> */}
        </Grid>
      </Grid>
      {/* </MyContainer> */}
      </div>
    </Layout>
  );
};
export default Transaction;
