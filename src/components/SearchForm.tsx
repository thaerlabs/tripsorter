import * as React from 'react';
import CitySelect from './CitySelect';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Radio, { RadioGroup } from 'material-ui/Radio';
import {
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText
} from 'material-ui/Form';
import Search from '@material-ui/icons/Search';

interface ISearchForm {
  departure: string;
  arrival: string;
  mode: string;
  onDepartureChange(city: string): void;
  onArrivalChange(city: string): void;
  onModeChange(mode: string): void;
  onSubmit(): void;
}

const SearchForm: React.SFC<ISearchForm> = ({
  departure,
  arrival,
  mode,
  onDepartureChange,
  onArrivalChange,
  onModeChange,
  onSubmit
}) => (
  <>
    <Grid container direction="row" justify="space-around" alignItems="center">
      <CitySelect
        label="Departure"
        onSelect={city => onDepartureChange(city)}
        value={departure}
      />
      <CitySelect
        label="Arrival"
        onSelect={city => onArrivalChange(city)}
        value={arrival}
      />
      <FormControl>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={mode}
          onChange={(event: any) => onModeChange(event.target.value)}
        >
          <FormControlLabel
            value="cheapest"
            control={<Radio />}
            label="Cheapest"
          />
          <FormControlLabel
            value="fastest"
            control={<Radio />}
            label="Fastest"
          />
        </RadioGroup>
      </FormControl>
      <Button
        variant="raised"
        size="small"
        color="secondary"
        onClick={onSubmit}
        style={{
          height: 50
        }}
      >
        <Search />
      </Button>
    </Grid>
    <Grid container direction="row" justify="center" />
  </>
);

export default SearchForm;
