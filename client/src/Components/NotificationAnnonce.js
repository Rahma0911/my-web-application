import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { clearErrors } from '../JS/actions/annonces';

const NotificationAnnonce = ({error}) => {

    const [show, setShow] = useState(true);
    //useDispatch to dispatch actions from redux to the back-end
    const dispatch = useDispatch();

    //useEffect to dispatch clear errors of adding annonce
    useEffect(() => {
        setTimeout( () => {
            setShow(false);
            dispatch(clearErrors());
        }, 4000 );
    }, [show, dispatch]);

    return (
        //component to show annonce errors notification from react-toastify
        <div>
            {show && (<div>
                {toast.error(error.msg)}
                <ToastContainer />
                </div>)}
        </div>
    )
}

export default NotificationAnnonce;