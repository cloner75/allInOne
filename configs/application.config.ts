export default () => {
  if (!process.env.SERVER_PORT) {
    throw Error('PORT Is Required');
  }

  return {
    PORT: process.env.SERVER_PORT
  };
};