import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAnnonces } from '../JS/actions/annonces';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import AnnonceCard from '../Components/AnnonceCard';

const AnnonceList = () => {
    const annonces = useSelector(state => state.annonceReducer.annonces);
    const isLoad = useSelector(state => state.annonceReducer.isLoad);
    const isError = useSelector(state => state.annonceReducer.isError);
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllAnnonces());
    }, [dispatch]);
    return (
        <div>
            {
            isLoad? (<Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                        <CircularProgress color="success" className="spinner" />
                    </Stack>) 
            : isError? (<p>Désolé ! Erreur d'obtenir les Annonces.</p>) 
            : !annonces.length? (<p>Pas d'Annonce à afficher !</p>) 
            : (
                <div className='annonceList'>
                {annonces.map(el => <AnnonceCard annonce={el} key={el._id}/>)}
                </div>
                )
            }
        </div>
    )
}

export default AnnonceList;
