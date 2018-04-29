import { uniq, intersection, includes, omit, sumBy, uniqBy } from 'lodash-es';
import { applyDiscount, transformToMinutes } from './utils';

const data = require('./response.json');
const graph = buildGraph(formatDeals(data.deals));

export const cities = getCities(data.deals);
export const currency = data.currency;

export interface IDeal {
  [key: string]: number | string | any;
  transport: string;
  departure: string;
  arrival: string;
  duration: {
    h: string;
    m: string;
  };
  durationInMinutes: number;
  cost: number;
  price: number;
  discount: number;
  reference: string;
}

interface ICity {
  [neighbour: string]: {
    deals: IDeal[];
    arrivals: string[];
    cheapest: IDeal;
    fastest: IDeal;
  };
}

const MAX_STEPS = 6;
export function findPath(
  origin: string,
  destination: string,
  mode: 'cheapest' | 'fastest' = 'cheapest',
  step: number = 0,
  visited: string[] = []
): IDeal[] {
  const modeField = mode === 'fastest' ? 'durationInMinutes' : 'price';
  // find direct path
  const direct = graph[origin][destination];

  if (direct) {
    return [direct[mode]];
  }

  const originNeighbours = Object.keys(graph[origin]);
  const destinationNeighbours = Object.keys(graph[destination]);

  // look for intersection
  const connection = intersection(originNeighbours, destinationNeighbours)
    .map(city => {
      return graph[city][destination][mode];
    })
    .reduce((prevCity, currCity) => {
      if (prevCity) {
        return currCity[modeField] < prevCity[modeField] ? currCity : prevCity;
      }
      return currCity;
    }, null);
  if (connection) {
    return [
      graph[origin][connection.departure][mode],
      graph[connection.departure][destination][mode]
    ];
  }

  // loop on the neighbours and recursively look for alternative paths
  if (step < MAX_STEPS && !includes(visited, origin)) {
    const alternativePaths = originNeighbours
      .map(city => ({
        city,
        path: findPath(
          city,
          destination,
          mode,
          step + 1,
          uniq([...visited, origin])
        )
      }))
      .filter(alt => alt.path.length > 0);

    if (alternativePaths.length > 0) {
      const bestAlternativePath = alternativePaths
        .map(alternativePath => {
          return {
            pathCost: sumBy(alternativePath.path, modeField),
            path: alternativePath.path,
            city: alternativePath.city
          };
        })
        // compare paths and find the winner
        .reduce((prevPath, currPath) => {
          return prevPath.pathCost < currPath.pathCost ? prevPath : currPath;
        });
      // build up the path based on visited nodes
      const visitedPath = buildPath([
        ...visited,
        origin,
        bestAlternativePath.city
      ]);

      return uniqBy([...visitedPath, ...bestAlternativePath.path], 'reference');
    }
  }

  return [];
}

// structure data for convinience of access
function buildGraph(
  deals: IDeal[]
): {
  [city: string]: ICity;
} {
  // tslint:disable-next-line:variable-name
  const _graph: any = {};
  const pathCities = getCities(deals);

  pathCities.forEach(city => {
    if (!_graph[city]) {
      _graph[city] = {};
      const departures = deals.filter(d => d.departure === city);
      const destinations = uniq(departures.map(d => d.arrival));

      destinations.forEach(destination => {
        _graph[city][destination] = {
          deals: departures.filter(
            departure => departure.arrival === destination
          )
        };

        _graph[city][destination].cheapest = _graph[city][
          destination
        ].deals.reduce((deal: IDeal, newDeal: IDeal) => {
          return deal.price < newDeal.price ? deal : newDeal;
        });

        _graph[city][destination].fastest = _graph[city][
          destination
        ].deals.reduce((deal: IDeal, newDeal: IDeal) => {
          return deal.durationInMinutes < newDeal.durationInMinutes
            ? deal
            : newDeal;
        });
      });
    }
  });

  return _graph;
}

function buildPath(
  pathCities: string[],
  mode: 'cheapest' | 'fastest' = 'cheapest'
): IDeal[] {
  const deals = [];

  if (pathCities.length < 2) {
    throw new Error('cities param must be at least 2');
  }

  for (let i = 0; i < pathCities.length - 1; i++) {
    deals.push(graph[pathCities[i]][pathCities[i + 1]][mode]);
  }

  return deals;
}

function formatDeals(deals: IDeal[]) {
  return deals.map(deal => ({
    ...deal,
    price: applyDiscount(deal.cost, deal.discount),
    durationInMinutes: transformToMinutes(deal.duration)
  }));
}

function getCities(deals: IDeal[]) {
  const departures = deals.map(deal => deal.departure);
  const arrivals = deals.map(deal => deal.arrival);

  return uniq(departures.concat(arrivals));
}
