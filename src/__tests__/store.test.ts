import { findPath } from '../tripfinder';

describe('Find Path', () => {
  it('should find the simplest cheapest path for 2 connected cities', () => {
    const trips = findPath('Lisbon', 'Madrid');

    expect(trips).toHaveLength(1);
    expect(trips[0].departure).toBe('Lisbon');
    expect(trips[0].arrival).toBe('Madrid');

    expect(trips[0].price).toBe(40);
  });

  it('should find the simplest fastest path for 2 connected cities', () => {
    const trips = findPath('Lisbon', 'Madrid', 'fastest');

    expect(trips).toHaveLength(1);
    expect(trips[0].departure).toBe('Lisbon');
    expect(trips[0].arrival).toBe('Madrid');

    expect(trips[0].durationInMinutes).toBe(270);
  });

  it('should find the simplest path for 2 cities with 1 intersection', () => {
    const trips = findPath('Lisbon', 'Paris');

    expect(trips).toHaveLength(2);

    expect(trips[0].departure).toBe('Lisbon');
    expect(trips[0].arrival).toBe('Madrid');
    expect(trips[1].departure).toBe('Madrid');
    expect(trips[1].arrival).toBe('Paris');
  });

  it('should find the cheapest path for 2 cities with multiple intersections', () => {
    const trips = findPath('Madrid', 'Brussels');
    expect(trips).toHaveLength(2);

    expect(trips[0].departure).toBe('Madrid');
    expect(trips[0].arrival).toBe('Paris');
    expect(trips[1].departure).toBe('Paris');
    expect(trips[1].arrival).toBe('Brussels');
  });

  it('should find the cheapest path for 2 cities with no intersections', () => {
    const trips = findPath('Lisbon', 'London');
    expect(trips).toHaveLength(3);

    expect(trips[0].departure).toBe('Lisbon');
    expect(trips[0].arrival).toBe('Madrid');
    expect(trips[1].departure).toBe('Madrid');
    expect(trips[1].arrival).toBe('Paris');
    expect(trips[2].departure).toBe('Paris');
    expect(trips[2].arrival).toBe('London');
  });
});
