const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// gets the notes data
notes.get('/', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading notes data');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// posts the notes data
notes.post('/', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    // reads db.json and adds new object to the file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(newNote);
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedData, null, 4),
          (writeErr) => {
            if (writeErr) {
              console.log(writeErr);
              res.status(500).json({ error: 'Error writing to db.json file '});
            } else {
              console.log('updated db');
              res.json({ message: 'Note added successfully' });
            }
          }
        );
      }
    });
  }
});

module.exports = notes;