import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TextAlignProperty } from 'csstype';
import { observer } from 'mobx-react';
import CssBaseline from 'material-ui/CssBaseline';
import Grid from 'material-ui/Grid';

import SearchForm from './components/SearchForm';
import DealsList from './components/DealsList';
import store from './store';

const logo = require('../public/logo.svg');

interface IAppState {
  departure: string;
  arrival: string;
}

const styles = {
  logo: {
    width: 230,
    marginTop: 30
  },
  content: {
    marginTop: 30,
    paddingTop: 20,
    paddingRight: 40,
    paddingLeft: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20
  }
};

@observer
class App extends React.Component<{}, IAppState> {
  public handleSubmit = () => {
    store.findTrip();
  };

  public render(): React.ReactNode {
    return (
      <>
        <CssBaseline />
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
        >
          <Grid xs={12} md={3} item>
            <DealsList deals={store.deparures} />
          </Grid>
          <Grid xs={12} md={6} item>
            <img src={logo} alt="Trip Sorter" style={styles.logo} />
            <div style={styles.content}>
              <SearchForm
                departure={store.departure}
                arrival={store.arrival}
                onDepartureChange={departure => {
                  store.departure = departure;
                }}
                onArrivalChange={arrival => {
                  store.arrival = arrival;
                }}
                onSubmit={this.handleSubmit}
              />
              <Grid>
                <DealsList deals={store.deals} />
              </Grid>
            </div>
          </Grid>
          <Grid xs={12} md={3} item>
            <DealsList deals={store.arrivals} />
          </Grid>
        </Grid>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
