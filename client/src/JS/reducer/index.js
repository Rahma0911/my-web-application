import {combineReducers} from 'redux';
import annonceReducer from './annonces';
import userReducer from './user';
import commentReducer from './comment';

//combine all reducers in the rootReducer : userReducer, annonceReducer and commentReducer.
const rootReducer = combineReducers({userReducer, annonceReducer, commentReducer});

export default rootReducer;