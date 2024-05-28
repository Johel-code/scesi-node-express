import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import healthRoutes from './routes/healthyRoutes';

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome")
});

app.use('/check', healthRoutes);

app.listen(port, () => {
    console.log('server corriendo en ' + port);
});