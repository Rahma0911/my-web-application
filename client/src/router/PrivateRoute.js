import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    
    //get the token from localStorage 
    const token = localStorage.getItem("token");
    //get isAuth from user reducer
    const isAuth = useSelector(state => state.userReducer.isAuth);

    //if the token not valid and is not authenticate redirect the user to login
    if (!token && !isAuth) {
        return <Redirect to = "/login"/>;
    } else {
        //else pass
        return <Route {...rest} component={Component}/>;
    }
    
}

export default PrivateRoute;
