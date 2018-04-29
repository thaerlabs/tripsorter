import * as React from 'react';
import { withStyles, Theme } from 'material-ui/styles';
import Typography from 'material-ui/Typography/Typography';
import Grid from 'material-ui/Grid/Grid';
import DirectionsBus from '@material-ui/icons/DirectionsBus';
import DirectionsRailway from '@material-ui/icons/DirectionsRailway';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import ArrowForward from '@material-ui/icons/ArrowForward';
import AccessTime from '@material-ui/icons/AccessTime';
import Bookmark from '@material-ui/icons/Bookmark';
import Paper from 'material-ui/Paper';
import { currency, IDeal } from '../tripfinder';

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
  infoText: {
    marginLeft: 2,
    verticalAlign: 'text-bottom'
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
  <Grid container spacing={16} alignItems="center">
    {/* INFO Reference */}
    <Grid item>
      <Typography variant="caption" className={classes.text}>
        <Bookmark className={classes.icon} />
        <span className={classes.infoText}>{reference}</span>
      </Typography>
    </Grid>
    {/* INFO Travel Time */}
    <Grid item>
      <Typography variant="caption" className={classes.text}>
        <AccessTime className={classes.icon} />
        <span className={classes.infoText}>
          {duration.h}h {duration.m}m
        </span>
      </Typography>
    </Grid>
  </Grid>
));

const TripPricing: React.SFC<{
  currency: string;
  price: number;
  discount: number;
}> = ({ currency, price, discount }) => (
  <>
    <Typography align="right" variant="title">
      {price} {currency}
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
    marginBottom: theme.spacing.unit * 3,
    borderRadius: 5
  }
}));
const TripItem = decorate<{ deal: IDeal }>(({ deal, classes }) => (
  <Paper className={classes.container} elevation={4}>
    <Grid container alignContent="space-around" alignItems="center">
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
          currency={currency}
          price={deal.price}
          discount={deal.discount}
        />
      </Grid>
    </Grid>
  </Paper>
));

export default TripItem;
