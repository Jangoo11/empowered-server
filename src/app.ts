import express from 'express';
import helmet from 'helmet';

import api from './user-api';
import cors from 'cors';

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors({
    origin: "*"
}));
app.use(express.json());

app.use('/api', api);


export default app;
