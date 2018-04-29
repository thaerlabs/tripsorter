import * as React from 'react';
import List from 'material-ui/List';
import TripItem from './TripItem';
import { IDeal } from '../tripfinder';

interface ITripListProps {
  deals: IDeal[];
}
const TripList: React.SFC<ITripListProps> = ({ deals }) =>
  deals && (
    <List>
      {deals.map((deal, index) => <TripItem deal={deal} key={index} />)}
    </List>
  );

export default TripList;
