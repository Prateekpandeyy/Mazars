import React from 'react';
import {Paper, Box, Container, Typography, Button, Card, CardActionArea, CardHeader, CardMedia, CardContent, CardActions }from "@mui/material";
import style from "./manula.module.css";
import {makeStyles} from "@material-ui/styles";
import regImg from "../ManualImg/registrationImage.jpeg";
const useStyle = makeStyles(theme => ({
    root : {
        backgroundColor : "green", 
        color : "white",
        margin : "10px 0px",
        outline : "none",
        '&:hover': {
            backgroundColor : "green",
            color : "white",
            outline : "none"
        },
        '&:focus': {
            backgroundColor : "green",
            color : "white",
            outline : "none"
        }
    },
   
}))
const RegistrationInfo = () => {
    const classes = useStyle() 
    return (
        <>
         <Box>
         <Paper>
           <Card>
                <CardActionArea>
                    <CardContent>
                    <table className="table table-bordered p-2">

<tbody>
    <tr>
        <th>Name <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
                <li><Typography variant='body2'>
                Enter full name or any chosen name
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
        <th>Email Address <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Enter personal email address or the email address of any representative or authorized signatory of the business/entity
                    </Typography>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Occupation/Profession <sup className='declined'>*</sup></th>
       <td className='px-5'>
            <ul>
                <li>
                    <Typography variant="body2">
                    From drop down list, select your occupation/profession
                    </Typography>
                </li>
                <li>
                    <Typography variant='body2'>
                    In case of business/entity, select the occupation/ profession of the representative or authorized signatory, who is registering for query
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
                    From drop down list, select the Country/State/City. City or State may also be entered/typed
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
                   Choose a password that should be minimum of eight characters, including at least one upper case, lower case, special character and number
                   </Typography>
               </li>
            </ul>
        </td>
    </tr>
   
</tbody>
</table>
                    </CardContent>
                    </CardActionArea>
                
<CardActions>
    <Container>
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
        <Button variant="contained" className={classes.root}>Submit</Button> On entering the OTP, click on icon to complete the registration
        </Typography>
    </li>
   </div>
</ul>
    </Container>
    </CardActions>
    <CardMedia component="img" src={regImg}/>

            </Card>
           </Paper>
           <Typography variant="h6" align="right">
                       03
                   </Typography>
         </Box>
        </>
    )
}
export default RegistrationInfo;