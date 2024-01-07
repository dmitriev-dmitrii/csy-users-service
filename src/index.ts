import { APP_PORT } from './config/env'
import express from 'express';
import morgan  from  'morgan';
// const cors = require('cors');
import dataBaseConnect from "./config/dataBaseConnect";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import errorMiddleware from "./middlewares/errorMiddlware";
import users from "./routes/users";

import authMiddleware from "./middlewares/authMiddleware";
import cookieParser  from  'cookie-parser';
// import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors());
// app.use(cors({
//   credentials: true,
//   origin: process.env.CLIENT_URL
// }));
const appRouterPrefix = '/api/users'

app.use(loggerMiddleware);

app.use(`${appRouterPrefix}`, users);

app.use(errorMiddleware);

// const swaggerDocument = require('./swagger/swagger.json');
// TODO Запилить автодоки свагер
// app.use(appRouterPrefix, swaggerUi.serve, swaggerUi.setup(swaggerDocument))
dataBaseConnect().then(()=> {
  app.listen(APP_PORT)
  console.log(`app listen http://localhost:${APP_PORT}${appRouterPrefix}`);
})

