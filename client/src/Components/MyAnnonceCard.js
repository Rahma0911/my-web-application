import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteAnnonce, getAnnonceById } from '../JS/actions/annonces';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CommentsDelete } from '../JS/actions/comment';


export default function MyAnnonceCard({ annonce, key }) {
    
  //state of opening and closing the "MoreVertIcon"
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    //useDispatch to dispatch actions from the reducer to the back-end
    const dispatch = useDispatch();
    //useHistory to pass history in the the action wich needs authentication
    const history = useHistory();

    //Function to delete annonce and its comments
    const handleDelete = () => {
      //confirm window to confirm the delete action
        let result = window.confirm("Vous voulez vraiment supprimer cette annonce ?");
        if (result) {
          //dispatch 2 actions : delete the annonce and delete his comments
          dispatch(deleteAnnonce(annonce._id, history));
          dispatch(CommentsDelete(annonce._id));
          window.confirm("Vous avez supprimé cet annonce avec succés.");
        }
    }

    //Functions of "MoreVertIcon" from "material ui"
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    }
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
          return;
        }
    
        setOpen(false);
      };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        } else if (event.key === 'Escape') {
          setOpen(false);
        }
      }
    
      // return focus to the button when we transitioned from !open -> open
      const prevOpen = React.useRef(open);
      React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
          anchorRef.current.focus();
        }
    
        prevOpen.current = open;
      }, [open]);

  return (
    //the annonce's card of profile page from "material ui"
    //private
    //this card contains the Edit and Delete buttons : MoreVertIcon copied from "material ui" and past in the "action" of our "CardHeader"
    //link the card to details page to show details of that annonce
    <Card id={key} className="annonceList" sx={{ maxWidth: 220  }}>

        <CardHeader
        action = {
        <div>
          <IconButton
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true" 
          onClick={handleToggle}>
            <MoreVertIcon />
          </IconButton>
          <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={() => dispatch(getAnnonceById(annonce._id))}> 
                        <Link to = {`/editAnnonce/${annonce._id}`} >Modifier</Link> 
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>Supprimer</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </div>
        }

        title={annonce.title}
        subheader={annonce.date.slice(0, 10)}
        />

      <Link to = {{ pathname:"/details", state:{annonce} }}>

        <CardMedia
          component="img"
          height="130"
          image={annonce.imageUrl ? `uploads/${annonce.imageUrl[0]}` : "transporteur.jpg"}
          alt="transporteur"
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