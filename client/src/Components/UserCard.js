import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import { Avatar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../JS/actions/user';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import { deleteUserAnnonces } from '../JS/actions/annonces';
import { deleteUserComments } from '../JS/actions/comment';


export default function UserCard({ user, key }) {

    //useHistory to pass history in the the action wich needs authentication
    const history = useHistory();
    //useDispatch to dispatch actions from redux to the back-end
    const dispatch = useDispatch();

    //function to delete user by the admin 
    const handleDelete = () => {
      //confirm window to confirm the delete action
        let result = window.confirm("Vous voulez vraiment supprimer cet utilisateur ?");
        if (result) {
          //dispatch 3 actions : delete the user, delete his annonces and delete his comments
            dispatch(deleteUser(user._id, history));
            dispatch(deleteUserAnnonces(user._id, history));
            dispatch(deleteUserComments(user._id, history));
            window.confirm("Vous avez supprimé ce compte d'utilisateur avec succés.");
        }
    }

  return (
    //the user's card of users list page from "material ui"
    //private
    //this card contains the Delete button to delete user account : CloseIcon from "material ui"
    <Card id={key} className="userList" sx={{ maxWidth: 200 }}>
        <IconButton onClick={handleDelete}> <CloseIcon /> </IconButton>
      <CardHeader
        avatar={
            <Avatar sx={{ bgcolor: green[300] }} aria-label="user">
                {user.name.charAt(0)}
            </Avatar>
            }
        title={user.name}
        subheader={user.email}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <div> <PhoneIcon/> {user.phone}</div>
          <div> <PersonIcon/> {user.role}</div>
        </Typography>
      </CardContent>

    </Card>
  );
}