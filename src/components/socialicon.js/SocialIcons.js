import React from "react";
import {Box} from '@material-ui/core';
import {AiOutlineTwitter} from 'react-icons/ai'
import {AiOutlineFacebook} from 'react-icons/ai'
import {FaInstagram} from 'react-icons/fa';
import {AiOutlineLinkedin} from 'react-icons/ai';
import { makeStyles } from "@material-ui/core";
import CustomTypography from "../Common/CustomTypography";
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

      <Box sx={{display : "flex", width : "100%", justifyContent : "center", margin : "10px 0", alignItems : "flex-end"}}>
        <CustomTypography>
            Follow us
        </CustomTypography>
          {/* <span style={{fontSize : "14px", color : "rgba(0, 0, 0, 0.85)", fontWeight : 400,  margin : "0 10px"}}>Follow us </span> */}
      <a href="https://twitter.com/MasindiaL" target="_blank">
      <AiOutlineTwitter className="myTwitter"/></a>
<a href="https://www.facebook.com/masindia.live/" target="_blank">
        <AiOutlineFacebook className="myFacebook"/>
        </a>
        <a href="https://www.instagram.com/masindia.live/?igshid=YmMyMTA2M2Y=" target="_blank">
        <FaInstagram className="instagramVideo"/>
        </a>
        <a href="https://www.linkedin.com/company/masindia-live/" target="_blank">
        <AiOutlineLinkedin className="myLinkedIn"/>
        </a>
          </Box>
    </>
    )
}
export default SocialIcons;