import express from 'express';
import users from "./src/routes/users";
import { APP_PORT } from './src/config/env'
import  morgan  from  'morgan';
import cookieParser  from  'cookie-parser';
import dataBaseConnect from "./src/config/dataBaseConnect";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(cors());

app.use('/api/users', users);  // /api/users -  глобальный префикс
// @ts-ignore
// app.use((err, req, res, next) => {
//  // Логирование ошибки
//  console.error(err.stack);
//
//  // Отправка ответа с ошибкой клиенту
//  res.status(500).send('Произошла ошибка на сервере');
// });


  app.listen(APP_PORT);
  console.log(`app listen http://localhost:${APP_PORT}`);


dataBaseConnect()