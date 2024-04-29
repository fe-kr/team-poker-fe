export const checkIsNil = value => value === null || value === undefined;

export const groupBy = (array, key) =>
  array.reduce((acc, item) => {
    acc[item[key]] = item;

    return acc;
  }, {});
