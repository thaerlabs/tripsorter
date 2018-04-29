import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TextAlignProperty } from 'csstype';
import CssBaseline from 'material-ui/CssBaseline';
import Grid from 'material-ui/Grid';
import Snackbar from 'material-ui/Snackbar';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { red, grey } from 'material-ui/colors';

import SearchForm from './components/SearchForm';
import TripList from './components/TripList';
import { findPath, IDeal } from './tripfinder';
import TripTotal from 'components/TripTotal';

const logo = require('../public/logo.svg');

interface IAppState {
  departure: string;
  arrival: string;
  mode: string;
  submitted: boolean;
  trip: IDeal[];
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
    paddingBottom: 10,
    paddingLeft: 40,
    backgroundColor: grey[50],
    borderRadius: 20
  }
};

class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      departure: '',
      arrival: '',
      mode: 'cheapest',
      submitted: false,
      trip: []
    };
  }

  public handleSubmit = () => {
    const { departure, arrival, mode } = this.state;
    this.setState({ submitted: true });
    if (departure && arrival) {
      this.setState({
        trip: findPath(departure, arrival, mode as any)
      });
    }
  };

  public render(): React.ReactNode {
    const { departure, arrival, mode, trip, submitted } = this.state;
    return (
      <>
        <CssBaseline />
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="flex-start"
        >
          <Grid xs={12} md={6} item>
            <img src={logo} alt="Trip Sorter" style={styles.logo} />
            <div style={styles.content}>
              <SearchForm
                departure={departure}
                arrival={arrival}
                onDepartureChange={departure => {
                  this.setState({ departure });
                }}
                onArrivalChange={arrival => {
                  this.setState({ arrival });
                }}
                onModeChange={mode => {
                  this.setState({ mode });
                }}
                mode={mode}
                onSubmit={this.handleSubmit}
              />
              <TripList deals={trip} />
              <TripTotal deals={trip} />
            </div>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={submitted && (!departure || !arrival)}
          autoHideDuration={6000}
          onClose={() => {
            this.setState({ submitted: false });
          }}
          message={<span>Please select all cities</span>}
        />
      </>
    );
  }
}

const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: red
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.querySelector('#app')
);
