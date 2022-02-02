import React from 'react';
import { makeStyles, Button, Typography, Card, Container, CardHeader, CardActionArea, CardActions, CardMedia, CardContent } from '@material-ui/core';
// import { Link} from "react-scroll";
import {Link} from 'react-router-dom';
import {mainScroll as scroll} from 'react-scroll';
const Content  = () => {
    const goToRow = (e) => {
        
            const anchor = document.querySelector(e)
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
         
    }
    return (
        <>
         <Container>
         <Card>
             <CardHeader title={
                 <>
                  <Typography variant="h4">
                  Contents
               
                      </Typography>
                 </>
             }/>
             <CardActionArea>
                 <CardContent>
                   
<table style={{display : "flex", flexDirection : "column", width: "100vw"}}>
    <tr onClick = {() => goToRow("#onlyLogin")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
            For New Client Registration	
        </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex", justifyContent : "flex-end", width: "20vw"}}>
            02
        </td>
    </tr>
    <tr onClick = {() => goToRow("#existing")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        For Existing Client
        </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            05
        </td>
    </tr>

    <tr onClick = {() => goToRow("#forgetPassword")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Forgot Password 
        </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            06
        </td>
    </tr>
    <tr onClick = {() => goToRow("#forgetPassword")} style={{display : 'flex'}}>
        <td style={{display : "flex",  width: "20vw"}}> 
        Change Password	 
        </td>
        <td style={{display : "flex",  width: "20vw"}}>
            ____________________________________________________
            </td>
        <td style={{display : "flex" , justifyContent : "flex-end", width: "20vw"}}>
            06
        </td>
    </tr>

                       
                       </table>
                       
                                            
                        <div      onClick={() => {
     const anchor = document.querySelector('#query')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Mazars Dashboard___________________________________________________________________________11
                        </div> 
                        <div      onClick={() => {
     const anchor = document.querySelector('#query')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>

Register Fresh Query________________________________________________________________________ 12
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#query')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Query Detail Page – Basic Query Information_____________________________________________________ 14
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#proposal')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Proposal	__________________________________________________________________________________15
                        </div>
                         <div      onClick={() => {
     const anchor = document.querySelector('#proposal')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Engagement Letter__________________________________________________________________________ 17
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#proposal')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Query Detail Page – Proposal__________________________________________________________________20
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#assignment')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Assignments________________________________________________________________________________21
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#assignment')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Query Detail Page – Assignments_______________________________________________________________23
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#payment')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Payment Status______________________________________________________________________________24
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#message')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Inbox_______________________________________________________________________________________28
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#feedback')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Feedback____________________________________________________________________________________29
                        </div>
                 </CardContent>
             </CardActionArea>
         </Card>
     </Container>
        </>
    )
}
export default Content;