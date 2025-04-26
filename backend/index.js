const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());


/* function for entering data into the top search bar */
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
      console.error('error quering db', err);
      return res.status(500).send('internal error');
    }
    res.json(results);
  });
});

/* function for adding animals to the database */
app.post('/animals', (req, res) => {
  const {Name, Species, Age, Gender, ImageURL} = req.body; // Just adding name, species, age, and gender for now. can include more later 
  console.log("incoming animal data: ", req.body);
  const query = 'INSERT INTO Animal (Name,Species,Age,Gender,ImageURL) VALUES (?,?,?,?,?)';

  db.query(query, [Name,Species,Age,Gender,ImageURL], (err,result) => {
    if(err){
      console.error("Error inserting", err);
      return res.status(500).send('Insert failed');
    }
    res.status(201).json({id: result.insertId});
  });
});

/* function for deleting animals from db by id. (pk) */
app.delete('/animals/:id', (req, res) => {
  const animalId = req.params.id;
  console.log("incoming delete", animalId);
  db.query(`DELETE FROM Animal WHERE AnimalID = ?`, [animalId], (err, result) => {
    if (err) {
      console.error('Error deleting animal:', err);
      return res.status(500).send('Delete failed');
    }
    console.log(` Deleting Animal ID:`, animalId, typeof animalId);

    res.status(200).send('Animal deleted');
  });
});

/* function for the animals page to get each animal and the corresponding data from the database */
/*
app.get('/animals', (req, res) => {
  console.log("Getting animal data");

  const query = 'SELECT * FROM Animal';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching animals:', err);
      return res.status(500).json({ error: 'Failed to retrieve animal data' });
    }

    res.json(result); // Send the data back to frontend
  });
});
*/

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
