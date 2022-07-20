import React, { useEffect } from "react";
import axios from "axios";
import styles from "./TableFooter.module.css";
import { baseUrl } from "../../../config/config";
const TableFooter = ({ range, setPage, page, slice, setData }) => {
  // useEffect(() => {
  //   if (slice.length < 1) {
  //  getData()
  //   }
  // }, []);
  const getData = (p) => {
    setPage(p);
    axios.get(`${baseUrl}/customers/getarticles?page=${p}`)
    .then((res) => {
    
      let dataObj = {}
      let dataList = []
    
      res.data.result.map((i, e) => {
        dataObj = {
          sn : ++e,
          content : i.content,
          file : i.file,
          heading : i.heading,
          id : i.id,
          publish_date : i.publish_date,
          status : i.status,
          type : i.type,
          writer : i.writer
        }
        dataList.push(dataObj)
            })
            setData(dataList)
    })
  }
  return (
    <div className={styles.tableFooter}>
      {range.map((el, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => getData(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;