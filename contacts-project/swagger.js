const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Documentation for Team Project - Week 3',
  },
  host: 'contacts-project-8bnx.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);