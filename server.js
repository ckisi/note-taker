const express = require('express');
const path = require('path');
// import custom middleware here
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// middleware here

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/assets/index.html'))
);

app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/assets/notes.html'))
);

// starts a server and listens at render PORT or PORT 3001
app.listen(PORT, () => 
  console.log(`App listening at http://localhost:${PORT}`)
);