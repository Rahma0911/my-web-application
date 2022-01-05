import React from 'react';
import { Button } from '@mui/material';
import { red } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { deleteAllAnnonces, deleteUserAnnonces } from '../JS/actions/annonces';
import { deleteAllComments, deleteUserComments } from '../JS/actions/comment';
import { deleteAllUsers, deleteUser, getUserById, logout } from '../JS/actions/user';
import { useDispatch } from 'react-redux';

const Settings = ({location:{state}}) => {

    const isAdmin = useSelector(state => state.userReducer.isAdmin);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = () => {
        let result = window.confirm("Vous voulez vraiment supprimer votre compte ?");
        if (result) {
            dispatch(deleteUser(state.user._id, history));
            dispatch(deleteUserAnnonces(state.user._id, history));
            dispatch(deleteUserComments(state.user._id, history));
            window.confirm("Vous avez supprimé votre compte avec succés.");
            dispatch(logout());
        }
    }

    const handleDeleteAnnonces = () => {
        let result = window.confirm("Vous voulez vraiment supprimer tous les annonces ?");
        if (result) {
            dispatch(deleteAllAnnonces(history));
            dispatch(deleteAllComments(history));
            window.confirm("Vous avez supprimé tous les annonces avec succés.");
        }
    }

    const handleDeleteUsers = () => {
        let result = window.confirm("Suppression tous les utilisateurs ?");
        if (result) {
            dispatch(deleteAllUsers(history));
            dispatch(deleteAllAnnonces(history));
            dispatch(deleteAllComments(history));
            window.confirm("Suppression tous les comptes d'utilisateurs avec succés.");
        }
    }

    return (
        <div className='settings'>
            <Paper elevation={2}>
            <h4>Mon compte</h4>

            <div className='setting'>
                <div>Nom: </div>
                <div>{state.user.name}</div>
            </div>

            <div className='setting'>
                <div>E-mail: </div>
                <div>{state.user.email}</div>
            </div>

            {state.user.phone &&
            <div className='setting'>
                <div>Téléphone: </div>
                <div>{state.user.phone}</div>
            </div>
            }
            <Button onClick={handleDelete} sx={{ color: red[800] }}>Supprimer mon compte.</Button> <br/>

            <Button onClick={() => dispatch(getUserById(history, state.user._id))} >
                <Link to = {`/editUser/${state.user._id}`} >Modifier mon compte.</Link>
            </Button>
            </Paper>
            
            {isAdmin && ( <Paper elevation={2} className='admin'>
                <h4>Administration </h4>
                <Link to="/annonces"><Button>Voir tous les annonces.</Button></Link> <br/>
                <Link to="/utilisateurs"><Button>Voir tous les comptes.</Button></Link> <br/>
                <Button onClick={handleDeleteAnnonces} sx={{ color: red[800] }}>Supprimer tous les annonces.</Button> <br/>
                <Button onClick={handleDeleteUsers} sx={{ color: red[800] }}>Supprimer tous les comptes d'utilisateurs.</Button>
                </Paper>
            )}
        </div>
    )
}

export default Settings;
