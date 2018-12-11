// import app from "app";
//
// const PORT = 3000;
//
// app.listen(PORT, () => {
//     console.log('Express server listening on port ' + PORT);
// })
import * as express from "express";


// const express = require('express')
const app = express();

app.set('view engine', 'pug');

app.get('/', (req: express.Request, res: express.Response) => {
    // res.send('Hello World!')
    res.render('index', {});
});

app.listen(8000, () => {
    console.log('Example app listening on port 8000!')
});