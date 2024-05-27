
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



app.listen(3000, () => {
    console.log("server corriendo");
});