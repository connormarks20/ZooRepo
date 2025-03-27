const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Zoo API is running!');
});

app.get('/cities', (req, res) => {
    db.query(
      'SELECT Name, CountryCode, Population FROM city ORDER BY Population DESC LIMIT 10',
      (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
      }
    );
  });


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
