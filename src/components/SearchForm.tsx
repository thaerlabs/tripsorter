import * as React from 'react';
import CitySelect from './CitySelect';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

interface ISearchForm {
  departure: string;
  arrival: string;
  onDepartureChange(city: string): void;
  onArrivalChange(city: string): void;
  onSubmit(): void;
}

const SearchForm: React.SFC<ISearchForm> = ({
  departure,
  arrival,
  onDepartureChange,
  onArrivalChange,
  onSubmit
}) => (
  <>
    <Grid container direction="row" justify="space-around">
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
    </Grid>
    <Grid container direction="row" justify="center">
      <Button variant="raised" size="medium" onClick={onSubmit}>
        Search
      </Button>
    </Grid>
  </>
);

export default SearchForm;
