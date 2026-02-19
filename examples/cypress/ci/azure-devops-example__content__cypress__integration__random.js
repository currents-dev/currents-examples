const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};

module.exports.getWaitValue = () => getRandomArbitrary(2000, 10000);
