import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CitySelect from './components/CitySelect';
import DealsList from './components/DealsList';

interface IAppState {
  departure: string;
  arrival: string;
}
class App extends React.Component<{}, IAppState> {
  public state: IAppState = {
    departure: '',
    arrival: ''
  };

  public render(): React.ReactNode {
    return (
      <div
        style={{
          width: 400,
          margin: '0 auto',
          textAlign: 'center'
        }}
      >
        <CitySelect
          label="Departure"
          onSelect={departure => {
            this.setState({ departure });
          }}
          value={this.state.departure}
        />
        <CitySelect
          label="Arrival"
          onSelect={arrival => {
            this.setState({ arrival });
          }}
          value={this.state.arrival}
        />
        <DealsList />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
