import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { logout } from '../JS/actions/user';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SelectCategory from './SelectCategory';
import { grey, green } from '@mui/material/colors';


export default function Navbar({text, setText, category, setCategory}) {
  
  //submit => from material ui
  const SubmitButton = (props) => ( <button {...props} type='submit' />);
  
  //get isAuth from user reducer
  const isAuth = useSelector(state => state.userReducer.isAuth);

  //useDispatch to dispatch actions from redux to the back-end
  const dispatch = useDispatch();

  //fuction to dispatch action of logout
  const handleLogout = () => {
    dispatch(logout());
  }

  //function to set the text of search with the target value 
  const handleSearch = (e) => {
    setText(e.target.value);
  }
  
  
  return (
    //navbar from "material ui"
    //navbar takes text and setText to search annonce 
    <nav>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="nav">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              <Link to="/">
                <img src="logo-transporteur.jpg" alt="alo transporteur" className="logo" />
              </Link>
              
              
                <TextField
                size="small"
                className="search"
                style={{marginTop: "15px" }}
                type="search"
                name="search"
                placeholder='Chercher annonces...'
                value={text}
                onInput={handleSearch}
                InputProps={{
                endAdornment: (

                  <InputAdornment>
                  <IconButton component={SubmitButton}>
                    <Link to="/searchresult">
                    <SearchIcon sx={{ color: green[400] }}/>
                    </Link>
                  </IconButton>
                  </InputAdornment>

                  ) }}
                />

            </Typography>

            <Link to="/searchresult">
              <SelectCategory category={category} setCategory={setCategory} />
            </Link>
            
            <Button variant="outlined" sx={{ bgcolor: green[100] }}> 
              <AddCircleOutlineIcon sx={{ color: green[800] }}/>
              <Link to="/ajouterAnnonce">Ajouter une annonce</Link>
            </Button>

            <Button><Link to="/annonces">Accueil</Link></Button>

            <Button><Link to="/contact">Contacte</Link></Button>

            {isAuth ? <Button onClick={handleLogout}> <Link to="/login">LOGOUT</Link> </Button>
            : <Button> <Link to="/login">LOGIN</Link> </Button>
            }

            <Link to="/profile"><AccountCircleIcon sx={{ color: grey[900] }}/></Link>

          </Toolbar>
        </AppBar>
      </Box>
    </nav>
  );
}