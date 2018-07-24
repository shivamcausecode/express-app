const express = require('express');
    app = express();

app.get('/', (request, response)=>{
    response.send('Hello express.js');
});

app.listen(3000, ()=>console.log('express server has been started at port 3000'));
