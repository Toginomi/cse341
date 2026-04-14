const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: { 
    title: 'T9 Store API', 
    description: 'Final Project API for T9 Store - Managing Products, Reviews, Users, and Roles' 
  },
  host: 't9-store.onrender.com', 
  schemes: ['https', 'http'],
  definitions: {
    Product: {
      category: "Electronics",
      brand: "T9",
      model: "SuperTab 10",
      price: 299.99,
      stock: 50,
      description: "High-performance electronic tablet with 10-inch display.",
      warranty: "1 year",
      releaseDate: "2026-01-01"
    },
    Review: {
      productId: "65f1a2b3c4d5e6f7a8b9c0d1",
      userId: "user_rudy_99",
      rating: 5,
      comment: "Incredible value for the price. Fast shipping!",
      date: "2026-04-15"
    },
    User: {
      username: "rpilande2",
      email: "rpilande@t9store.com",
      password: "hashed_password_123",
      firstName: "Rudy",
      lastName: "Pilande"
    },
    Role: {
      roleName: "Administrator",
      description: "Full access to all store management functions.",
      permissions: ["create_product", "delete_product", "manage_users"]
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);