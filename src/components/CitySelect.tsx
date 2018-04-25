import * as React from 'react';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { withStyles, Theme } from 'material-ui/styles';
import DealStore from '../DealStore';

// Component props interface
interface ICityDropDownProps {
  label: string;
  value: string;
  onSelect(city: string): void;
}

// Styling
const decorate = withStyles((theme: Theme) => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
}));

const CitySelect = decorate<ICityDropDownProps>(
  ({ classes, label, value, onSelect }) => (
    <FormControl className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={event => onSelect(event.target.value)}>
        <MenuItem value="">
          <em>Select a City</em>
        </MenuItem>
        {DealStore.cities.map(city => (
          <MenuItem key={city} value={city}>
            {city}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
);

export default CitySelect;