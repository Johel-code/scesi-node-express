require('dotenv').config();

const express = require('express');
const healthRoutes = require('./routes/healthyRoutes.js');

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome")
});

app.use('/check', healthRoutes);

app.listen(port, (err, res) => {
    if(err){
        console.log(err);
    }else{
        console.log('server corriendo en ' + port);
    }
});