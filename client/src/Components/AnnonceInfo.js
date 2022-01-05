import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { Avatar, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, editCommentById, getAllComments } from '../JS/actions/comment';
import CommentCard from './CommentCard';
import { green } from '@mui/material/colors';

const AnnonceInfo = ({annonce}) => {

    const SubmitButton = (props) => ( <button {...props} type='submit' />);

    //state to set a comment
    const [comment, setComment] = useState({content:""});

    //state to get comment to edit it a
    const toUpdate = useSelector(state => state.commentReducer.comment[0]);

    const [edit, setEdit] = useState(false);

    //get the array of comments, isLoad and isError from comment reducer
    const comments = useSelector(state => state.commentReducer.comments);
    const isLoad = useSelector(state => state.commentReducer.isLoad);
    const isError = useSelector(state => state.commentReducer.isError);
    //get isAuth from user reducer
    const isAuth = useSelector(state => state.userReducer.isAuth);

    //useDispatch to dispatch actions from redux to the back-end
    const dispatch = useDispatch();

    //useEffect to dispatch action to get all Comments of a specific annonce
    useEffect(() => {
        dispatch(getAllComments(annonce._id));
    }, [dispatch, annonce._id]);

    //function to set comment with the target value
    const handleChange = (e) => {
        setComment({...comment, [e.target.name]: e.target.value});
    }

    //useHistory to pass history in the the action wich needs authentication
    const history = useHistory();

    //if edit set comment by the comment from reducer 
    useEffect(() => {
        if (toUpdate) {
            setEdit(true);
            setComment(toUpdate);
        } else {
            setComment({content:""});
            setEdit(false);
        }

    }, [edit, toUpdate])

    //function to dispatch the action of adding comment
    const handleComment = (e) => {
        e.preventDefault();
        if (edit) {
            dispatch(editCommentById(comment._id, comment, history));
            //set comment with initial state
            setComment({content:""});
            window.alert("Votre commentaire a été modifié avec succés.")
        } else {
            dispatch(addComment(annonce._id, comment, history));
            //set comment with initial state
            setComment({content:""});
        }
        
    }

    return (
        <div className='annonce_info'>

            <Typography component="div" variant="h5" className='title'>
                {annonce.title}
            </Typography>

            <p><LocationOnIcon color='disabled' fontSize='small'/> {annonce.address}</p>
            {annonce.destination && 
            <p><LocationOnIcon color='disabled' fontSize='small'/> Destination : {annonce.destination}</p>}
            <p>{annonce.date.slice(0, 10)} </p>
            
            <h4 className='title'>Description</h4>
            <p className='description'>{annonce.description}</p>

            <div className='user'>
                <Avatar sx={{ bgcolor: green[300] }} aria-label="user">
                    {annonce.id_user.name.charAt(0)}
                </Avatar>
                <h4>{annonce.id_user.name}</h4>
            </div>

            <p><PhoneIcon color='disabled' fontSize='small'/> {annonce.id_user.phone}</p>
            {annonce.vehicle.length ? (<div> <h4 className='title'>Moyen(s) de transport: </h4> 
                <p>{annonce.vehicle.map((el) => el+" ")}</p> </div>)
            : null}

            <div className='comment'>
            {
                isLoad? (<Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                            <CircularProgress color="success" className="spinner" />
                        </Stack>) 
                : isError? (<p>Désolé ! Erreur d'obtenir les commentaires.</p>) 
                : !comments.length? (<p>Pas de commentaire à afficher.</p>) 
                : (
                    <div>
                    {comments.map(el => <CommentCard comment={el} key={el._id} />)}
                    </div>
                    )
            }
            </div>
            {isAuth && (
                <div className='comment'>
                <TextField 
                id="standard-basic" 
                name="content"
                value={comment.content}
                placeholder="Ecrire un commentaire" 
                variant="standard" 
                
                onInput={handleChange}
                fullWidth />

                <Button 
                variant="contained" 
                size="small" 
                component={SubmitButton}
                onClick={handleComment}> 
                    {edit ? "Modifier" : "Commenter"} 
                </Button>
            </div>
            )}

        </div>
    )
}

export default AnnonceInfo;
