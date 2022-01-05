import React from 'react';
import AnnonceImages from '../Components/AnnonceImages';
import AnnonceInfo from '../Components/AnnonceInfo';


const Details = ({location:{state}}) => {
    
    return (
        <div className='details'>
            {state.annonce.imageUrl.length>0 && <AnnonceImages imageUrl = {state.annonce.imageUrl} /> }
            
            <AnnonceInfo annonce = {state.annonce} />
        </div>
    )
}

export default Details;
