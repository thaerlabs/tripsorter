import {
  transformToMinutes,
  applyDiscount,
  transformMinutesToHM
} from '../utils';

describe('Utils', () => {
  it('transform h m string durations to total minutes', () => {
    expect(
      transformToMinutes({
        h: '3',
        m: '15'
      })
    ).toBe(195);
  });

  it('should apply discount to cost', () => {
    expect(applyDiscount(40, 25)).toBe(30);
  });

  it('should apply no discount to cost if discount = 0', () => {
    expect(applyDiscount(40, 0)).toBe(40);
  });

  it('should transform minutes duration to duration.h duration.m', () => {
    expect(transformMinutesToHM(120)).toEqual({
      h: 2,
      m: 0
    });

    expect(transformMinutesToHM(150)).toEqual({
      h: 2,
      m: 30
    });

    expect(transformMinutesToHM(45)).toEqual({
      h: 0,
      m: 45
    });
  });
});
