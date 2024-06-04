import express from 'express';
import helmet from 'helmet';

import api from './config/user-api';
import cors from 'cors';

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors({
    origin: "*"
}));
app.use(express.json());

app.use('/.netlify/functions/api', api);

import serverless from "serverless-http";

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});

export const handler = serverless(app);