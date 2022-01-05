import { CLEAR_ERRORS, CURRENT_USER, CURRENT_ADMIN, FAIL_USER, GET_USERS_SUCCESS, LOAD_USER, LOGOUT_USER,
    SUCCESS_ADMIN, SUCCESS_USER, GET_USER_SUCCESS } from "../constants/user";

const initialState = {
    user: null,
    users: [],
    errors: null,
    isLoad: false,
    isAuth: false,
    isAdmin: false,
};

const userReducer = (state=initialState, {type, payload}) => {
    switch (type) {
        case LOAD_USER:
            //if load keep our state and start loading
            return {...state, isLoad: true};
        case SUCCESS_USER:
            //if success to get the user give him the token
            //keep our state
            //user will take the user from backend 
            //isAuth will take true
            //and stop loading 
            localStorage.setItem("token", payload.token);
            return {...state, isLoad: false, user: payload.user, isAuth: true};
        case SUCCESS_ADMIN: 
            //if success to get the admin give him the token
            //keep our state
            //user will take the admin from backend 
            //isAuth will take true
            //isAdmin will take true
            //and stop loading 
            localStorage.setItem("token", payload.token);
            return {...state, isLoad: false, user: payload.user, isAuth: true, isAdmin: true};
        case FAIL_USER:
            //if fail keep our state 
            //stop loading
            //and errors will take errors from backend
            return {...state, isLoad: false, errors: payload.errors};
        case CURRENT_USER:
            //if success to get current user keep our state
            //user will take the user from backend 
            //isAuth will take true
            //and stop loading
            return {...state, isLoad: false, user: payload.user, isAuth: true};
        case CURRENT_ADMIN:
            //if success to get current admin keep our state
            //user will take the admin from backend 
            //isAuth will take true
            //isAdmin will take true
            //and stop loading
            return {...state, isLoad: false, user: payload.user, isAuth: true, isAdmin: true};
        case LOGOUT_USER:
            //if logout remove the token and initialise our state
            localStorage.removeItem("token");
            return { 
                user: null,
                users: [],
                errors: null,
                isLoad: false,
                isAuth: false,
                isAdmin: false,
            };
        case GET_USERS_SUCCESS: 
            //if success to get users keep our state 
            //users will take the list of users from backend 
            //and stop loading 
            return {...state, users: payload.users, isLoad: false};
        case GET_USER_SUCCESS: 
            //if success to get user keep our state 
            //users will take the list of user from backend 
            //and stop loading 
            return {...state, user: payload.user, isLoad: false};
        case CLEAR_ERRORS:
            //clear errors of user
            return {...state, errors: null};
        default:
            return state;
    }
};

export default userReducer;