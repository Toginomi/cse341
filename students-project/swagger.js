const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: { title: 'TYS Scholar API', description: 'Management for PSHS Prep Students' },
  host: 'localhost:8080',
  schemes: ['http'],
  definitions: {
    Scholar: {
      studentName: "Juan Dela Cruz",
      currentSchool: "Quezon City Elem",
      parentGuardian: "Maria Dela Cruz",
      parentContact: "09123456789",
      email: "juan@example.com",
      address: "123 St. Manila",
      studentFbLink: "fb.com/juan",
      parentFbLink: "fb.com/maria"
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js');
});