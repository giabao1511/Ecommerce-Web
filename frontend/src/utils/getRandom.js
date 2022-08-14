const getProducts = (array, count) => {
  const max = array.length - count;
  const min = 0;
  const start = Math.floor(Math.random() * (max - min) + min);
  return array.slice(start, start + count);
};

export default getProducts;
