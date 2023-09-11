const isDevelopmentMode = process.env.MODE === 'DEV';

const clientURL = isDevelopmentMode ? 'http://localhost:4000' : [''];

module.exports = { clientURL };
