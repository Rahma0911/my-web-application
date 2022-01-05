import { GET_COMMENT, GET_COMMENT_FAIL, GET_COMMENT_LOAD, GET_COMMENT_SUCCESS } from "../constants/comment";


const initialState = {
    comments: [],
    comment: {},
    isLoad: false,
    errors: null,
    isError: false,
};

const commentReducer = (state=initialState, {type, payload}) => {
    switch (type) {
        case GET_COMMENT_SUCCESS: 
            //if success keep our state 
            //comments will take the list of comments from backend 
            //and stop loading 
            return {...state, comments: payload.comments, isLoad: false};
        case GET_COMMENT: 
            //if success keep our state 
            //comment will take the comment from backend 
            //and stop loading 
            return {...state, comment: payload.comment, isLoad: false};
        case GET_COMMENT_LOAD: 
            //if load keep our state and start loading
            return {...state, isLoad: true};
        case GET_COMMENT_FAIL: 
            //if fail keep our state 
            //stop loading
            //and isError will take true 
            return {...state, isLoad: false, isError: true, errors: payload.errors};
        default:
            return state;
    }
};


export default commentReducer;