import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectCategory({category, setCategory}) {

  //function to set category with the target value
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box sx={{ marginRight: 25, marginTop: "16px", marginBottom: "15px" }}>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="demo-simple-select-label" sx={{ marginTop: "-7px" }}>Catégories</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="category"
          value={category}
          label="Catégories"
          onChange={handleChange}
          size="small"
        >
          <MenuItem value="Offre">Offres</MenuItem>
          <MenuItem value="Demande">Demandes</MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
}
