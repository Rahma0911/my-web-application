import axios from "axios";
import {GET_ANNONCES_SUCCESS, GET_ANNONCES_LOAD, GET_ANNONCES_FAIL, 
    GET_ANNONCE_SUCCESS,
    CLEAR_ERRORS} from "../constants/annonces"

//action to return list of all annonces 
export const getAllAnnonces = () => async (dispatch) => {
    //load to get the data
    dispatch({ type: GET_ANNONCES_LOAD });
    try {
        //sending http request to get the list of all Annonces which will be stocked in: data
        let {data} = await axios.get("/api/annonce/annoncespop");
        //success to get the data
        dispatch({ type: GET_ANNONCES_SUCCESS, payload: data });
    } catch (error) {
        //fail to get the data, payload will take the array of errors from backend 
        dispatch({ type: GET_ANNONCES_FAIL, payload: error.response.data });
    }
};

//action to return list of my annonces in my profile 
export const getMyAnnonces = () => async (dispatch) => {
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    //load to get the data
    dispatch({ type: GET_ANNONCES_LOAD });
    try {
        //sending http request to get my Annonces which will be stocked in: data
        let {data} = await axios.get("/api/annonce/myannonces", config);
        //success to get the data
        dispatch({ type: GET_ANNONCES_SUCCESS, payload: data });
    } catch (error) {
        //fail to get the data, payload will take the array of errors from backend 
        dispatch({ type: GET_ANNONCES_FAIL, payload: error.response.data });
    }
};

//action to return list of annonces by search with filter 
export const getAnnoncesByFilter = arg => async (dispatch) => {
    //load to get the data
    dispatch({ type: GET_ANNONCES_LOAD });
    try {
        //sending http request to get filtred Annonces which will be stocked in: data
        let {data} = await axios.post("/api/annonce/search", arg);
        //success to get the data
        dispatch({ type: GET_ANNONCES_SUCCESS, payload: data });
    } catch (error) {
        //fail to get the data, payload will take the array of errors from backend 
        dispatch({ type: GET_ANNONCES_FAIL, payload: error.response.data });
    }
};

//action to add annonce 
//private 
export const addAnnonce = (newAnnonce, history) => async (dispatch) => {
    //pass the token to the header of request
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    try {
        //sending http request to post Annonce : send the new annonce and the token 
        await axios.post("/api/annonce/newannonce", newAnnonce, config);
        //refresh the list of all annonces with dispatching "getAllAnnonces"
        dispatch(getMyAnnonces());
        //redirect the user to his profile 
        history.push("/profile");
    } catch (error) {
        //fail to post annonce, payload will take the array of errors from backend 
        dispatch({ type: GET_ANNONCES_FAIL, payload: error.response.data });
    }
};

//action to delete annonce by id
//private 
export const deleteAnnonce = (id) => async (dispatch) => {
    //pass the token to the header of request
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    try {
        //sending http request to delete Annonce : send the id of annonce and the token 
        await axios.delete(`/api/annonce/${id}`, config);
        //refresh the list of all annonces with dispatching "getAllAnnonces"
        dispatch(getMyAnnonces());
        
    } catch (error) {
        dispatch({ type: GET_ANNONCES_FAIL, payload: error.response.data });
    }
};

//action to return annonce by id 
export const getAnnonceById = (id) => async (dispatch) => {
    //load to get the data
    dispatch({ type: GET_ANNONCES_LOAD });
    try {
        //sending http request to get the annonce which will be stocked in: data
        let {data} = await axios.get(`/api/annonce/annonce/${id}`);
        //success to get the data : payload take the data 
        dispatch({ type: GET_ANNONCE_SUCCESS, payload: data });
    } catch (error) {
        //fail to get the data, payload will take the array of errors from backend 
        dispatch({ type: GET_ANNONCES_FAIL, payload: error.response.data });
    }
};

//action to edit annonce by id
export const editAnnonceById = (id, history, annonce) => async (dispatch) => {
    //pass the token to the header of request
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    try {
        //sending http request to update the annonce 
        await axios.put(`/api/annonce/${id}`, annonce, config);
        //refresh the list of all annonces with dispatching "getAllAnnonces"
        dispatch(getMyAnnonces());
        //redirect the user to his profile 
        history.push("/profile");
    } catch (error) {
        dispatch({ type: GET_ANNONCES_FAIL, payload: error.response.data });
    }
};

//action to delete all annonces by the admin
export const deleteAllAnnonces = () => async (dispatch) => {
    //pass the token to the header of request
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    try {
        //sending http request to delete all the Annonces : send the token 
        await axios.delete("/api/annonce/", config);
        
    } catch (error) {
        dispatch({ type: GET_ANNONCES_FAIL, payload: error.response.data });
    }
};

//action to delete user's annonces by the admin
export const deleteUserAnnonces = (id_user) => async (dispatch) => {
    //pass the token to the header of request
    const config = {
        headers: {
            authorization: localStorage.getItem("token"),
        },
    };
    try {
        //sending http request to delete all the Annonces of a specific user : send the id of the user and the token 
        await axios.delete(`/api/annonce/user/${id_user}`, config);
        
    } catch (error) {
        dispatch({ type: GET_ANNONCES_FAIL, payload: error.response.data });
    }
};

//action to clear errors of add annonce
export const clearErrors = () => {
    return { type: CLEAR_ERRORS }
};