const api = require('express').Router();
const { application } = require('express'); //?
const db = require('../db/db.json'); //?
const fs = require('fs');
const uuid = require('../helpers/uuid');
const { parse } = require('path');

//get db.json and pass to front end
api.get('/notes', (req,res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
        return res.json(JSON.parse(data))
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
        id: uuid(), 
      }
    //read and append new note to db
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
                )
              }
            })
            const response = { 
              status: 'success',
              body: newNote,
            }
            console.log(response);
            res.status(201).json(response);
          } else {
            res.status(500).json('Error in posting note');
          }
            
});

// DELETE Route for a specific tip
api.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  fs.readFile('db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Make a new array of all notes except the one with the ID provided in the URL
      // console.log(data)
      const parseData = JSON.parse(data)
      console.log(parseData)
      // console.log(note)
      console.log(noteId)
      const result = parseData.filter((note) => note.id !== noteId);
      console.log('--------------------------')
      console.log(result)
      // Save that array to the filesystem
      fs.writeFile('db/db.json', JSON.stringify(result, null, 4), err =>
      err ? console.error(err) : console.info('Data written to NOTES')
      );
      // Respond to the DELETE request
      res.json(`Item has been deleted 🗑️`);
    }
    });
});

module.exports = api //where does this get called
