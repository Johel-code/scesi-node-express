
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Welcome")
});

app.get('/healthy', (req, res) => {
    res.status(200).json({
        "healt": "live",
        "status": 200,
        "message": "ok"
    })
});

const SERVER_PORT = 3000

app.listen(SERVER_PORT, (err, res) => {
    if(err){
        console.log(err);
    }else{
        console.log("server corriendo");
    }
});