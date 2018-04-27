import { observable, computed } from 'mobx';
import uniq from 'lodash-es/uniq';

interface IDealsResponse {
  currency: string;
  deals: IDeal[];
}

export interface IDeal {
  transport: string;
  departure: string;
  arrival: string;
  duration: {
    h: string;
    m: string;
  };
  cost: number;
  discount: number;
  reference: string;
}

export interface IRouteNode {
  departures: IDeal[];
  arrivals: IDeal[];
}

class Store {
  public currency: string;
  public data: IDeal[];
  public deals: IDeal[];
  public cities: string[];
  public citiesMap: any;
  public transports: string[];
  @observable public departure: string = '';
  @observable public arrival: string = '';

  constructor(data: IDealsResponse) {
    this.currency = data.currency;
    this.deals = data.deals;
    this.cities = this.getCities(data.deals);
    this.citiesMap = this.buildCitiesMap(data.deals);
    console.log(this.citiesMap);
  }

  public findTrip() {
    console.log('find trip', this);
  }

  private getCities(deals: IDeal[]) {
    const departures = deals.map(deal => deal.departure);
    const arrivals = deals.map(deal => deal.arrival);

    return uniq(departures.concat(arrivals));
  }

  private buildCitiesMap(data: IDeal[]) {
    const map: any = {};

    this.getCities(data).map(city => {
      map[city] = {
        departures: data.filter(deal => deal.departure === city),
        arrivals: data.filter(deal => deal.arrival === city)
      };
    });

    return map;
  }

  @computed
  public get deparures(): IDeal[] {
    return this.departure ? this.citiesMap[this.departure].departures : [];
  }

  @computed
  public get arrivals(): IDeal[] {
    return this.arrival ? this.citiesMap[this.arrival].arrivals : [];
  }
}

const store = new Store(require('./response.json'));

export default store;
