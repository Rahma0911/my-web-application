import axios from "axios";
import { GET_COMMENT, GET_COMMENT_FAIL, GET_COMMENT_LOAD, GET_COMMENT_SUCCESS } from "../constants/comment";

//action to return list of all comments 
export const getAllComments = (idAnnonce) => async (dispatch) => {
    //load to get the data
    dispatch({ type: GET_COMMENT_LOAD });
    try {
        //sending http request to get the list of all comments of annonce which will be stocked in: data
        let {data} = await axios.get(`/api/comment/${idAnnonce}`);
        //success to get the data
        dispatch({ type: GET_COMMENT_SUCCESS, payload: data });
    } catch (error) {
        //fail to get the data, payload will take the array of errors from backend 
        dispatch({ type: GET_COMMENT_FAIL, payload: error.response.data });
    }
};

//action to add comment 
//private 
export const addComment = (id, newComment) => async (dispatch) => {
    //pass the token to the header of request
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    try {
        //sending http request to post comment : send the new comment and the token 
        await axios.post(`/api/comment/newcomment/${id}`, newComment, config);
        //refresh the list of all comments with dispatching "getAllComments"
        dispatch(getAllComments(id));
    } catch (error) {
        dispatch({ type: GET_COMMENT_FAIL, payload: error.response.data });
    }
};

//action to delete comment by id
//private 
export const deleteComment = (id, idAnnonce) => async (dispatch) => {
    //pass the token to the header of request
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    try {
        //sending http request to delete comment : send the id of comment and the token 
        await axios.delete(`/api/comment/${id}`, config);
        //refresh the list of all comments with dispatching "getAllComments"
        dispatch(getAllComments(idAnnonce));
    } catch (error) {
        dispatch({ type: GET_COMMENT_FAIL, payload: error.response.data });
    }
};

//action to return comment by id 
export const getCommentById = (id) => async (dispatch) => {
    //load to get the data
    dispatch({ type: GET_COMMENT_LOAD});
    try {
        //sending http request to get the comment which will be stocked in: data
        let {data} = await axios.get(`/api/comment/comment/${id}`);
        //success to get the data : payload takes the data 
        dispatch({ type: GET_COMMENT, payload: data });
    } catch (error) {
        //fail to get the data, payload will take the array of errors from backend 
        dispatch({ type: GET_COMMENT_FAIL, payload: error.response.data });
    }
};

//action to edit comment by id
export const editCommentById = (id, comment) => async (dispatch) => {
    //pass the token to the header of request
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    try {
        //sending http request to update the comment 
        await axios.put(`/api/comment/${id}`, comment, config);
        //refresh the list of all comments with dispatching "getAllComments"
        dispatch(getAllComments());
    } catch (error) {
        dispatch({ type: GET_COMMENT_FAIL, payload: error.response.data });
    }
};

//action to delete all comments by annonce _id
export const CommentsDelete = (idAnnonce) => async (dispatch) => {
    try {
        //sending http request to delete all the comments
        await axios.delete(`/api/comment/comments/${idAnnonce}`);
    } catch (error) {
        dispatch({ type: GET_COMMENT_FAIL, payload: error.response.data });
    }
};

//action to delete all comments by the admin
export const deleteAllComments = () => async (dispatch) => {
    //pass the token to the header of request
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    try {
        //sending http request to delete all the comments : send the token 
        await axios.delete("/api/comment/", config);
        
    } catch (error) {
        dispatch({ type: GET_COMMENT_FAIL, payload: error.response.data });
    }
};

//action to delete user's comments by the admin
export const deleteUserComments = (id_user) => async (dispatch) => {
    //pass the token to the header of request
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    try {
        //sending http request to delete all the comments of a specific user : send the id of the user and the token 
        await axios.delete(`/api/comment/user/${id_user}`, config);
        
    } catch (error) {
        dispatch({ type: GET_COMMENT_FAIL, payload: error.response.data });
    }
};