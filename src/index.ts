import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import healthRoutes from '@routes/healthyRoutes';
import productRoutes from '@routes/productRoutes';

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome")
});

app.use('/api', healthRoutes);
app.use('/api', productRoutes);

app.listen(port, () => {
    console.log('server corriendo en el puerto: ' + port);
});