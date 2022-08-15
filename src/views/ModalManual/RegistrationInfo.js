import React from 'react';
import {Paper, Box, Container, Typography, Button, Card, CardActionArea, CardHeader, CardMedia, CardContent, CardActions }from "@mui/material";
import style from "./manula.module.css";
import {makeStyles} from "@material-ui/styles";
import regImg from "../ManualImg/registrationImage.png";
const useStyle = makeStyles(theme => ({
    root : {
        backgroundColor : "#0071ce", 
        color : "white",
        margin : "10px !important",
        outline : "none",
        '&:hover': {
            backgroundColor : "#0071ce",
            color : "white",
            outline : "none"
        },
        '&:focus': {
            backgroundColor : "#0071ce",
            color : "white",
            outline : "none"
        }
    },
    root2: {
        backgroundColor: "blue",
        color: "white",
        margin: "10px",
        outline: "none",
        '&:hover': {
            backgroundColor: "blue",
            color: "white",
            outline: "none"
        },
        '&:focus': {
            backgroundColor: "blue",
            color: "white",
            outline: "none"
        }
    },
}))
const RegistrationInfo = () => {
    const classes = useStyle() 
    return (
        <>
         <Box id="signUp2" style={{display : "flex",  maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
        
         
               

    <Container maxWidth = "xl">
  <Card>
      <CardContent>
      <table className="table table-bordered p-2">

<tbody>
    <tr>
        <th>User Id <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
                <li><Typography variant='body2'>
                Enter minimum 6 alpha numeric characters (no special characters) Enter minimum 6 alpha numeric characters
                 (no special characters) to form an user id
                </Typography></li>
            
            </ul>
        </td>
    </tr>
    <tr>
        <th>Name <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
                <li><Typography variant='body2'>
                Enter full name or any chosen name (no special characters allowed)
                </Typography></li>
                <li>
                    <Typography variant='body2'>
                    For registration of business/entity, enter the legal name of the business/entity
                    </Typography>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Email Address<sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Enter personal email address or the email address of any representative
                     or authorized signatory of the business/entity
                    </Typography>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Occupation/Profession<sup className='declined'>*</sup></th>
       <td className='px-5'>
            <ul>
                <li>
                    <Typography variant="body2">
                    From drop down list, select your occupation/profession
                    </Typography>
                </li>
                <li>
                    <Typography variant='body2'>
                    In case of business/entity, select the occupation/ profession
                     of the representative or authorized signatory, who is registering for query
                    </Typography>
                </li>
            </ul>
        </td> 
    </tr>
    <tr>
        <th>Country/State/City <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    From drop down list, select the Country/State/City. City or State may also be entered/typed.
                    </Typography>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Address<sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Enter complete address.
                    </Typography>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Mobile Number <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
               <li>
                   <Typography variant='body2'>
                   Enter the valid numeric mobile number
                   </Typography>
               </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Zip Code <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
               <li>
                   <Typography variant='body2'>
                   Enter the valid Zip Code or Pin Code
                   </Typography>
               </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>GST IN</th>
        <td className='px-5'>
            <ul>
               <li>
                   <Typography variant='body2'>
                   Enter the valid 15-digit, PAN based Alpha Numeric GST IN number of the business/entity, if applicable
                          </Typography>
               </li>
            </ul>
        </td>
    </tr>
    <tr>
    <th>Password <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
               <li>
                   <Typography variant='body2'>
                   Choose a password that should be minimum of eight characters,
                    including at least one upper case, lower case, special character and number.
                 </Typography>
               </li>
            </ul>
        </td>
    </tr>
    <tr>
    <th>Secondary Email</th>
        <td className='px-5'>
            <ul>
               <li>
                   <Typography variant='body2'>
                   Enter email address of other person(s) of 
                   the organization entitled to work on the queries under the User Id code.</Typography>
               </li>
            </ul>
        </td>
    </tr>
</tbody>
</table>
    <ul className={style.registrationTable}>
   <div>
   <li>
       <Typography variant="body2">
       After filling the above information, click on the <Button variant="contained" className={classes.root}>Send Otp</Button> icon.
           </Typography>
           </li>
    <li>
        <Typography variant='body2'>
        An OTP will be sent to the above provided email address, valid for 180 seconds.
            </Typography> </li>
    <li> 
        <Typography variant='body2'>
        On entering the OTP, click on <Button variant="contained" className={classes.root}>Submit</Button>  icon to complete the registration
        </Typography>
    </li>
   </div>
</ul>
      </CardContent>
  </Card>
    </Container>
    
         </Box>
                     
<Typography variant="h6" align="center">
                       05
                   </Typography>
        </>
    )
}
export default RegistrationInfo;