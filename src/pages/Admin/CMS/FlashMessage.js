import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles, styled } from '@mui/material';
const MyContainer = styled(Container)({

})
const FlashMessage = () => {
    const submitData = (e) => {
        console.log(e)
    }
    return (
        <MyContainer>
     
         <div className="row">
             <div className="col-md-12"> Messages </div>
             <div className="col-md-6">
             <textarea
             style={{height: "250px"}}
             className="form-control"
           >

             </textarea>
                 </div>
         </div>
         
         <div className="row">
         <div className="col-md-3">
              <div style={{display: "flex", alignItems: "center",  margin: "5px 0px", width: "50px", justifyContent: "space-between"}}>
              <input type="radio" id="Show" name="Show" value="Show" />
<label for="Show" style={{marginBottom : "0px"}}>Show</label>
                  </div>
                      </div>
                  </div>
                  <div className="row">
                  <div className="col-md-3">
              <div style={{display: "flex", alignItems: "center",  margin: "5px 0px", width: "44px", justifyContent: "space-between"}}>
              <input type="radio" id="Show" name="Show" value="Show" />
<label for="Show" style={{marginBottom : "0px", marginLeft:"0px"}}>Hide</label>
                  </div>
                      </div>
                  </div>
         <div className="row">
            <div className="col-md-12">
            <button onClick = {(e) => submitData()} className="customBtn my-2">Submit</button> </div>
         </div>
      </MyContainer>
    )
}
export default FlashMessage;