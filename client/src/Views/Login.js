import React from 'react';
import { Avatar, Grid, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {login} from '../JS/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Notification from '../Components/Notification';

const Login = () => {

    const [user, setUser] = useState( { email:"", password:"",} );

    const handleUser = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const errors = useSelector(state => state.userReducer.errors);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(user, history));
        setUser({ email:"", password:"",});
    }

    return (
        <div className='login'>
            
            { errors && errors.map( (el) => <Notification error={el} /> ) }

            <Grid>
                <Paper elevation={5} className="paper_login">
                    <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '32ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    
                    <div align="center">
                        <Avatar className="avatar"> <LockIcon/> </Avatar>
                        <h2>Login</h2>
                        <form className="sign">
                        <TextField
                        required
                        name="email"
                        id="outlined-email-input"
                        label="Email"
                        type="email"
                        onInput={handleUser}
                        value={user.email}
                        />
                        <TextField
                        required
                        name="password"
                        id="outlined-password-input"
                        label="Mot de passe"
                        type="password"
                        InputProps={{ minLength: 6 }}
                        autoComplete="current-password"
                        onInput={handleUser}
                        value={user.password}
                        />
                        <div className="sign">
                        <Button type="submit" variant="contained" fullWidth onClick={handleLogin}>
                            Se connecter</Button>
                        </div>
                        <div className="sign">
                        <Button variant="outlined" color="primary" fullWidth> 
                            <Link to="/inscription"> Créer nouveau compte </Link> </Button>
                        </div>
                        </form>
                    </div>
                    </Box>
                    </Paper>
                </Grid>
                <div className='login_img'> 
                    <h1>Bienvenu cher client, tapez votre login et profitez beaucoups d'annonces!</h1>
                </div>
            </div>
    )
};

export default Login;
