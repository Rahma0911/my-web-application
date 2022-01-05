import React from 'react';
import MyAnnonceCard from '../Components/MyAnnonceCard';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyAnnonces} from '../JS/actions/annonces';
import { useHistory } from 'react-router';

const MyAnnonces = () => {

    const annonces = useSelector(state => state.annonceReducer.annonces);
    const isLoad = useSelector(state => state.annonceReducer.isLoad);
    const isError = useSelector(state => state.annonceReducer.isError);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMyAnnonces(history));
    }, [dispatch, history]);

    return (
        <div>
            { isLoad ? (<Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                            <CircularProgress color="success" className="spinner" />
                        </Stack>) 
            : isError ? (<p>Désolé ! Erreur d'obtenir vos Annonces.</p>)
            : !annonces.length? (<p>Pas d'Annonce à afficher !</p>) 
            : (
                <div className="annonceList">
                    {annonces.map(el => <MyAnnonceCard annonce={el} key={el._id}/>)}
                </div>
            ) }
</div>
    )
}

export default MyAnnonces;
