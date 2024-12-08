import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import globalErrorHandler from '../../../shared/error-handling/global-error-handler.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
};

export const createServer = () => {
  const app = express();

  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
  app.use(express.json());
  app.use(cookieParser());

  app.use('/api/v1/flight-service', router);

  app.use(globalErrorHandler);

  return app;
};

export default createServer;
