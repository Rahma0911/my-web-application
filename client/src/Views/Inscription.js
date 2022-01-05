import React, { useEffect } from 'react';
import { Avatar, Grid, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {editUserById, inscription} from '../JS/actions/user';
import { useHistory, useParams } from 'react-router-dom';
import Notification from '../Components/Notification';

const Inscription = () => {
  
  const [user, setUser] = useState( { name:"", email:"", password:"", phone:0, } );

  const editUser = useSelector(state => state.userReducer.user);
  const [edit, setEdit] = useState(false);
  
  const handleUser = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const errors = useSelector(state => state.userReducer.errors);

  const history = useHistory();
  const dispatch = useDispatch();

  const params = useParams();
  useEffect(() => {
      if (params.id) {
          setEdit(true);
          editUser.password = "";
      } else {
          setEdit(false);
      }
      edit ? setUser(editUser) 
      : setUser({ name:"", email:"", password:"", phone:0, });
  }, [edit, editUser, params])

  const handleInscription = (e) => {
    e.preventDefault();
    if (edit) {
      dispatch(editUserById(params.id, history, user));
      setUser({ name:"", email:"", password:"", phone:0, });
      window.alert("Votre compte a été modifié avec succés.")
    } else {
      dispatch(inscription(user, history));
      setUser({ name:"", email:"", password:"", phone:0, });
    }
    
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
            <Avatar className="avatar" />
            <h2>{edit ? "Modifier mon compte" : "S'inscrire"}</h2>
            <form className="sign">
            <TextField
            required
            name="name"
            id="outlined-required"
            label="Nom"
            placeholder="Entrez votre nom"
            onInput={handleUser}
            value={user.name}
            />
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
            <TextField
            name="phone"
            id="outlined-number"
            label="Téléphone"
            type="number"
            
            onInput={handleUser}
            value={user.phone}
            />
            <div className="sign">
            <Button type="submit" variant="contained" fullWidth 
              onClick={handleInscription}>{edit ? "Modifier" : "S'inscrire"}</Button>
            </div>
            </form>
        </div>
        </Box>
    </Paper>
    </Grid>
    <div className='login_img'> 
      <h1>Bienvenu chez Alo Transporteur, inscrivez-vous et profitez beaucoups d'annonces!</h1>
    </div>
    </div>
  );
}

export default Inscription;