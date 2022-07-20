import React, { useState } from "react";
import { Link } from 'react-router-dom';
import useTable from "./useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";
import CommonServices from "./../../../common/common";
const Table = ({ data, rowsPerPage, total, setData }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage, total, setData);
  console.log("slice", slice )
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>S.No</th>
            <th className={styles.tableHeader}>Date of publishing</th>
            <th className={styles.tableHeader}>Subject</th>
            <th className={styles.tableHeader}>Heading</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el, e) => (
            <tr className={styles.tableRowItems} key={e}>
                   <td className={styles.tableCell}>{page * rowsPerPage + ++e - 10}</td>
              <td className={styles.tableCell}>   {el.publish_date.split("-").reverse().join("-")}</td>
              <td className={styles.tableCell}> {CommonServices.capitalizeFirstLetter(el.type)}</td>
              <td className={styles.tableCell}>
              <Link to = {{
                            pathname : "/customer/details",
                            index : el.id,
                            hash : el.type
                        }}>
                   {`${el.heading}` } 
                
                        </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter 
       setData = {setData}
       range={range} 
       slice={slice} 
       setPage={setPage}
       page={page} />
    </>
  );
};

export default Table;