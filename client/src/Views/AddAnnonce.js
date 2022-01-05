import React, { useEffect, useState } from 'react';
import { Button, Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import {addAnnonce, editAnnonceById} from '../JS/actions/annonces';
import { useHistory, useParams } from 'react-router';
import MultipleSelect from '../Components/MultipleSelect';
import NotificationAnnonce from '../Components/NotificationAnnonce';

const AddAnnonce = () => {

    const [annonce, setAnnonce] = useState({title:"", description:"",
        type:"Demande", address:"", destination:"", vehicle:[]});

    const [files, setFiles] = useState([{}]);

    let data = new FormData();

    const toUpdate = useSelector(state => state.annonceReducer.annonce[0]);

    const [edit, setEdit] = useState(false);

    const errors = useSelector(state => state.annonceReducer.errors);

    const handleChange = (e) => {
        setAnnonce({...annonce, [e.target.name]: e.target.value});
    }

    const handleChangeFiles = (e) => {
        setFiles(e.target.files);
    }

    const history = useHistory();
    
    const dispatch = useDispatch();

    const params = useParams();
    useEffect(() => {
        if (params.id) {
            setEdit(true);
            setAnnonce(toUpdate);
        } else {
            setEdit(false);
            setAnnonce({title:"", description:"",
            type:"Demande", address:"", destination:"", vehicle:[]});
        }
    }, [edit, toUpdate, params])

    const handleAnnonce = (e) => {
        e.preventDefault();

        data.append("title", annonce.title);
        data.append("description", annonce.description);
        data.append("type", annonce.type);
        data.append("address", annonce.address);
        data.append("destination", annonce.destination);

        if (annonce.type === "Offre") {
            for (let i=0; i<annonce.vehicle.length; i++) {
                data.append("vehicle", annonce.vehicle[i]);
            }
        }
        if (files.length) {
                for (let i=0; i<files.length; i++) {
                    data.append("annonceImage", files[i]);
                }
            }

        if (edit) {

            dispatch(editAnnonceById(params.id, history, annonce));
            setAnnonce({title:"", description:"",
            type:"Demande", address:"", destination:"", vehicle:[]});
            window.alert("Votre annonce a été modifiée avec succés.");

        } else {
            
            dispatch(addAnnonce(data, history));
            setAnnonce({title:"", description:"", type:"Demande", address:"", destination:"", 
            vehicle:[]});
            window.alert("Votre annonce a été envoyée avec succés.");
            
        }

        
    }
    return (
        <Paper elevation={5} className="paper_add">
        { errors && errors.map( (el) => <NotificationAnnonce error={el} /> ) }
            <form>
                <div>
                <FormControl component="fieldset">
                <FormLabel component="legend">Type d'annonce:</FormLabel>
                <RadioGroup
                    aria-label="type"
                    name="type"
                    value={annonce.type}
                    onChange={handleChange}
                >
                    <FormControlLabel value="Demande" control={<Radio />} label="Demande" />
                    <FormControlLabel value="Offre" control={<Radio />} label="Offre" />
                </RadioGroup>
                </FormControl>
                <br/><br/>
                <TextField
                required
                name="title"
                id="outlined-required"
                label="Titre"
                placeholder="Entrez le titre de votre annonce..."
                onInput={handleChange}
                value={annonce.title}
                size="small"
                fullWidth
                />
                <br/><br/>
                <TextField
                required
                name="description"
                id="outlined-multiline-static"
                label="Description"
                placeholder="Entrez la description..."
                onInput={handleChange}
                value={annonce.description}
                multiline
                rows={7}
                fullWidth
                />
                <br/><br/>
                <TextField
                name="address"
                id="outlined-multiline-static"
                label="Adresse"
                placeholder="Entrez votre adresse..."
                onInput={handleChange}
                value={annonce.address}
                fullWidth
                />
                <br/><br/>

                { (annonce.type === "Offre") ? <MultipleSelect nameVehicle="vehicle"
                    functionVehicle={handleChange}
                    valueVehicle={annonce.vehicle}/> 
                    : (<div>
                        <TextField
                        name="destination"
                        id="outlined-multiline-static"
                        label="Destination"
                        placeholder="Entrez la destination..."
                        onInput={handleChange}
                        value={annonce.destination}
                        fullWidth
                        />
                        </div>)
                }
                </div>
                <div className='add'>
                    <Button><label for="filePicture" style={{ padding:"5px 10px" }}>Selectionner Images</label></Button>
                    <input
                    id='filePicture'
                    name="annonceImage"
                    type="file"
                    accept="image/*"
                    onChange={handleChangeFiles}
                    multiple
                    style={{visibility:"hidden"}}
                    /> 
                    <Button type="submit" variant="contained"  onClick={handleAnnonce}>
                        {edit ? "Modifier" : "Valider"}</Button>
                </div>
            </form>
        </Paper>
    )
}

export default AddAnnonce;
