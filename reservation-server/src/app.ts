import express from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/glovalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import validator from "./app/middlewares/validator";

const app = express();

// parser
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://reservation-client-sigma.vercel.app",
      "http://reservation-client-sigma.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);
app.use(cookieParser());
app.use(validator);
// application route
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Reservator API",
  });
});

// global error handler
app.use(globalErrorHandler);
// not found handler
app.use(notFound);

export default app;
