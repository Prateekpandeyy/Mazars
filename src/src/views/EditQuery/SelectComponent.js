import React, { useState, useEffect } from "react";
import { Select } from "antd";

function SelectComponent({ assessmentYear, updateValue }) {
  const { Option } = Select;
  //   const [selectedData, setSelectedData] = useState("");
  console.log("sel-",assessmentYear);
  function handleChange(value) {
    updateValue(value);
  }
  return (
    <div>
      <Select
        mode="tags"
        style={{ width: "100%" }}
        onChange={handleChange}
        defaultValue={assessmentYear}
        allowClear
      >
        {assessment_year.map((p, i) => (
          <Option key={p.year}>{p.year}</Option>
        ))}
      </Select>
    </div>
  );
}

export default SelectComponent;

const assessment_year = [
  {
    year: "2010-11",
  },
  {
    year: "2011-12",
  },
  {
    year: "2012-13",
  },
  {
    year: "2013-14",
  },
  {
    year: "2014-15",
  },
  {
    year: "2015-16",
  },
  {
    year: "2016-17",
  },
  {
    year: "2017-18",
  },
  {
    year: "2018-19",
  },
  {
    year: "2019-20",
  },
  {
    year: "2020-21",
  },
  {
    year: "2021-22",
  },
  {
    year: "2022-23",
  },
  {
    year: "2023-24",
  },
  {
    year: "2024-25",
  },
  {
    year: "2025-26",
  },
  {
    year: "2026-27",
  },
  {
    year: "2027-28",
  },
];

//  function updateValue(value) {
//     setSelectedData(value);
//   }

{
  /* <SelectComponent
                        assessmentYear={assessmentYear}
                        updateValue={updateValue}
                      /> */
}
