import swaggerAutogen from "swagger-autogen";

const swaggerAutogenInstance = swaggerAutogen({
  openapi: "3.0.0",
});

const doc = {
  info: {
    title: "Tasteorama API",
    description: "Tasteorama backend API",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const outputFile = "./src/swagger-output.json";

const endpointsFiles = [
  "./src/server.js",
];

swaggerAutogenInstance(outputFile, endpointsFiles, doc);