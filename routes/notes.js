const fs = require('fs');
const notes = require('express').Router();

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

module.exports = notes;