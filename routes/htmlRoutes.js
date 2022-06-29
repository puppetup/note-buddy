const html = require('express').Router();
const path = require('path');

//sends landing page
html.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '../public/index.html'))
);
//sends note page
html.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/notes.html'))
);
//wildcard function sends landing page
html.get('*', (req, res) => 
  res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = html 
