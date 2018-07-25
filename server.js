const express = require('express');
const database = require('./databaseConnection');

const os = require('os');
    app = express();

app.get('/', (request, response)=>{
    response.send('Hello express.js');
    console.warn('\x1b[36m%s\x1b[0m','this is a warning');
    console.error(os.arch());
});

app.listen(3000, ()=>console.log('express server has been started at port 3000'));
