import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./middleware/logger.js";
import { errors } from "celebrate";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import ingredientsRoutes from "./routes/ingredientsRoutes.js";
import recipesRoutes from "./routes/recipesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json" with { type: "json" };

const app = express();
const PORT = process.env.PORT || 3000;
//Вирішення проблем з CORS
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3001",
  "http://localhost:3000",
].filter(Boolean);

app.use(logger);
app.use(express.json());
app.use(
  cors({
    //Вирішення проблем з CORS
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin ?? allowedOrigins[0]);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.use(helmet());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/ingredients", ingredientsRoutes);
app.use("/api/recipes", recipesRoutes);
app.use("/api/users", usersRoutes);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile),
);

app.use(errors());
app.use(notFoundHandler);
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on localhost: ${PORT}`);
});
