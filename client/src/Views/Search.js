import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnnoncesByFilter } from '../JS/actions/annonces';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import AnnonceCard from '../Components/AnnonceCard';

const Search = ({ text, setText, category, setCategory }) => {

  const annonces = useSelector(state => state.annonceReducer.annonces);
  const isLoad = useSelector(state => state.annonceReducer.isLoad);
  const isError = useSelector(state => state.annonceReducer.isError);

  const dispatch = useDispatch();

    useEffect(() => {
        if (text) {
            setCategory("");
            dispatch(getAnnoncesByFilter({ filterType: "text", query: text }));
        } else {
            setText("");
            if (category) {
                dispatch(getAnnoncesByFilter({ filterType: "category", query: category }));
            }
        }
        

    }, [dispatch, text, category]);

    return (
        <div>
            
            {
            isLoad? (<Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                        <CircularProgress color="success" className="spinner" />
                    </Stack>
                    )
            : isError? (<p>Désolé ! Erreur d'obtenir les Annonces.</p>) 
            : !annonces.length? (<p>Pas d'Annonce à afficher !</p>) 
            : (
                <div className="annonceList">
                {annonces.map(el => <AnnonceCard annonce={el} key={el._id}/>)}
                </div>
                )
            }
        </div>
    )
}

export default Search;
