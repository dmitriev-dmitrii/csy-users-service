import express from 'express';
import { APP_PORT } from './src/config/env'
import morgan  from  'morgan';
import dataBaseConnect from "./src/config/dataBaseConnect";
import loggerMiddleware from "./src/middlewares/logger.middleware";
import errorMiddleware from "./src/middlewares/error.middlware";
import cookieParser  from  'cookie-parser';


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(cors());

app.use(loggerMiddleware)
import users from "./src/routes/users";

app.use('/api/users', users);

app.use(errorMiddleware);

dataBaseConnect().then(()=>{
  app.listen(APP_PORT)
  console.log(`app listen http://localhost:${APP_PORT}`);
})

