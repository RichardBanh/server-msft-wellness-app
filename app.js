const express = require("express");

const app = express();

//CRUD

const dataRoute = require('./Routes/dataRoute')

// middleware
app.use('/', dataRoute);


// app.post();
// app.put();
// app.delete();

//configuration 
const port = process.env.PORT || 3000; // change it in the terminal 'export PORT=5000'
app.listen(port, () => console.log(`Listening on port ${port}`));
