const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: { 
    title: 'Students API', 
    description: 'Management for Students (Students and Course Collections)' 
  },
  host: 'students-project-wet9.onrender.com', 
  schemes: ['https', 'http'],
  definitions: {
    Scholar: {
      firstName: "Rudy",
      lastName: "Pilande",
      email: "rpilande@byupathway.edu",
      age: 23,
      major: "Software Development",
      gpa: 3.8,
      admissionDate: "2023-09-01",
      totalCredits: 96
    },
    Course: {
      courseCode: "CSE341",
      courseName: "Web Services",
      instructor: "Brother Snow",
      credits: 3
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);