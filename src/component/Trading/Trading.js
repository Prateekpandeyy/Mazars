import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { Box, Select, MenuItem, Typography, Button, Grid } from "@mui/material";
import MyContainer from "../commonFunction/MyContainer";
import { styled, makeStyles } from "@mui/styles";
import { FaFileCsv } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import { AiFillPrinter } from "react-icons/ai";
import { GrDocumentText } from "react-icons/gr";
import { AiFillFilePdf } from "react-icons/ai";
import htmlImg from "../../images/PngImages/html.png";
import {
  DataGrid,
  Column,
  Summary,
  TotalItem,
  Paging,
  Pager,
} from "devextreme-react/data-grid";
import { baseUrl } from "../baseUrl/BaseUrl";
import axios from "axios";
import moment from "moment";
import "moment/locale/zh-cn";
import locale from "antd/lib/locale/zh_CN";
import { DatePicker, Space } from "antd";
import "antd/dist/antd.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import BackDrop from "../Loader/BackDrop";
import style from "./style.module.css";
const data2 = [
  {
    OrderID: 1,
    TradeID: "1",
    TradeTime: "2342000",
    Stlmnt: "20:12:20",
    Buy: "29292929",
    MarketRate: "2992",
    Brokerage: "2929",
    BuyValue: "1919",
    SellValue: "29292992",
    ScripCode: "2020",
    NetValue: "",
  },
];
const data3 = [
  {
    ScripCode: 1,
    order: "Central GST @9 %",
    trade: 2.13,
  },
  {
    ScripCode: 2,
    order: "SEBI FEES",
    trade: 0.02,
  },
  {
    ScripCode: 3,
    order: "Stamp Duty",
    trade: 4.0,
  },
  {
    ScripCode: 4,
    order: "State GST @9 &",
    trade: 2.13,
  },
  {
    ScripCode: 4,
    order: "Transaction Charges [Special]",
    trade: 23.0,
  },
  {
    ScripCode: 4,
    order: "Due To Us",
    trade: 23.48,
  },
];
const TopBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px",
});
const MyData = styled(Box)({
  width: "150px",
  height: "36px",
  borderRadius: "5px",
  border: "1px solid #EBEBEB",
  padding: "5px 10px",
  boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
});
const MyButton = styled(Button)({
  borderRadius: "5px",
  backgroundColor: "#0364BE",
  boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
  borderRadius: "5px",
  minWidth: "120px",
});
const useStyle = makeStyles({
  boxRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  MySelect: {
    display: "flex",
    maxWidth: "200px",
    height: "40px",
    background: "#ffffff",
    border: "1px solid #EBEBEB",
    boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
    borderRadius: "7px",
    padding: "0 10px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  MySelect2: {
    display: "flex",
    maxWidth: "300px",
    height: "40px",
    background: "#ffffff",
    border: "1px solid #EBEBEB",
    fontWeight: "bold",
    boxShadow: "0px 2px 16px rgb(61 61 61 / 6%)",
    borderRadius: "7px",
    padding: "0 10px",
    fontSize: "15px",
  },
});
const Trading = () => {
  const [selectValue, setSelectValue] = useState(1);
  const [exchange, setExchange] = useState([]);
  const [stlType, setStlType] = useState([]);
  const [stlfieldType, setStlFieldType] = useState("Q");
  const [exchangeValue, setExchangeValue] = useState("");
  const [showSetlmentType, setShowSetlmentType] = useState("Cash");
  const [getFirstValue, setFirstValue] = useState("B");
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const dataGridRef = React.createRef();
  const [date22, setStartDate] = useState("01042021");
  const [data22, setData2] = useState([]);
  const allowedPageSizes = [5, 10, 15];
  const [isLoading, setIsLoading] = useState(true);
  const checkedValueTo = ["2020"];
  // Summary calculate function
  const calculateSelectedRow = (options) => {
    if (options.name === "SelectedRowsSummaryBuy") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.ScripCode)) {
          options.totalValue += options.value.SellValue;
        }
      }
    }
    if (options.name === "SelectedRowsSummarybottom") {
      if (options.summaryProcess === "start") {
        options.totalValue = 0;
      } else if (options.summaryProcess === "calculate") {
        if (options.component.isRowSelected(options.value.ScripCode)) {
          options.totalValue += options.value.trade;
        }
      }
    }
  };

  // On row prepared
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
  // get Exhange select box value
  useEffect(() => {
    getExchange();
  }, []);
  useEffect(() => {
    exchangeFunction();
  }, [exchange]);
  const getExchange = () => {
    const myConfig = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    axios.get(`${baseUrl}/Bills/Bills_exchSeg`, myConfig).then((res) => {
      setExchange(res.data);
    });
  };
  // exchange option function
  const exchangeFunction = (e) => {
    setExchangeValue(e);
    setData([]);
    setData2([]);
    const myConfig = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    if (e) {
      setShowSetlmentType(e.split(" ")[1].slice(0));
      setFirstValue(e.split(" ")[0][1]);
      axios
        .get(
          `${baseUrl}/Bills/Bills_cash_settTypes_list?exchange=${
            e.split(" ")[0][1]
          }`,
          myConfig
        )
        .then((res) => {
          setStlType(res.data);
          setStlFieldType(res.data[0].type);
        });
    } else {
      try {
        axios
          .get(
            `${baseUrl}/Bills/Bills_cash_settTypes_list?exchange=B`,
            myConfig
          )
          .then((res) => {
            setStlType(res.data);

            setStlFieldType(res.data[0].type);
            setIsLoading(false);
          });
      } catch (erro) {
        setIsLoading(false);
      }
    }
  };

  // stymy type
  const stymtType = (e) => {
    setStlFieldType(e.target.value);
  };
  // datepicker function
  const dateFun = (e) => {
    let a = e.format("YYYYMMDD");
    setStartDate(a);
  };
  // ShowData function
  const showData = () => {
    let total = 0;
    let pp = [];
    let kk = [];
    const myConfig = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    setData([]);
    setData2([]);
    if (showSetlmentType === "Cash") {
      axios
        .get(
          `${baseUrl}/Bills/Bills_cash_settType?exch_settType=${getFirstValue}${stlfieldType}&date=${date22}`,
          myConfig
        )
        .then((res) => {
          setData(res.data);
        });
    } else if (showSetlmentType === "Comm") {
      axios
        .get(
          `${baseUrl}/Bills/Bills_Commodity?exch=${getFirstValue}&date=${date22}`,
          myConfig
        )
        .then((res) => {
          setData(res.data);
        });
    } else if (showSetlmentType === "F&O") {
      axios
        .get(
          `${baseUrl}/Bills/Bills_FO?exch=${getFirstValue}&seg=${showSetlmentType}&date=${date22}`,
          myConfig
        )
        .then((res) => {
          setData(res.data);
        });
    }
  };
  // onExportingCsv
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

  // onPrint
  const onPirnt = (e) => {
    const dataGrid = dataGridRef.current.instance;
    //  window.print()
    window.print(dataGrid);
  };
  // onExporting
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
  // ExportGrid
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
  //OnRowPre2
  const onRowPre2 = (e) => {
    if (e.rowType == "header") {
      e.rowElement.style.backgroundColor = "#E1F1FF";
      e.rowElement.style.fontFamily = "Poppins";
      e.rowElement.style.fontStyle = "normal";
      e.rowElement.style.fontSize = "14px";
      e.rowElement.style.color = "#3D3D3D";
      e.rowElement.style.fontWeight = 600;

      e.rowElement.style.lineHeight = "35px";
    }
    if (e.rowType == "data") {
      e.rowElement.style.margin = "10px";
      e.rowElement.style.fontFamily = "Poppins";
      e.rowElement.style.fontStyle = "normal";
      e.rowElement.style.fontSize = "12px";
      e.rowElement.style.color = "#3D3D3D";
      e.rowElement.style.lineHeight = "35px";
      e.rowElement.style.fontWeight = 400;
    }
  };
  // My Buy amount
  const myBuyAmount = (e) => {
    let k = parseFloat(e.value).toFixed(2);
    return k;
  };

  // cellRender
  const cellRender = (e) => {
    console.log("eee", e.data);
    if (e.data.NetValue) {
      return (
        <span
          style={{
            fontFamily: "font-family",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "30px",
          }}
        >
          {e.data.ScripName}
        </span>
      );
    } else if (e.data.ScripCode == "Charges") {
      return <span>{e.data.ScripName}</span>;
    } else {
      return <span>{e.data.OrderID}</span>;
    }
  };
  // cellRender date
  const cellRenderDate = (e) => {
    if (e.data.NetValue) {
      return (
        <span
          style={{
            fontFamily: "font-family",
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "30px",
          }}
        ></span>
      );
    } else {
      return <span>{e.data.Date}</span>;
    }
  };
  const securityRender = (e) => {
    if (e.data.ScripCode == "Charges") {
      return null;
    } else if (!e.data.NetValue) {
      return <span>{`${e.data.ScripName} (${e.data.ScripCode})`}</span>;
    }
  };
  // close Price
  const closePrice = (e) => {
    if (!e.NetValue) {
      return parseFloat(Math.abs(e.CloseRate)).toFixed(2);
    }
  };
  // buy Price
  const buyPrice = (e) => {
    if (!e.NetValue) {
      return parseFloat(Math.abs(e.buy)).toFixed(2);
    }
  };
  // sell Price
  const sellPrice = (e) => {
    if (!e.NetValue) {
      return parseFloat(Math.abs(e.sell)).toFixed(2);
    }
  };
  // Market rate
  const MarketRate2 = (e) => {
    if (!e.NetValue) {
      return parseFloat(Math.abs(e.Marketrate)).toFixed(2);
    }
  };
  const rateFun = (e) => {
    if (!e.NetValue) {
      return parseFloat(Math.abs(e.Rate)).toFixed(2);
    }
  };
  const valueFun = (e) => {
    if (!e.NetValue) {
      return parseFloat(Math.abs(e.value)).toFixed(2);
    }
  };
  const drcrFun = (e) => {
    if (!e.NetValue) {
      return parseFloat(Math.abs(e.drcr)).toFixed(2);
    }
  };
  const netvalueFun = (e) => {
    if (e.NetValue) {
      return parseFloat(Math.abs(e.NetValue)).toFixed(2);
    }
  };
  // tradevalfun
  const tradeValfun = (e) => {
    if (e.ScripCode == "Charges") {
      return null;
    } else if (!e.NetValue) {
      return e.TradeID;
    }
  };
  // timefun
  const timeFun = (e) => {
    if (e.ScripCode == "Charges") {
      return null;
    } else if (!e.NetValue) {
      return e.TradeTime;
    }
  };
  // buy fun
  const buyFun = (e) => {
    if (e.ScripCode == "Charges") {
      return null;
    } else if (!e.NetValue) {
      return parseFloat(e.Buy).toFixed(2);
    }
  };
  const sellFun = (e) => {
    if (e.ScripCode == "Charges") {
      return null;
    } else if (!e.NetValue) {
      return parseFloat(e.Sell).toFixed(2);
    }
  };
  const marketFun = (e) => {
    if (e.ScripCode == "Charges") {
      return null;
    } else if (!e.NetValue) {
      return parseFloat(e.MarketRate).toFixed(2);
    }
  };
  const brokerFun = (e) => {
    if (e.ScripCode == "Charges") {
      return null;
    } else if (!e.NetValue) {
      return parseFloat(e.Brokerage).toFixed(2);
    }
  };

  const buyFunValue = (e) => {
    if (!e.NetValue) {
      return parseFloat(e.BuyValue).toFixed(2);
    }
  };
  const sellFunValue = (e) => {
    if (!e.NetValue) {
      return parseFloat(e.SellValue).toFixed(2);
    }
  };
  const classes = useStyle();

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

  return (
    <Layout mainLink="Bills">
      <BackDrop isLoading={isLoading} />
      <MyContainer>
        <TopBox>
          <Box className={classes.boxRoot}>
            <div className={style.exge}>
            <Box className={classes.boxRoot}>
              <Typography
                variant="body1"
                mr={2}
                style={{ fontWeight: "bold", width: "90px", fontSize: "16px" }}
              >
                Exchange :
              </Typography>
              <select
                className={classes.MySelect}
                onChange={(e) => exchangeFunction(e.target.value)}
                value={exchangeValue}
                multiple={false}
              >
                {exchange?.map((i, e) => {
                  return (
                    <>
                      <option key={i.CESCd} value={i.CESCd + " " + i.segment}>
                        {i.exchange + " " + i.segment}
                      </option>
                    </>
                  );
                })}
              </select>
              </Box>
            </div>
            {showSetlmentType === "Cash" ? (
              <div className={style.topbox}>
                <Box className={classes.boxRoot}>
                  <Typography
                    variant="body1"
                    mr={2}
                    style={{
                      marginLeft: "20px",
                      fontWeight: "bold",
                      width: "110px",
                      fontSize: "16px",
                    }}
                  >
                    Stlmnt Type :
                  </Typography>

                  <select
                    className={classes.MySelect2}
                    onChange={(e) => stymtType(e)}
                    value={stlfieldType}
                    multiple={false}
                  >
                    {stlType.map((i, e) => {
                      return (
                        <option key={i.type} value={i.type}>
                          {i.description}{" "}
                        </option>
                      );
                    })}
                  </select>
                </Box>
              </div>
            ) : (
              ""
            )}
            <div className={style.date}>
              <Box className={classes.boxRoot}>
                <MyData style={{ marginLeft: "20px", fontWeight: "bold" }}>
                  <DatePicker
                    defaultValue={moment(new Date(), "DD MMM, YYYY")}
                    defaultPickerValue={moment(new Date(), "DD MMM, YYYY")}
                    format={"DD/MM/YYYY"}
                    onChange={(date) => dateFun(date)}
                    bordered={false}
                    allowClear={false}
                    suffixIcon
                    style={{
                      height: "auto",
                      width: "auto",
                      border: "none",
                      borderRadius: "0px",
                      cursor: "pointer",
                      fontSize: "17px",
                      margin: "0px",
                      padding: "0px",
                      fontWeight: "bold",
                    }}
                  />
                </MyData>
              </Box>
            </div>
            <div className={style.show}>
            <Box className={classes.boxRoot}>
              <MyButton
                variant="contained"
                onClick={(e) => showData(e)}
                style={{ marginLeft: "20px", height: "60", width: "135px" }}
              >
                Show
              </MyButton>
            </Box>
            </div>
          </Box>

          <div className={style.file}>
            <Box className={classes.boxRoot} style={{}}>
              {/* <Box sx={{ textAlign: "right" }} p={2} style={{marginLeft:"320px"}}> */}
              <FaFileCsv
                title="Csv File"
                onClick={onExportingCsv}
                style={{
                  color: "#80BB55",
                  cursor: "pointer",
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
                title="html"
                style={{
                  margin: "2px 8px",
                  cursor: "pointer",
                  border: "1px solid #EBEBEB",
                  boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
                  borderRadius: "10px",
                  padding: "5px",
                  maxWidth: "40px",
                  maxHeight: "40px",
                }}
              />
              <RiFileExcel2Fill
                title="Excel"
                onClick={onExporting}
                style={{
                  color: "#107C41",
                  cursor: "pointer",
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
                title="Print"
                onClick={onPirnt}
                style={{
                  color: "#424343",
                  cursor: "pointer",
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
                title="pdf"
                onClick={exportGrid}
                style={{
                  color: "#696D6E",
                  cursor: "pointer",
                  margin: "2px 8px",
                  border: "1px solid #EBEBEB",
                  boxShadow: "0px 2px 16px rgba(61, 61, 61, 0.06)",
                  borderRadius: "10px",
                  padding: "5px",
                  width: "40px",
                  height: "40px",
                }}
              />
            </Box>
          </div>
        </TopBox>

        {showSetlmentType === "Cash" || showSetlmentType === "Comm" ? (
          <Grid container>
            <Grid style={{ padding: "20px" }}>
              <DataGrid
                id="gridContainer"
                dataSource={data}
                keyExpr="ScripCode"
                showRowLines={true}
                onRowPrepared={onRowPre}
                columnAutoWidth={true}
                columnMinWidth={50}
                showColumnLines={false}
                columnHidingEnabled={true}
                columnResizingMode="nextColumn"
                noDataText=""
                showBorders={false}
              >
                <Column
                  dataField="OrderID"
                  caption="Order"
                  cellRender={cellRender}
                  alignment="center"
                  headerCellRender={customHeaderCell}
                ></Column>
                <Column
                  dataField="TradeID"
                  caption="Trade"
                  headerCellRender={customHeaderCell}
                  alignment="center"
                ></Column>
                <Column
                  dataField="TradeTime"
                  caption="Time"
                  headerCellRender={customHeaderCell}
                ></Column>
                <Column
                  caption="Security"
                  cellRender={securityRender}
                  headerCellRender={customHeaderCell}
                ></Column>
                <Column
                  dataField="Buy"
                  caption="Buy"
                  headerCellRender={customHeaderCell}
                ></Column>

                <Column
                  dataField="MarketRate"
                  caption="Market Rate"
                  headerCellRender={customHeaderCell}
                ></Column>
                <Column
                  dataField="Brokerage"
                  caption="Brokerage"
                  headerCellRender={customHeaderCell}
                ></Column>
                <Column
                  dataField="BuyValue"
                  caption="Buy Value"
                  headerCellRender={customHeaderCell}
                ></Column>
                <Column
                  dataField="SellValue"
                  caption="Sell Value"
                  headerCellRender={customHeaderCell}
                ></Column>
                <Column
                  dataField="NetValue"
                  caption="Net Value"
                  headerCellRender={customHeaderCell}
                ></Column>
              </DataGrid>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
        {showSetlmentType === "F&O" || showSetlmentType === "FX" ? (
          <Grid container>
            <Grid style={{ padding: "20px" }}>
              <DataGrid
                id="gridContainer"
                dataSource={data}
                keyExpr="SeriesId"
                showRowLines={true}
                onRowPrepared={onRowPre}
                columnAutoWidth={true}
                columnMinWidth={50}
                showColumnLines={false}
                columnHidingEnabled={true}
                columnResizingMode="nextColumn"
                noDataText=""
                showBorders={false}
              >
                <Column
                  dataField="Date"
                  caption="Order"
                  cellRender={cellRenderDate}
                  alignment="center"
                  headerCellRender={customHeaderCell}
                ></Column>
                <Column dataField="SeriesName" caption="Description"></Column>
                <Column
                  dataField="CloseRate"
                  caption="Close Price"
                  calculateCellValue={closePrice}
                  headerCellRender={customHeaderCell}
                  alignment="center"
                ></Column>
                <Column
                  caption="Buy"
                  dataField="buy"
                  calculateCellValue={buyPrice}
                  headerCellRender={customHeaderCell}
                  alignment="center"
                ></Column>
                <Column
                  dataField="sell"
                  caption="Sell"
                  calculateCellValue={sellPrice}
                  headerCellRender={customHeaderCell}
                  alignment="center"
                ></Column>

                <Column dataField="Brokerage" caption="Brokerage"></Column>
                <Column
                  dataField="Marketrate"
                  caption="Market Rate"
                  calculateCellValue={MarketRate2}
                  headerCellRender={customHeaderCell}
                  alignment="center"
                ></Column>

                <Column
                  dataField="Rate"
                  caption="Rate"
                  calculateCellValue={rateFun}
                  headerCellRender={customHeaderCell}
                  alignment="center"
                ></Column>
                <Column
                  dataField="value"
                  caption="Value"
                  calculateCellValue={valueFun}
                  headerCellRender={customHeaderCell}
                  alignment="center"
                ></Column>
                <Column
                  dataField="drcr"
                  caption="Dr/Cr"
                  calculateCellValue={drcrFun}
                  headerCellRender={customHeaderCell}
                  alignment="center"
                ></Column>
                <Column
                  dataField="NetValue"
                  caption="Net Value"
                  calculateCellValue={netvalueFun}
                  headerCellRender={customHeaderCell}
                  alignment="center"
                ></Column>
                <Summary>
                  <TotalItem
                    cssClass={"warning4"}
                    displayFormat="Sub Total"
                    showInColumn="Date"
                  />
                  <TotalItem
                    summaryType="sum"
                    column="buy"
                    displayFormat="{0}"
                    cssClass={"warning4"}
                    customizeText={myBuyAmount}
                    showInColumn="buy"
                  />
                  <TotalItem
                    summaryType="sum"
                    column="sell"
                    displayFormat="{0}"
                    customizeText={myBuyAmount}
                    cssClass={"warning4"}
                    showInColumn="sell"
                  />
                  <TotalItem
                    summaryType="sum"
                    column="drcr"
                    displayFormat="{0}"
                    customizeText={myBuyAmount}
                    cssClass={"warning4"}
                    showInColumn="drcr"
                  />
                  <TotalItem
                    summaryType="sum"
                    column="value"
                    displayFormat="{0}"
                    customizeText={myBuyAmount}
                    cssClass={"warning4"}
                    showInColumn="value"
                  />
                </Summary>
              </DataGrid>
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </MyContainer>
    </Layout>
  );
};
export default Trading;
