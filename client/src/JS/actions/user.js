import axios from "axios";
import { FAIL_USER, SUCCESS_USER, LOAD_USER, CURRENT_USER, LOGOUT_USER, CLEAR_ERRORS, SUCCESS_ADMIN, GET_USERS_SUCCESS, CURRENT_ADMIN, GET_USER_SUCCESS, } from "../constants/user";

//action to create account => signUp
export const inscription = (newUser, history) => async (dispatch) => {
    dispatch({ type: LOAD_USER });
    try {
        //sending http request to add user : send the new user and get response
        let {data} = await axios.post("/api/user/inscription", newUser);
        //if success 
        dispatch({ type: SUCCESS_USER, payload: data });
        //redirect the user to his profile
        history.push("/profile");
    } catch (error) {
        //fail to add user, payload will take the array of errors from backend 
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

//action to login => signIn
export const login = (user, history) => async (dispatch) => {
    //load to get the data
    dispatch({ type: LOAD_USER });
    try {
        //sending http request to get the user which will be stocked in: data
        let {data} = await axios.post("/api/user/login", user);
        
        //if is ADMIN
        if (data.user.role === "admin") {
            //success admin
            dispatch({ type: SUCCESS_ADMIN, payload: data });
            //redirect the admin to his profile
            history.push("/profile");
        } else {
            //if he is a user
            //success user
            dispatch({ type: SUCCESS_USER, payload: data });
            //redirect the user to his profile
            history.push("/profile");
        }

    } catch (error) {
        //fail to get user, payload will take the array of errors from backend 
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

//action to get the current user 
export const current = () => async (dispatch) => {
    //pass the token to the header of request
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    //load to get the data
    dispatch({ type: LOAD_USER });
    try {
        //sending http request to get the current user which will be stocked in: data
        let {data} = await axios.get("/api/user/current/user", config);
        //if is ADMIN then current admin
        if (data.user.role === "admin") {
            dispatch({ type: CURRENT_ADMIN, payload: data });
        } else {
            //else current user
            dispatch({ type: CURRENT_USER, payload: data });
        }
        
    } catch (error) {
        //fail to get current user, payload will take the array of errors from backend 
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

//action to logout
export const logout = () => {
    return { type: LOGOUT_USER } 
};

//action to clear errors of inscription and login 
export const clearErrors = () => {
    return { type: CLEAR_ERRORS }
};

//action to get the list of all users
export const getAllUsers = () => async (dispatch) => {
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    //load to get the data
    dispatch({ type: LOAD_USER });
    try {
        //sending http request to get the list of all users which will be stocked in: data
        let {data} = await axios.get("/api/user/",config);
        //success to get the data
        dispatch({ type: GET_USERS_SUCCESS, payload: data });
    } catch (error) {
        //fail to get the data, payload will take the array of errors from backend 
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

//action to return list of users by search with filter 
export const getUsersByFilter = arg => async (dispatch) => {
    //load to get the data
    dispatch({ type: LOAD_USER});
    try {
        //sending http request to get filtred users which will be stocked in: data
        let {data} = await axios.post("/api/user/search", arg);
        //success to get the data
        dispatch({ type: GET_USERS_SUCCESS, payload: data });
    } catch (error) {
        //fail to get the data, payload will take the array of errors from backend 
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

//action to return user by id 
export const getUserById = (id) => async (dispatch) => {
    //pass the token to the header of request
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    //load to get the data
    dispatch({ type: LOAD_USER});
    try {
        //sending http request to get the user which will be stocked in: data
        let {data} = await axios.get(`/api/user/user/${id}`, config);
        //success to get the data : payload take the data 
        dispatch({ type: GET_USER_SUCCESS, payload: data });
    } catch (error) {
        //fail to get the data, payload will take the array of errors from backend 
        dispatch({ type: FAIL_USER, payload: {} });
    }
};

//action to edit user by id
export const editUserById = (id, history, user) => async (dispatch) => {
    //pass the token to the header of request
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    try {
        //sending http request to update the user 
        await axios.put(`/api/user/${id}`, user, config);
        //refresh the list of all users with dispatching "getAllUsers"
        dispatch(getAllUsers());
        //redirect the user to his settings 
        history.push("/profile");
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

//action to delete user by ADMIN
//private 
export const deleteUser = (id) => async (dispatch) => {
    //pass the token to the header of request
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    try {
        //sending http request to delete user account : send the id of user and the token
        await axios.delete(`/api/user/${id}`, config);
        //refresh the list of all users with dispatching "getAllUsers"
        dispatch(getAllUsers());
        
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};

//action to delete all users by the admin
//private
export const deleteAllUsers = () => async (dispatch) => {
    //pass the token to the header of request
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    try {
        //sending http request to delete all the users : send the token 
        await axios.delete("/api/user/", config);
        
    } catch (error) {
        dispatch({ type: FAIL_USER, payload: error.response.data });
    }
};


