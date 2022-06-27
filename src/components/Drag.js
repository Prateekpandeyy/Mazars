import React from 'react';
import Draggable from 'react-draggable';
import Header from "./Header/Header";
import {Breadcrumbs, Box, Typography } from "@material-ui/core";
import { styled , makeStyles} from "@material-ui/styles";
import classes from '../views/Tax/design.module.css';
const MyContainer = styled(Box)({
    display : "flex", 
    justifyContent : "center", 
    alignItems : "center", 
    width: "100%",
    flexDirection : "column"
  })
const Drag = () => {
 
    
    return (
       <>
       <Header noSign="noSign" />
       <MyContainer>
       <div className={classes.articleContent}>
       <div className={classes.articlesDetails}>
       <Draggable>
        <div>I can now be moved around!</div>
      </Draggable>
      </div>
      </div>
       </MyContainer>

       </>
    )
}
export default Drag;