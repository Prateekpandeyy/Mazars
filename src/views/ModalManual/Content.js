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
For New Client Registration	______________________________________________________ 01
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#query')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
For Existing Client	______________________________________________________ 01
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#query')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Forgot Password	______________________________________________________ 01
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#query')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Change Password	______________________________________________________ 01
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#query')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Mazars Dashboard	______________________________________________________ 01
                        </div> 
                        <div      onClick={() => {
     const anchor = document.querySelector('#query')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Mazars Dashboard	______________________________________________________ 01
                        </div>         
                        <div      onClick={() => {
     const anchor = document.querySelector('#query')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Register Fresh Query		______________________________________________________ 01
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#query')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Query Detail Page – Basic Query Information		______________________________________________________ 01
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#proposal')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Proposal	______________________________________________________ 01
                        </div>
                         <div      onClick={() => {
     const anchor = document.querySelector('#proposal')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Engagement Letter______________________________________________________ 01
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#proposal')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Query Detail Page – Proposal______________________________________________________ 01
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#assignment')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Assignments______________________________________________________ 01
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#assignment')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Query Detail Page – Assignments______________________________________________________ 01
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#payment')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Payment Status______________________________________________________ 01
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#message')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Inbox_____________________________________________________ 01
                        </div>
                        <div      onClick={() => {
     const anchor = document.querySelector('#feedback')
     anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }}
>
Feedback_____________________________________________________ 01
                        </div>
                 </CardContent>
             </CardActionArea>
         </Card>
     </Container>
        </>
    )
}
export default Content;