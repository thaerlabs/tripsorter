import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CitySelect from './components/CitySelect';

interface IAppState {
  departure: string;
  arrival: string;
}
class App extends React.Component<{}, IAppState> {
  public state: IAppState = {
    departure: '',
    arrival: ''
  };

  public render() {
    return (
      <div>
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
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
