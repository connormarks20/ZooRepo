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

app.post('/animals', (req, res) => {
  const {Name, Species, Age, Gender} = req.body;
  console.log("incoming animal data: ", req.body);
  const query = 'INSERT INTO Animal (Name,Species,Age,Gender) VALUES (?,?,?,?)';

  db.query(query, [Name,Species,Age,Gender], (err,result) => {
    if(err){
      console.error("Error inserting", err);
      return res.status(500).send('Insert failed');
    }
    res.status(201).json({id: result.insertId});
  });
});

app.delete('/animals/:id', (req, res) => {
  const animalId = req.params.id;
  console.log("incoming delete", animalId);
  db.query(`DELETE FROM Animal WHERE AnimalID = ?`, [animalId], (err, result) => {
    if (err) {
      console.error('Error deleting animal:', err);
      return res.status(500).send('Delete failed');
    }
    console.log(`🐾 Deleting Animal ID:`, animalId, typeof animalId);

    res.status(200).send('Animal deleted');
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
