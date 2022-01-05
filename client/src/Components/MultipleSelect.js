import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

//list of vehicle types
const names = [
  'Automobile',
  'Moto',
  'Scooter',
  'Camion',
  'Tracteur',
];

function getStyles(name, vehicleName, theme) {
  return {
    fontWeight:
      vehicleName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({nameVehicle, functionVehicle, valueVehicle}) {
  const theme = useTheme();
  const [vehicleName, setvehicleName] = React.useState([]);
  const handle = (event) => {
    const {
      target: { value },
    } = event;
    setvehicleName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const twoCallsFunction = e => {
    handle(e);
    functionVehicle(e);
  };

  return (
    //this component from "material ui" to choose types of vehicles of annonce with offer type 
      <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Moyens de transport</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          name={nameVehicle}
          value={valueVehicle}
          onChange={twoCallsFunction}
          input={<OutlinedInput id="select-multiple-chip" label="Moyens de transport" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, vehicleName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br/><br/>
    </div>  
  );
}
