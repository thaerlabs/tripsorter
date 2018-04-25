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

class DealStore {
  public currency: string;
  public deals: IDeal[];
  public cities: string[];
  public transports: string[];

  constructor(data: IDealsResponse) {
    this.currency = data.currency;
    this.deals = data.deals;
    this.cities = this.getCities(this.deals);
  }

  private getCities(deals: IDeal[]) {
    const departures = deals.map(deal => deal.departure);
    const arrivals = deals.map(deal => deal.arrival);

    return uniq(departures.concat(arrivals));
  }
}

const store = new DealStore(require('./response.json'));

export default store;
