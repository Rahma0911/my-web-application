import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Typography from '@mui/material/Typography';
import { Link, useHistory } from 'react-router-dom';
import { deleteAnnonce } from '../JS/actions/annonces';
import { useDispatch } from 'react-redux';
import { CommentsDelete } from '../JS/actions/comment';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

export default function AnnonceCard({ annonce, key }) {

  //get isAuth and isAdmin from user reducer
  const isAuth = useSelector(state => state.userReducer.isAuth);
  const isAdmin = useSelector(state => state.userReducer.isAdmin);
  //get the token from localStorage 
  const token = localStorage.getItem("token");

  //useHistory to pass history in the the action wich needs authentication
  const history = useHistory();
  //useDispatch to dispatch actions from redux to the back-end
  const dispatch = useDispatch();

  //Function to delete annonce and its comments
  const handleDelete = () => {
    //confirm window to confirm the delete action
    let result = window.confirm("Vous voulez vraiment supprimer cette annonce ?");
    if (result) {
      //dispatch 2 actions : delete the annonce and delete his comments
      dispatch(deleteAnnonce(annonce._id, history));
      dispatch(CommentsDelete(annonce._id));
      window.confirm("Vous avez supprimé cette annonce avec succés.");
    }
  }

  return (
    //the annonce's card from "material ui"
    //link the card to details page to show details of that annonce
    <Card id={key} className="annonceList" sx={{ maxWidth: 220 }}>
        {//if is ADMIN show close icon to delete that annonce and its comments
        (token && isAuth && isAdmin) ? 
          (<IconButton onClick={handleDelete}> <CloseIcon /> </IconButton>)
          : null
        }
        
      <Link to = {{ pathname:"/details",  state:{annonce} }}>
      <CardHeader
        title={annonce.title}
        subheader={annonce.date.slice(0, 10)}
      />

      <CardMedia
        component="img"
        height="130"
        image={annonce.imageUrl ? `uploads/${annonce.imageUrl[0]}` : "transporteur.jpg"}
        alt="transporteurs"
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <h5><LocationOnIcon color='disabled' fontSize='small'/>{annonce.address}</h5>
          {annonce.description.slice(0, 12)} ...

          <Link to = {{ pathname:"/details", state:{annonce} }} color="secondary">Voir</Link>

        </Typography>

      </CardContent>

      </Link>

    </Card>
  );
}