import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { errors } from "celebrate";
import "dotenv/config";
import { connectMongoDB } from "./db/connectMongoDB.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { logger } from "./middleware/logger.js";
import authRoutes from "./routes/authRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import ingredientsRoutes from "./routes/ingredientsRoutes.js";
import recipesRoutes from "./routes/recipesRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
// cookie-parser потрібен для cookie-сесій (authenticate middleware)
app.use(cookieParser());
app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "DELETE"],
    // щоб браузер надсилав 
    credentials: true,
  }),
);
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/ingredients", ingredientsRoutes);
app.use("/api/recipes", recipesRoutes);
app.use("/api/users", usersRoutes);

app.use(notFoundHandler);
// errors() з celebrate — обробка помилок валідації (400) до загального errorHandler
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on localhost: ${PORT}`);
});
