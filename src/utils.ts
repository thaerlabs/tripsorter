export const transformToMinutes = (duration: { h: string; m: string }) =>
  parseInt(duration.h, 10) * 60 + parseInt(duration.m, 10);

export const applyDiscount = (cost: number, discount: number) => {
  return discount > 0 ? cost - discount / 100 * cost : cost;
};
