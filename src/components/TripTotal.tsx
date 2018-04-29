import * as React from 'react';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid/Grid';

import { IDeal, currency } from '../tripfinder';
import { Theme, withStyles } from 'material-ui/styles';
import { sumBy } from 'lodash-es';
import { grey } from 'material-ui/colors';
import { transformMinutesToHM } from '../utils';

interface ITripTotalProps {
  deals: IDeal[];
}

const decorateTripTotal = withStyles((theme: Theme) => ({
  content: {
    padding: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    borderRadius: 5,
    backgroundColor: grey[200]
  },
  smallInfoText: {
    fontSize: theme.typography.body2.fontSize
  }
}));
const TripTotal = decorateTripTotal<ITripTotalProps>(({ deals, classes }) => {
  const duration = transformMinutesToHM(sumBy(deals, 'durationInMinutes'));
  return (
    deals.length > 0 && (
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
        className={classes.content}
      >
        <Grid item>
          <Typography variant="headline">Total</Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="caption"
            align="right"
            className={classes.smallInfoText}
          >
            {deals.length} trips in {duration.h}h {duration.m}m
            {}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="headline" align="right">
            <strong>
              {sumBy(deals, 'price')} {currency}
            </strong>
          </Typography>
        </Grid>
      </Grid>
    )
  );
});

export default TripTotal;
