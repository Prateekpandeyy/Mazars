import React from 'react';
import { makeStyles, Button, Typography, Card, Container, CardHeader, CardActionArea, CardActions, CardMedia, CardContent } from '@material-ui/core';
// import { Link} from "react-scroll";
import {Link} from 'react-router-dom';
import {mainScroll as scroll} from 'react-scroll';
const Content  = () => {
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
                   
                    <div      onClick={() => {
     const anchor = document.querySelector('#query')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
For New Client Registration	__________________________________________________________________ 02
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#query')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
For Existing Client	__________________________________________________________________________ 05
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#query')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Forgot Password 	____________________________________________________________________________06
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#query')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Change Password		__________________________________________________________________________ 09
                        </div>
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