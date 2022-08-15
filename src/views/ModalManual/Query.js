import { makeStyles, Box, Button, Typography, Card, Container, CardHeader, CardActionArea, CardActions, CardMedia, CardContent } from '@material-ui/core';
import React from 'react';
import Editprofile from './Editprofile';
import imgQuery from '../ManualImg/queryImage.png';
import changePasswordImg from '../ManualImg/changePass.png';
import changePass from '../ManualImg/changePassform.png';
import querySuccess from '../ManualImg/querySuccess.png';
import querySuccess22 from '../ManualImg/queryuccess22.png';
import queryNew from '../ManualImg/queryNew.png';
import newOne2 from '../ManualImg/newOne2.png';
import addFreshQuery from '../ManualImg/addFreshQuery.png';
import success2 from "../ManualImg/success2.png";
import queryList from "../ManualImg/queryList.png";
import queryList22 from "../ManualImg/queryList22.png";
import img1234 from "../ManualImg/one1234.png";
import delImg from '../ManualImg/del.png';
import message from '../ManualImg/message.png';
import messageHistory from '../ManualImg/messageHistory.png';
import nextImg from '../ManualImg/nextImage.png';
import queryList222 from '../ManualImg/queryList222.png';
import updateQuery from '../ManualImg/updateQuery.png';
import deleteImg from '../ManualImg/deleteImg.png';
import rejectQuery from '../ManualImg/rejectQuery.png';
import queImgae from '../ManualImg/que.png';
import showMessageHistory22 from '../ManualImg/showMessageHistory.png';
import showQuery22 from '../ManualImg/showQuery22.png';
import queryDetails from '../ManualImg/queryDetails.png';
import basicDetails from '../ManualImg/basicDetails.png';
import proposalDetails from '../ManualImg/proposalDetails.png';
import successImg from "../ManualImg/successImg222.png";
import iconProfile from "../ManualImg/profileIcon.png";
import changePass2 from "../ManualImg/change.png";
import successChange from "../ManualImg/successChange.png";
import errorp from "../ManualImg/errorp.png";
import deleteQuery from "../ManualImg/deleteQuery.png";
import messageImg from "../ManualImg/messageImg.png";
import successMsg from "../ManualImg/successMsg.png";
import messagehistoryicon from "../ManualImg/messagehistoryicon.png";
import viewDiscussion from "../ManualImg/viewDisuimg.png";
const Query = () => {
    const useStyle = makeStyles(theme => ({
        root: {
            backgroundColor: "#0071ce",
        color: "white",
        margin: "10px 5px",
        outline: "none",
            '&:hover': {
                backgroundColor: "#0071ce",
                color: "white",
                outline: "none"
            },
            '&:focus': {
                backgroundColor: "#0071ce",
                color: "white",
                outline: "none"
            }
        },
        root2: {
            backgroundColor: "#0071ce",
            color: "white",
            margin: "10px 5px",
            outline: "none",
            '&:hover': {
                backgroundColor: "#0071ce",
                color: "white",
                outline: "none"
            },
            '&:focus': {
                backgroundColor: "#0071ce",
                color: "white",
                outline: "none"
            }
        },
        root3: {
            backgroundColor: "red",
            color: "white",
            margin: "10px 0px",
            outline: "none",
            '&:hover': {
                backgroundColor: "#0071ce",
                color: "white",
                outline: "none"
            },
            '&:focus': {
                backgroundColor: "#0071ce",
                color: "white",
                outline: "none"
            }
        },

    }))
    const classes = useStyle()
    return (

        <>
         <section id="query">
            <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
            <Container maxWidth= "xl">
                <Card>
                   
                   
                        <CardContent>
                        <Typography variant="body1">
                        Incorrect password: At the login page, if the password entered is incorrect then
Error message window will appear showing “Incorrect email or password”. Click Ok
& login with the correct credentials.
                            </Typography>
                            <CardMedia component="img" src={errorp} style={{margin: "10px 0px"}} />
                          
                        <Typography variant="body1">
                        After successful login by an existing 
                        client or registration of a new client, following screen/window will open.
                            </Typography>
                            <CardMedia component="img" src={successImg}  style={{margin: "10px 0px"}} />
                          
                          
                        </CardContent>
                    
                </Card>
            </Container>

          
            <Typography variant="h6" align="center">
                       13
                   </Typography>
                </Box>

            
           <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
           <Container maxWidth= "xl">
                <Card>
                    
                  
                        <CardContent>
                        <CardHeader title={
                <Typography variant='span' variantMapping={{
                    h5 : "span"
                }} className="modalTextHeading" id="forgetPassword">
  Change password: To change the password, click on  <CardMedia component="img" src={iconProfile}style={{display : "inline", width : "30px", height : "30px"}} /> located at top right
                                side of the screen and further select  <CardMedia component="img" src={changePass2} style={{display : "inline", width : "155px", height : "15px"}} />
                                          
</Typography>
             }/>
                       
                            <CardMedia component="img" src={imgQuery} style={{margin : "10px 0px"}} />
                            <Typography variant="body1">
                                Change password window will appear, enter the registered email id along with the new password that
                                client wants to register for the account & click on
                                <Button variant="contained" className={classes.root}>Get OTP</Button>
                            </Typography>
                            
                            <CardMedia component="img" src={changePasswordImg} />
                            
                        
                           
                        </CardContent>
                   
                </Card>
            </Container>
           
               </Box>
               <Typography variant="h6" align="center">
                       14
                   </Typography>
          <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
                  
            <Container maxWidth= "xl">
                <Card>
                        <CardContent>
                        <Typography variant="body1">
                                Change password: Success message window will appear showing OTP has been
                                sent to your registered email address. Click Ok.
                            </Typography>
                            <CardMedia component="img" src={successChange} style={{margin : "10px 0px"}} />
                        <Typography variant="body1">
                                Change password: Enter the OTP received on your registered email address & click on
                                <Button variant="contained" className={classes.root2}>Submit</Button>
                            </Typography>
                            <CardMedia component="img" src={successChange} style={{margin : "10px 0px"}} />
                        
                        </CardContent>
                   
                </Card>
            </Container>
            
            
              </Box>
              <Typography variant="h6" align="center">
                       15
                   </Typography>
                   <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
              <Container maxWidth = "xl">
                  <Card>
                      <CardContent>
                      <Typography variant="body1">
                                Change password: Success message window will appear showing “Password changed successfully”. Click ok & continue.
                            </Typography>
                            <CardMedia component="img" src={querySuccess} style={{margin : "10px 0px"}} />
                            <Typography variant="body1">
                         The new password should be used for future login.
                         After logging in, Mazars dashboard will appear as below

                            </Typography>
                           
                            <CardMedia component="img" src={querySuccess22} style={{margin : "10px 0px"}} />
                
                      </CardContent>
                  </Card>
              </Container>
               </Box>
               <Typography variant="h6" align="center">
                       16
                   </Typography>
         <Editprofile />
            
          <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
              <Container maxWidth= "xl">
                  <Card>
<CardContent>
<CardHeader title={

<Typography variant='span' variantMapping={{
                     h5 : "span"
                 }} className="modalTextHeading">
<Typography variant="h6">
                         To register a new query, click on ‘Queries’ tab & then
                         <Button variant="contained" className={classes.root2}>Fresh Query</Button> button.
                            </Typography>
 </Typography>
             }/>

                            <CardMedia component="img" src={queryNew}  style={{margin : "10px 0px"}} />
                            <Typography variant="body1">
                         Select the category and sub-category from drop down list as per nature of your query & click on    
                         <Button variant="contained" className={classes.root2}>Submit</Button>          
                          . Category & Sub Category should be carefully selected as these cannot be edited later on.
                         
                            </Typography>
                            <CardMedia component="img" src={newOne2} src={queryNew}  style={{margin : "10px 0px"}} />
</CardContent>
                  </Card>
              </Container>
             
              </Box>
              <Typography variant="h6" align="center">
                       22
                   </Typography>

           <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
               <Container maxWidth= "xl">
                   <Card>
                       <CardContent>
                       <Typography variant="body1">
                         Category and Sub-Category Classification
                            </Typography>
                            <table className="table table-bordered p-2" style={{width : "380px", margin : "auto"}}>
<thead>
    <th>Category</th>
    <th>Sub-Category</th>
    </thead>
<tbody>
    <tr>
        <td>Direct<sup className='declined'>*</sup></td>
        <td className='px-5'>
            <ul>
                <li><Typography variant='body2'>
                Compliance
                </Typography></li>
                <li>
                    <Typography variant='body2'>
                    Assessment
                    </Typography>
                </li>
                <li>
                    <Typography variant='body2'>
                    Appeal
                    </Typography>
                </li>
                <li>
                    <Typography variant='body2'>
                    Advisory/Opinion
                    </Typography>
                </li>
                <li>
                    <Typography variant='body2'>
                    Transfer Pricing
                    </Typography>
                </li>
                <li>
                    <Typography variant='body2'>
                    Other
                    </Typography>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>Indirect Tax<sup className='declined'>*</sup></td>
        <td className='px-5'>
            <ul>
                <li><Typography variant='body2'>
                Compliance
                </Typography></li>
                <li>
                    <Typography variant='body2'>
                    Assessment
                    </Typography>
                </li>
                <li>
                    <Typography variant='body2'>
                    Appeal
                    </Typography>
                </li>
                <li>
                    <Typography variant='body2'>
                    Advisory/Opinion
                    </Typography>
                </li>
              
                <li>
                    <Typography variant='body2'>
                    Other
                    </Typography>
                </li>
            </ul>
        </td>
    </tr>
    </tbody>
    </table>
    <Typography variant="body1">
                         Enter the complete information about your query and upload all necessary documents & click on .
                         <Button variant="contained" className={classes.root}>Submit</Button> 
                           (please see instructions below for adding fresh query) 
                                  
                         
                         
                            </Typography>

                            <CardMedia component="img" src={addFreshQuery} style={{margin : "10px 0px"}} />
                       </CardContent>
                   </Card>
               </Container>
             
               </Box>

           
               <Typography variant="h6" align="center" id="freshQuery">
                    23
                   </Typography>
<Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>

<Container maxWidth= "xl">
                <Card>
                    <CardHeader 
                    title={
                        <>
                         <Typography variant="h5">
                         Instructions for adding Fresh Query:
                            </Typography>
                           
                        </>
                    }/>
                   
                        <CardContent>
                           
                        <table className="table table-bordered p-2">

<tbody>
    <tr>
        <th>Brief facts of the case <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
                <li><Typography variant='body2'>
                Enter information briefly explaining the facts of the case.
                </Typography></li>
               
            </ul>
        </td>
    </tr>
    <tr>
        <th>Specific questions for advisory <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Enter the specific question(s) for which you need reply/assistance/advice.
                </Typography>
                </li>
                <li>
                    <Typography variant='body2'>
                    Multiple questions can be added by clicking 
                    <Button variant="contained" className={classes.root2}>+</Button> button
                </Typography></li>
               
            </ul>
        </td>
    </tr>
    <tr>
        <th>Case name</th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    If required, enter the name of the case
                </Typography>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Assessment year</th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    From the drop-down list, select the relevant Assessment Year(s)
                </Typography>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Upload your document(s)</th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Click on the Red Upward facing arrow () & 
                    select the relevant files to be uploaded. Multiple files can be selected & uploaded together.
                </Typography>
                </li>
                <li>
                    <Typography variant='body2'>
                    Following file extensions are acceptable:
(DOCX, gif, jpg, jpeg, png, docx, doc, pdf, xls, xlsx, odt, ods,
 msg, zip, rtf, tif, xml, xlsb, xmlb, mp3, ppt, pptx, mp4, json, wma, wav, avi, wmv)
                </Typography>
                </li>
                <li>
                    <Typography variant='body2'>
                    Uploading document(s) is not mandatory.
                </Typography>
                </li>
                
            </ul>
        </td>
    </tr>

    <tr>
        <th>Format in which opinion is required <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Click on the checkbox for the 
                    format in which opinion is required. Multiple formats can be selected.
                </Typography>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Timeline within which opinion is required <sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Select the timeline within which the reply/assistance/advice is required.
                </Typography>
                </li>
            </ul>
        </td>
    </tr>
    <tr>
        <th>Purpose of the query<sup className='declined'>*</sup></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    From the drop-down list, select the purpose for which the query has been made.
                     If the option is not listed, select others. Multiple selection can be made.
                </Typography>
                </li>
            </ul>
        </td>
    </tr>
   
    
    
   
    </tbody>
   <tr>
       <td colSpan="2">
       <Typography variant="body2">
        (Click on
        <Button variant="contained" className={classes.root}>Submit</Button>
          after entering all necessary information.)
        </Typography>
       </td>
       <td></td>
   </tr>
 
    </table>
                        </CardContent>
                   
                </Card>
            </Container> 

    
    </Box>  
    <Typography variant="h6" align="center">
           24
    </Typography>
    <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
        <Container maxWidth= "xl">
            <Card>
                <CardContent>
                <Typography variant="body1">
                After submitting the query, Success message window will appear showing the
                 system generated unique query number. Click Ok. Client will also receive 
                 an email message informing successful submission of the query. 
                Such message would be received by all secondary email’s users also.
                            </Typography>
                            <CardMedia component="img" src={success2} style={{margin : "10px 0px"}} />
                            <Typography variant="body1">
                         After clicking on Ok, the query will be reflected under queries Tab
                            </Typography> 
                            <CardMedia component="img" src={queryList} style={{margin : "10px 0px"}} />
                </CardContent>
            </Card>
        </Container>
      
        </Box>            
           
        <Typography variant="h6" align="center">
            25
        </Typography>
         <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
             <Container maxWidth= "xl">
                 <Card>
                     <CardContent>
                     <Typography variant="body1">
                     Query Tab will show the brief status of the query,
                      Under Action column, icons are available for different actions as below
                          </Typography>              
                            <CardMedia component="img" src={queryList22} style = {{margin : "10px 0px"}} />
                            <CardHeader 
                    title={
                        <>
                         <Typography variant="h5">
                         Query Tab: Action Buttons:
                            </Typography>
                           
                        </>
                    }/>
                           
                            <table className="table table-bordered p-2">

<tbody>
    
    <tr>
        <th><CardMedia  component="img"
        src={img1234}  /></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Click to edit the query details
                </Typography>
                </li>
                
            </ul>
        </td>
    </tr>
    <tr>
        <th><CardMedia  component="img"
        src={delImg}  /></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Click to withdraw/delete the query
                </Typography>
                </li>
                
            </ul>
        </td>
    </tr>
    <tr>
        <th><CardMedia  component="img"
        src={message}  /></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Click to send message to Mazars Team
                </Typography>
                </li>
                
            </ul>
        </td>
    </tr>
    <tr>
        <th><CardMedia  component="img"
        src={messageHistory}  /></th>
        <td className='px-5'>
            <ul>
                <li>
                    <Typography variant='body2'>
                    Click to view history of messages exchanged between the client
                     & Mazars team in respect of the query
                </Typography>
                </li>
                
            </ul>
        </td>
    </tr>
    </tbody>
    </table>          
                     </CardContent>
                 </Card>
             </Container>
            
             </Box>  

             <Typography variant="h6" align="center">
                 26
             </Typography>
           <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
               <Container maxWidth= "xl">
                   <Card>
                   
                    <CardContent>
                   
                              <CardHeader 
                    title={
                        <>
                         <Typography variant="h5">
                         Action Button: Edit
                        
                        <CardMedia component="img" src={img1234} style={{ margin : "0px 5px", display : "inline", width : "20px"}}/>
                    
                            </Typography>
                           
                        </>
                    }/>
                           
                          <ul className= "px-5">
                              <li style={{margin : '0px 10px'}}>
                              <Typography variant="body1" gutterBottom color="primary">
                           Click the edit icon to edit query details.
                            Category & Sub-category can’t be edited.
                           </Typography>
                              </li>
                              <li style={{margin : "0px 10px"}}>
                              <Typography variant="body1" color="primary">
                           Additional documents can also be uploaded by clicking  icon. Documents once uploaded cannot be deleted/withdrawal.
                            Documents, therefore, should be selected carefully before being uploaded.
                           </Typography>
                              </li>
                              </ul>
                              
                           <CardMedia component="img" src={nextImg} style={{margin : "10px 0px"}} />
                           <Typography variant="body1">
                         After editing the query details, click on 
                         <Button variant="contained" className={classes.root}> Update </Button>
                         . Success message window will appear showing
                          “Query updated successfully”. Click ok
                         
                            </Typography>
                            <CardMedia component="img" src={queryList222} />
                           
                         </CardContent>
                   </Card>
               </Container>
              
               </Box> 
               <Typography variant="h6" align="center">
                       27
                   </Typography>
                           
<Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
    <Container maxWidth= "xl">
        <Card>
            <CardContent>
            <Typography variant="body1">
                         In case of any attempt to upload any document/file 
                         already uploaded, following message will be displayed upon clicking on
                         <Button variant="contained" className={classes.root}> Update </Button>
                            </Typography>
            <CardMedia component="img" src={updateQuery} />
           
         
            </CardContent>
        </Card>
    </Container>
    
    </Box>
    <Typography variant="h6" align="center">
                       28
                   </Typography>
       <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
           <Container maxWidth= "xl">
               <Card>
                   <CardContent>
               
                               <CardHeader 
                    title={
                        <>
                         <Typography variant="h5">
                         Action Button: Delete
                         
                         <CardMedia src={delImg} component="img" 
                         style={{display : "inline", width : "20px"}} />
                            </Typography>
                           
                        </>
                    }/>
                     <ul className= "px-5">
                              <li style={{margin : '0px 10px'}}>
                            <Typography variant="h6" color="primary">
                            Click delete icon to delete the query.
                            </Typography>
                           </li>
                           </ul>
                            <Typography variant="body1">
                        Delete message window will appear showing “Are you sure? Want to delete query?”. 
                        Click   <Button variant="contained" className={classes.root2}> Yes, delete it </Button> if the client wants to delete the query. Otherwise click the 
                        <Button variant="contained" className={classes.root3}> Cancle </Button> button </Typography>
                          <CardMedia component="img" src={deleteImg} />
                   <Typography variant="body1">
                         After clicking on    
                         <Button variant="contained" className={classes.root}> Yes, delete it</Button>  following window will appear showing 
                         “Please provide the reason”, enter the reason(s) 
                         for deleting the query and click
                         <Button variant="contained" className={classes.root}> Submit</Button>
                            </Typography>
                            <CardMedia component="img" src={rejectQuery}  style = {{margin : "10px 0px"}}/>
                           
                   </CardContent>
               </Card>
           </Container>
           
           </Box>       
           <Typography variant="h6" align="center">
                       29
                   </Typography>
            <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
                <Container maxWidth= "xl">
                    <Card>
                        <CardContent>
                        <Typography variant="body1">
                         After clicking on  
                           <Button variant="contained" className={classes.root2}> Submit</Button> , the query will be deleted & message window will appear showing “Query deleted successfully”.   
                                                  </Typography> 
                                                  <CardMedia component="img" src={deleteQuery}  style = {{margin : "10px 0px"}}/>
                                 
                        </CardContent>
                    </Card>
                </Container>
                
                </Box>
                <Typography variant="h6" align="center">
                       30
                   </Typography>
         <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
             <Container maxWidth= "xl">
                 <Card>
                     <CardContent>

                     <CardHeader 
                    title={
                        <>
                                            <Typography variant="h5">
  Action Button: Send message
                       
  <CardMedia src={message} component="img" 
                         style={{display : "inline", width : "20px"}} />
                            </Typography>
                           
                        </>
                    }/>
  <ul className= "px-5">
                              <li style={{margin : '0px 10px'}}>
                              <Typography variant="body1" color="primary">
                          Click send message icon to send a message to Mazars Team
                          </Typography>
                              </li>
                              <li style={{margin : '0px 10px'}}>
                              <Typography variant="body1" color="primary">
                          From the drop-down list, select the message type depending on the nature of message.
                          </Typography>
                          </li>
                          <li style={{margin : '0px 10px'}}>
                          <Typography variant="body1">
                          Enter the message & click  
                           <Button variant="contained" className={classes.root2}> Send</Button> 
                                                  </Typography>
                              </li>
                       </ul>
                        
                       <CardMedia component="img" src={messageImg}  style = {{margin : "10px 0px"}}/>
                           
                                                  <table className="table table-bordered p-2">

<tbody>
    
    <tr>
        <th> <Typography variant="h6">
        Query No.
            </Typography></th>
        <td className='px-5'>
            <Typography variant="h6">
            Concerned query number
            </Typography>
        </td>
    </tr>
    <tr>
        <th> <Typography variant="h6">
        Message Type
            </Typography></th>
        <td className='px-5'>
            <Typography variant="h6">
            Query discussion/Proposal discussion/Assignment discussion/Payment discussion for 
            messages sent during these stages of processing of query & ‘others’ for remaining type of messages
            </Typography>
        </td>
    </tr>
    <tr>
        <th> <Typography variant="h6">
        Message
            </Typography></th>
        <td className='px-5'>
            <Typography variant="h6">
            Contents of message
            </Typography>
        </td>
    </tr>
    </tbody>
    </table>
                      
                     </CardContent>
                 </Card>
             </Container>
            
             </Box>  
             <Typography variant="h6" align="center">
                       31
                   </Typography>


                   <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
             <Container maxWidth= "xl">
                 <Card>
                     <CardContent>
                     <Typography variant="body1">
                     <Typography variant="body1">
                     After clicking on
                                <Button variant="contained" className={classes.root}>Send</Button>
                                Success message window will appear, showing “Message sent successfully”. Click ok.
                            </Typography>
                            </Typography>   
                            <CardMedia component="img" src={successMsg} style={{margin : "10px 0px"}} />
                           
                        
                     </CardContent>
                 </Card>
             </Container>
            
             </Box>

             <Typography variant="h6" align="center">
                       32
                   </Typography>

                   <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
           <Container maxWidth= "xl">
               <Card>
                   <CardContent>
               
                               <CardHeader 
                    title={
                        <>
                         <Typography variant="h5">
                         Action Button: View discussion message
                         
                         <CardMedia src={messagehistoryicon} component="img" 
                         style={{display : "inline", width : "20px"}} />
                            </Typography>
                           
                        </>
                    }/>
                     <ul className= "px-5">
                              <li style={{margin : '0px 10px'}}>
                            <Typography variant="h6" color="primary">
                            Click view discussion message icon to view history
                             of messages exchanged between the client & the MAS team in respect of the query.
                            </Typography>
                           </li>
                           <li style={{margin : '0px 10px'}}>
                            <Typography variant="h6" color="primary">
                            Name column specifies the sender/recipient of message.  </Typography>
                           </li>
                           <li style={{margin : '0px 10px'}}>
                            <Typography variant="h6" color="primary">
                            Green left arrow indicates that the client received
                             message from the sender mentioned in name column.
                           </Typography>
                           </li>
                          
                           </ul>
                                  <CardMedia component="img" src={viewDiscussion} />
                 
                   </CardContent>
               </Card>
           </Container>
           
           </Box>   

           <Typography variant="h6" align="center">
                       33
                   </Typography>


         <Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>
             <Container maxWidth= "xl">
                 <Card>
                     <CardContent>
                     <Typography variant="body1">
                         To view the details of query submitted, click on the query number 
                         in the queries tab or in the Proposal, Payment Status or Assignments tab.
                            </Typography>   
                            <CardMedia component="img" src={showQuery22} style={{margin : "10px 0px"}} />
                            <Typography variant="body1">
                         After clicking on the query number, 
                         following details will be displayed in basic query information tab.
                         </Typography> 
                         <CardMedia component="img" src={queryDetails} style={{margin : "10px 0px"}} />
                     </CardContent>
                 </Card>
             </Container>
            
             </Box>
             <Typography variant="h6" align="center">
                       34
                   </Typography>
<Box style={{display : "flex", maxWidth: "900px", margin: "auto",  minHeight : "500px", flexDirection : "column", padding: "10px 15px"}}>

<Container maxWidth= "xl">
                <Card>
                   
                  
                        <CardContent>
                           
                        
                         
                          <CardMedia component="img" src={basicDetails} style={{margin : "10px 0px"}}/>
                          <CardMedia component="img" src={proposalDetails} style={{margin : "10px 0px"}} />
                        </CardContent>
                   
                </Card>
            </Container>
          
    </Box>           
          
    <Typography variant="h6" align = "center">
                35
            </Typography>


</section>
        </>
    )
}
export default Query;