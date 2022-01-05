import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { getAllUsers, getUsersByFilter } from '../JS/actions/user';
import UserCard from '../Components/UserCard';
import { useHistory } from 'react-router-dom';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { green } from '@mui/material/colors';

const UserList = () => {

    const SubmitButton = (props) => ( <button {...props} type='submit' />);
    //state text of searching users
    const [text, setText] = useState("");

    const users = useSelector(state => state.userReducer.users);
    const isLoad = useSelector(state => state.userReducer.isLoad);
    const isError = useSelector(state => state.userReducer.isError);

    const dispatch = useDispatch();
    const history = useHistory();

    //function to set the text of search with the target value 
    const handleSearch = (e) => {
    setText(e.target.value);
    }

    useEffect(() => {
        dispatch(getAllUsers(history));
    }, [dispatch, history]);

    useEffect(() => {
        dispatch(getUsersByFilter({ type: "text", query: text }));
        if (!text) {
            dispatch(getAllUsers());
        }
    }, [dispatch, text]);
    return (
        <div>
        <div className="searchUser">
                <TextField 
                id="standard-basic" 
                name="searchUser"
                type="search"
                placeholder='Chercher utilisateurs...'
                value={text}
                onInput={handleSearch}
                variant="standard" 
                InputProps={{
                endAdornment: (
                <InputAdornment>
                <IconButton 
                component={SubmitButton}
                >
                <SearchIcon sx={{ color: green[400] }}/>
                </IconButton>
                </InputAdornment>
                ) }}
                />
        </div>
        <div>
            {
            isLoad? (<Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                        <CircularProgress color="success" className="spinner" />
                    </Stack>) 
            : isError? (<p>Désolé ! Erreur d'obtenir les utilisateurs.</p>) 
            : !users.length? (<p>Pas d'utilisateur à afficher !</p>) 
            : (
                <div className='annonceList'>
                {users.map(el => <UserCard user={el} key={el._id}/>)}
                </div>
                )
            }
        </div>
    </div>
    )
}

export default UserList;
