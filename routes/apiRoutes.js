const api = require('express').Router();
const { application } = require('express');
const db = require('../db/db.json');
const fs = require('fs');
const uuid = require('./helpers/uuid')

api.get('/notes', (req,res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
        console.log(JSON.parse(data))
        }
    }
    )
});

// POST Route for submitting feedback
api.post('/notes', (req, res) => {
    // Destructuring assignment for the items in req.body
    const {title,text} = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };
  
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedData = JSON.parse(data);
          parsedData.push(newNote);
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedData, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully added note')
          );
        }
      });
  
      const response = {
        status: 'success',
        body: newNote,
      };
      console.log(response)
      res.json(response);
    } else {
      res.json('Error in posting note');
    }
  });

module.exports = api
