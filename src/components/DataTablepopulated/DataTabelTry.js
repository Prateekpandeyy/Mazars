import React from "react";
import { Container, Paper } from "@material-ui/core";
import BootstrapTable from "react-bootstrap-table-next";
import { styled } from "@material-ui/styles";
import paginationFactory, { PaginationProvider } from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'

const DataTablepopulated = (props) => {

    const pagination = paginationFactory({
        page:1,
        sizePerPage:48,
        firstPageText:'<<',
        lastPageText:'>>',
        prePageText:'<',
        nextPageText:'>',
        showTotal:true,
        alwaysShowAllBtns:true,
        onPageChange:function(page,sizePerPage){
            console.log('page',page);
            console.log("sizePerPage",sizePerPage);
        },
        onSizePerPageChange:function(page,sizePerPage){
            console.log('page',page);
            console.log("sizePerPage",sizePerPage);
        }
    });


    const MyContainer = styled(Container)({
        display: "flex",
        flexDirection: "column",
        height: "65vh",
        maxWidth: "1920px",
        width: "100%",

        overflowY: "auto",
        "& thead": {
            position: "sticky",
            top: "0",
            zIndex: 1,
            border: "0px",
            color: "#fff",
            backgroundColor: `${props.bgColor}`,
        },
        "& thead tr th": {
            border: "0px",
            fontSize: "14px",
            padding: "5px",
            fontFamily: "Halyard",
            verticalAlign: "top",
            color: "#fff",
        },

        "& tbody tr td": {
            padding: "0.50rem",
            fontSize: "14px",
            fontFamily: "Halyard",
        },
    });
    return (
        <>
        {props.data ? (
          <MyContainer disableGutters id="veRep">
            <BootstrapTable
              keyField={props.keyField}
              data={props.data}
              columns={props.columns}
              rowStyle={props.rowStyle2}
              rowIndex
            //   pagination={pagination}
            // pagination={paginationFactory({ sizePerPage: 50, onPageChange:(page)=>console.log("DB CALL with page" + page) })}
            />
          </MyContainer>
        ) : (
          ""
        )}
      </>
    );
};
export default DataTablepopulated;
