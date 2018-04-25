import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import DirectionsBus from '@material-ui/icons/DirectionsBus';
import DirectionsRailway from '@material-ui/icons/DirectionsRailway';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import Divider from 'material-ui/Divider';
import DealsStore, { IDeal } from '../DealStore';

interface IDealsListItemProps {
  deal: IDeal;
}

const DealsListItem: React.SFC<IDealsListItemProps> = ({ deal }) => (
  <ListItem key={deal.reference}>
    {deal.transport === 'bus' && <DirectionsBus />}
    {deal.transport === 'train' && <DirectionsRailway />}
    {deal.transport === 'car' && <DirectionsCar />}
    <ListItemText
      primary={`${deal.departure} > ${deal.arrival}`}
      secondary={`${deal.transport} ${deal.reference} for ${deal.duration.h}h ${
        deal.duration.m
      }m`}
    />
    <ListItemSecondaryAction>
      <ListItemText
        primary={`${deal.cost} ${DealsStore.currency}`}
        secondary={`${deal.discount}%`}
        style={{ textAlign: 'right' }}
      />
    </ListItemSecondaryAction>
  </ListItem>
);

const DealsList: React.SFC<{}> = () => (
  <List>
    {DealsStore.deals.map(deal => (
      <>
        <DealsListItem deal={deal} />
        <Divider />
      </>
    ))}
  </List>
);

export default DealsList;
