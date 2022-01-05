import {GET_ANNONCES_SUCCESS, GET_ANNONCES_LOAD, GET_ANNONCES_FAIL, GET_ANNONCE_SUCCESS, CLEAR_ERRORS} from '../constants/annonces';

const initialState = {
    annonces: [],
    annonce: {},
    errors: null,
    isLoad: false,
    isError: false,
};

const annonceReducer = (state=initialState, {type, payload}) => {
    switch (type) {
        case GET_ANNONCES_SUCCESS: 
            //if success keep our state 
            //annonces will take the list of annonces from backend 
            //and stop loading 
            return {...state, annonces: payload.annonces, isLoad: false};
        case GET_ANNONCES_LOAD: 
            //if load keep our state and start loading
            return {...state, isLoad: true};
        case GET_ANNONCES_FAIL: 
            //if fail keep our state 
            //stop loading
            //errors will take errors from backend
            //and isError will take true 
            return {...state, isLoad: false, isError: true, errors: payload.errors};
        case GET_ANNONCE_SUCCESS: 
            //if success keep our state 
            //annonce will take the annonce from backend 
            //and stop loading 
            return {...state, annonce: payload.annonce, isLoad: false, isError: false};
        case CLEAR_ERRORS:
            //clear errors of add annonce
            return {...state, errors: null};
        default:
            return state;
    }
};

export default annonceReducer;
