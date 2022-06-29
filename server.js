//Import express and node modules
const express = require('express');
const path = require('path');
const fs = require('fs');
const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');

//initialize express
const app = express();
const PORT = process.env.PORT || 3001;

//middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//initialize server
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);

