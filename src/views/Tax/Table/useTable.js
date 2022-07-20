import { useState, useEffect } from "react";

// ...

const useTable = (data, page, rowsPerPage, total, setData) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);
  const calculateRange = (data, rowsPerPage , total) => {
   
    const range = [];
    const num = Math.ceil(total / rowsPerPage);
    let i = 1;
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
  };
  
  const sliceData = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  };
  useEffect(() => {
    const range = calculateRange(data, rowsPerPage, total);
    setTableRange([...range]);
    console.log("total", range)
    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice, setData]);

  return { slice, range: tableRange };
};

export default useTable;