import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../config/config";
import "antd/dist/antd.css";
import { Select } from "antd";
import { useForm } from "react-hook-form";
import Excel from 'exceljs';
import { saveAs } from 'file-saver';
const workSheetName = 'Worksheet-1';
const workBookName = 'MyWorkBook';
const myInputId = 'myInput';
function CustomerListFilter(props) {
  const workbook = new Excel.Workbook();

  const { handleSubmit, register, errors, reset } = useForm();
  const { Option, OptGroup } = Select;

  const [selectedData, setSelectedData] = useState([]);

  const { setData, searchQuery, setRecords, records, getCustomer,listData  } = props;
  var current_date = new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)

  const [item] = useState(current_date);
  
  const resetData = () => {
   
    reset();
   getCustomer();
  };
  const columns = [
    { header: 'S.No', key: 'id' },
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email' },
    { header: 'Mobile No', key: 'phone' },
    { header: 'Occupation', key: 'occupation' },
    { header: 'Country', key: 'country' },
    { header: 'State', key: 'state' },
    { header: 'City', key: 'city' },
    { header: 'Date', key: 'created' }
  ];
 

  

  
  const onSubmit = (data) => {

if(searchQuery == "SearchQuery")
axios
.get(
  `${baseUrl}/admin/getAllList?&name=${data.name}&country=${data.country}&state=${data.state}&city=${data.city2
  }&email=${data.email}&occupation=${data.occupation}&from=${data.p_dateFrom}&to=${data.p_dateTo}`
)
.then((res) => {
<<<<<<< HEAD
  console.log("myResult", res.data.result);
  var finalData = res.data.result
=======

>>>>>>> fb9983d312e1292b5ef70abe83110c6d79a3c8a3
  if (res.data.code === 1) {
    if (res.data.result) {
      setData(res.data.result);
    setRecords(res.data.result.length)
    }
  }
});     
};
const exportToExcel = async () => {
//setData( arr => [...arr, `${arr}`]);


// console.log(setData.todo)
  
  try {
    
    
   // const myInput = document.getElementById(myInputId);
    const fileName = "Excel file";

    // creating one worksheet in workbook
    const worksheet = workbook.addWorksheet(workSheetName);

    // add worksheet columns
    // each columns contains header and its mapping key from data
    worksheet.columns = columns;

    // updated the font for first row.
    worksheet.getRow(1).font = { bold: true };

    // loop through all of the columns and set the alignment with width.
    worksheet.columns.forEach(column => {
      column.width = column.header.length + 5;
      column.alignment = { horizontal: 'center' };
    });

    // loop through data and add each one to worksheet
    listData.map(singleData => {
      worksheet.addRow(singleData);
    });

    // loop through all of the rows and set the outline style.
    worksheet.eachRow({ includeEmpty: false }, row => {
      // store each cell to currentCell
      const currentCell = row._cells;

      // loop through currentCell to apply border only for the non-empty cell of excel
      currentCell.forEach(singleCell => {
        // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
        const cellAddress = singleCell._address;

        // apply border
        worksheet.getCell(cellAddress).border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
    });

    // write the content using writeBuffer
    const buf =  await workbook.xlsx.writeBuffer();

    // download the processed file
    saveAs(new Blob([buf]), `${fileName}.xlsx`);
  
 
  } 
   catch (error) {
    console.error('<<<ERRROR>>>', error);
    console.error('Something Went Wrong', error.message);
  } finally {
    // removing worksheet's instance to create new one
    workbook.removeWorksheet(workSheetName);
  }

 
};

  return (
    <>
    <div className="row">
      <div className="col-sm-12 d-flex">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row my-3">
        <div className="col-sm-3">
            
          <input 
          placeholder="Name"
          type="text"
          name="name"
          className="form-control"
          ref={register}
          />
      </div>
      <div className="col-sm-3">
            
            <input 
            placeholder="Country"
            type="country"
            name="country"
            className="form-control"
            ref={register}
            />
        </div>
        <div className="col-sm-3">
            
            <input 
            placeholder="City"
            type="text"
            name="city2"
            className="form-control"
            ref={register}
            />
        </div>
              <div className="col-sm-3">
                  
                  <input 
                  placeholder="State"
                  type="text"
                  name="state"
                  className="form-control"
                  ref={register}/>
              </div>
             
              
          
          </div>
          <div className="row my-3">
          <div className="col-sm-3">
                
                <input 
                placeholder="Email"
                type="text"
                name="email"
                className="form-control"
                ref={register}/>
            </div>
            <div className="col-sm-3">
              
              <input 
              placeholder="Occupation"
              type="text"
              name="occupation"
              className="form-control"
              ref={register}/>
          </div>
          <div className="form-inline">
             

             <div className="form-group mx-sm-1  mb-2">
               <label className="form-select form-control">From</label>
             </div>

             <div className="form-group mx-sm-1  mb-2">
               <input
                 type="date"
                 name="p_dateFrom"
                 className="form-select form-control"
                 ref={register}
                 max={item}
               />
             </div>

             <div className="form-group mx-sm-1  mb-2">
               <label className="form-select form-control">To</label>
             </div>

             <div className="form-group mx-sm-1  mb-2">
               <input
                 type="date"
                 name="p_dateTo"
                 className="form-select form-control"
                 ref={register}
                 defaultValue={item}
                 max={item}
               />
             </div>
</div>
          </div>
             
              <div className="row my-3">
             
             <div className="col-sm-6">
             <button type="submit" className="customBtn mx-sm-1 mb-2">
                Search
              </button>
              <button
          type="submit"
          className="customBtn mx-sm-1 mb-2"
          onClick={() => resetData()}
        >
          Reset
        </button>
        <div className="form-group d-inline-block">
                  <label className="form-select form-control"
                  >Total Records : {records}</label>
                </div>
                <button
          type="submit"
          class="btn btn-primary mx-sm-1 mb-2"
          onClick={() => exportToExcel()}
        >
          Export to Excel
        </button>
             </div>
              
              </div>
 
           

           
          </form>
        </div>
      </div>
    </div>
  </>
  );
}

export default CustomerListFilter;
