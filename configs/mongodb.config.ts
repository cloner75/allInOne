export default () => {
  if (!process.env.MONGO_URL) {
    throw Error('MONGO_URL Is Required');
  }

  return {
    MONGO_URL: process.env.MONGO_URL
  };
};