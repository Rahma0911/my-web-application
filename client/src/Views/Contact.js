import React from 'react';
import { Avatar, Grid, Paper } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Contact = () => {
    return (
        <div  className="contact">
            <h1 className="ctct">Contacter RAHMA ISMAIL</h1>
            <div>
                <Grid align="center">
                <Paper elevation={5} className="paper">
                    <Avatar className="avatar"><EmailIcon/></Avatar>
                    <p>rahmaismail1608@gmail.com</p>
                </Paper>
                </Grid>
                    
                <Grid align="center">
                <Paper elevation={5} className="paper">
                    <Avatar className="avatar"><LocalPhoneIcon/></Avatar>
                    <p>+216 52 908 671</p>
                </Paper>
                </Grid>
            </div>
        </div>
    )
}

export default Contact;
