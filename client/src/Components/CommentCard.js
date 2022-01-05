import React from 'react';
import { Avatar, Card, CardHeader, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { green } from '@mui/material/colors';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { deleteComment, getCommentById } from '../JS/actions/comment';


const CommentCard = ({comment, key}) => {

    //get the user, isAuth and isAdmin from user reducer
    const user = useSelector(state => state.userReducer.user);
    const isAuth = useSelector(state => state.userReducer.isAuth);
    const isAdmin = useSelector(state => state.userReducer.isAdmin);
    //get the token from localStorage
    const token = localStorage.getItem("token");

    //useDispatch to dispatch actions from redux to the back-end
    const dispatch = useDispatch();
    //useHistory to pass history in the the action wich needs authentication
    const history = useHistory();

    //state of opening and closing the "MoreVertIcon"
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    //Function to delete comment 
    const handleDelete = () => {
       //confirm window to confirm the delete action
        let result = window.confirm("Vous voulez vraiment supprimer cet commentaire ?");
        if (result) {
          //dispatch the actions of deleting the comment by annonce _id
            dispatch(deleteComment(comment._id, comment.id_annonce._id, history));
            window.confirm("Vous avez supprimé cet commentaire avec succés.");
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
        //the comment's card from "material ui"
        //this card contains the Edit and Delete buttons : MoreVertIcon copied from "material ui" and past in the "action" of our "CardHeader"
        (<Card id={key} sx={{ maxWidth: 800 }} >
          {//if is ADMIN show close icon to delete comment
          (token && isAuth && isAdmin) ? 
          (<IconButton onClick={handleDelete}> <CloseIcon /> </IconButton>)
          : null
          }
            <CardHeader
            avatar={
            <Avatar sx={{ bgcolor: green[300] }} aria-label="user">
                    {comment.id_user.name.charAt(0)}
            </Avatar>
            }
            action={//if the user who create the comment show the Edit and Delete buttons
                (isAuth && token && comment.id_user._id === user._id) ? 
            (<div>
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
                          <MenuItem onClick={() => dispatch(getCommentById(comment._id))}> 
                            Modifier
                          </MenuItem>
                          <MenuItem onClick={handleDelete}>Supprimer</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              </div>) 
              : null
            }
            title={comment.id_user.name}
            subheader={comment.date.slice(0, 10)}
            />
            <p>{comment.content}</p>
        </Card>)
    )
}

export default CommentCard;
