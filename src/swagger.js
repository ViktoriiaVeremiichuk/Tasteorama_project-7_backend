import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Tasteorama API",
    description: "Tasteorama backend API",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./src/swagger-output.json";

const endpointsFiles = [
  "./src/routes/authRoutes.js",
  "./src/routes/categoriesRoutes.js",
  "./src/routes/ingredientsRoutes.js",
  "./src/routes/recipesRoutes.js",
  "./src/routes/usersRoutes.js",
];

swaggerAutogen()(outputFile, endpointsFiles, doc);