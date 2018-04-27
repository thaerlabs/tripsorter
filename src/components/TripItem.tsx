import * as React from 'react';
import { withStyles, Theme } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography/Typography';
import Grid from 'material-ui/Grid/Grid';
import DirectionsBus from '@material-ui/icons/DirectionsBus';
import DirectionsRailway from '@material-ui/icons/DirectionsRailway';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import ArrowForward from '@material-ui/icons/ArrowForward';
import AccessTime from '@material-ui/icons/AccessTime';
import Directions from '@material-ui/icons/Directions';
import Bookmark from '@material-ui/icons/Bookmark';
import Paper from 'material-ui/Paper';
import store, { IDeal } from '../store';

const decorateTripIcon = withStyles((theme: Theme) => ({
  icon: {
    fontSize: 35
  }
}));
const TripIcon = decorateTripIcon<{ transport: string }>(
  ({ transport, classes }) => {
    switch (transport) {
      case 'bus':
        return <DirectionsBus className={classes.icon} />;
      case 'train':
        return <DirectionsRailway className={classes.icon} />;
      case 'car':
        return <DirectionsCar className={classes.icon} />;
    }
  }
);

const TripDirection: React.SFC<{ departure: string; arrival: string }> = ({
  departure,
  arrival
}) => (
  <Grid container direction="row" spacing={16}>
    <Grid item>
      <Typography variant="title">{departure}</Typography>{' '}
    </Grid>
    <Grid item>
      <ArrowForward />
    </Grid>
    <Grid item>
      <Typography variant="title">{arrival}</Typography>
    </Grid>
  </Grid>
);

const decorateTripInfo = withStyles((theme: Theme) => ({
  text: {
    fontSize: theme.typography.body2.fontSize
  },
  icon: {
    fontSize: 15
  }
}));
const TripInfo = decorateTripInfo<{
  reference: string;
  transport: string;
  duration: { h: string; m: string };
}>(({ classes, reference, transport, duration }) => (
  <Grid container spacing={8} alignItems="center">
    {/* INFO Reference */}
    <Grid item>
      <Typography variant="caption" className={classes.text}>
        <Bookmark className={classes.icon} />
        {reference}
      </Typography>
    </Grid>
    {/* INFO Transport */}
    <Grid item>
      <Typography variant="caption" className={classes.text}>
        <Directions className={classes.icon} />
        {transport}
      </Typography>
    </Grid>
    {/* INFO Travel Time */}
    <Grid item>
      <Typography variant="caption" className={classes.text}>
        <AccessTime className={classes.icon} />
        {duration.h}h {duration.m}m
      </Typography>
    </Grid>
  </Grid>
));

const TripPricing: React.SFC<{
  currency: string;
  cost: number;
  discount: number;
}> = ({ currency, cost, discount }) => (
  <>
    <Typography align="right" variant="title">
      {cost} {currency}
    </Typography>
    {discount > 0 && (
      <Typography align="right" variant="caption">
        {discount}% discount
      </Typography>
    )}
  </>
);

// Styling
const decorate = withStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3
  }
}));
const DealsListItem = decorate<{ deal: IDeal }>(({ deal, classes }) => (
  <Paper className={classes.container} elevation={4}>
    <Grid container alignContent="space-around" xs={12} alignItems="center">
      {/* Left Column */}
      <Grid item xs={9}>
        <Grid container direction="row" spacing={16} alignItems="center">
          {/* Transport Icon */}
          <Grid item>
            <TripIcon transport={deal.transport} />
          </Grid>
          <Grid item>
            {/* Departure > Arrival */}
            <TripDirection departure={deal.departure} arrival={deal.arrival} />
            <TripInfo
              reference={deal.reference}
              transport={deal.transport}
              duration={deal.duration}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* Right Column */}
      <Grid item xs={3}>
        <TripPricing
          currency={store.currency}
          cost={deal.cost}
          discount={deal.discount}
        />
      </Grid>
    </Grid>
  </Paper>
));

export default DealsListItem;
