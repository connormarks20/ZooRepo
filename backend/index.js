const express = require('express');
const cors = require('cors');
const db = require('./db'); // This is your db.js file

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ✅ Test route to fetch animals
app.get('/animals', (req, res) => {
  const search = req.query.search || '';

  let query = 'SELECT * FROM Animal';
  let params = [];

  if (search) {
    query += ' WHERE Name LIKE ? OR Species LIKE ?';
    const searchTerm = `%${search}%`;
    params = [searchTerm, searchTerm];
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).send('Server error');
    }
    res.json(results);
  });
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
