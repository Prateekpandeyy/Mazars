import React from "react";
import {Box} from '@material-ui/core';
import {AiOutlineTwitter} from 'react-icons/ai'
import {AiOutlineFacebook} from 'react-icons/ai'
import {FaInstagram} from 'react-icons/fa';
import {AiOutlineLinkedin} from 'react-icons/ai';
import { makeStyles } from "@material-ui/core";
const useStyle = makeStyles({
    iconStyle : {
        display : "flex", 
        width : "40px",
        height : "40px",
        cursor : "pointer"
    }
})
const SocialIcons = () => {
    const classes = useStyle()
    return(
    <>

      <Box sx={{position : "absolute",  right : "15px", display : "flex"}}>
          <a href="https://twitter.com/MasindiaL" target="_blank">
      <AiOutlineTwitter className="twitterIcon" /></a>
<a href="https://www.facebook.com/masindia.live/" target="_blank">
        <AiOutlineFacebook className={classes.iconStyle}/>
        </a>
        <a href="https://www.instagram.com/masindia.live/?igshid=YmMyMTA2M2Y=" target="_blank">
        <FaInstagram className={classes.iconStyle}/>
        </a>
        <a href="https://www.linkedin.com/company/masindia-live/" target="_blank">
        <AiOutlineLinkedin className={classes.iconStyle} />
        </a>
          </Box>
    </>
    )
}
export default SocialIcons;