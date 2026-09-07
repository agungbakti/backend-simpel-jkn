import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import NotFoundError from '../exceptions/not-found-error.js';
import routes from '../routes/index.js';
import ErrorHandler from '../middlewares/error.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((req, res, next) => {
  next(new NotFoundError('Route not found'));
});
app.use(ErrorHandler);

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

export { app, server };