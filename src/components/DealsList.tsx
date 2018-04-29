import * as React from 'react';
import List from 'material-ui/List';
import TripItem from './TripItem';
import { IDeal } from '../tripfinder';

interface IDealsListProps {
  deals: IDeal[];
}
const DealsList: React.SFC<IDealsListProps> = ({ deals }) => (
  <List>
    {deals && deals.map((deal, index) => <TripItem deal={deal} key={index} />)}
  </List>
);

export default DealsList;
