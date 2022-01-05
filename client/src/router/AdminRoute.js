import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AdminRoute = ({component: Component, ...rest}) => {

    //get the token from localStorage 
    const token = localStorage.getItem("token");
    //get isAuth from user reducer
    const isAuth = useSelector(state => state.userReducer.isAuth);
    //get isAdmin from user reducer
    const isAdmin = useSelector(state => state.userReducer.isAdmin);

    //if the token not valid and is not authenticate and is not Admin redirect the user to login
    if (!token && !isAuth && !isAdmin) {
        return <Redirect to = "/login"/>;
    } else {
        //else pass
        return <Route {...rest} component={Component}/>;
    }
    
}

export default AdminRoute;