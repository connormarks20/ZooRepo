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

/* function for entering data into the top search bar */
app.get('/visitors', (req, res) => {
  const search = req.query.search || '';

  let query = 'SELECT * FROM Visitors';
  let params = [];

  if (search) {
    query += ' WHERE Name LIKE ? OR VisitorID LIKE ? OR GroupID LIKE ?';
    const searchTerm = `%${search}%`;
    params = [searchTerm, searchTerm, searchTerm];
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
app.post('/visitors', (req, res) => {
  const {VisitorID,
    Name,
    GroupID,
    DateOfVisit,
    AmountSpent,
    History,
    MembershipType} = req.body; // Just adding name, species, age, and gender for now. can include more later 
  console.log("incoming visitor data: ", req.body);
  const query = 'INSERT INTO Visitors (Name,GroupID,DateOfVisit,AmountSpent,History, MembershipType) VALUES (?,?,?,?,?,?)';

  db.query(query, [Name,GroupID,DateOfVisit,AmountSpent,History, MembershipType], (err,result) => {
    if(err){
      console.error("Error inserting", err);
      return res.status(500).send('Insert failed');
    }
    res.status(201).json({id: result.insertId});
  });
});

/* function for deleting visitors from db by id. (pk) */
app.delete('/visitors/:id', (req, res) => {
  const visitorID = req.params.id;
  console.log("incoming delete", visitorID);
  db.query(`DELETE FROM Visitors WHERE VisitorID = ?`, [visitorID], (err, result) => {
    if (err) {
      console.error('Error deleting animal:', err);
      return res.status(500).send('Delete failed');
    }
    console.log(` Deleting Visitor ID:`, visitorID, typeof visitorID);

    res.status(200).send('Visitor history deleted');
  });
});

/* function for entering data into the top search bar */
app.get('/facilities', (req, res) => {
  const search = req.query.search || '';

  let query = 'SELECT * FROM Facilities';
  let params = [];

  if (search) {
    query += ' WHERE Name LIKE ? OR Type LIKE ? OR Location LIKE ?';
    const searchTerm = `%${search}%`;
    params = [searchTerm, searchTerm, searchTerm];
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('Error querying Facilities table', err);
      return res.status(500).send('Internal server error');
    }
    res.json(results);
  });
});

/* function for adding facilities to the database */
app.post('/facilities', (req, res) => {
  const { Type, Name, Location, Description } = req.body;
  console.log("Incoming facility data: ", req.body);

  const query = 'INSERT INTO Facilities (Type, Name, Location, Description) VALUES (?,?,?,?)';

  db.query(query, [Type, Name, Location, Description], (err, result) => {
    if (err) {
      console.error("Error inserting facility", err);
      return res.status(500).send({ error: 'Insert failed' });
    }
    res.status(201).json({ id: result.insertId });
  });
});

/* function for deleting facilities from db by name (assuming Name is the unique key) */
app.delete('/facilities/:name', (req, res) => {
  const facilityName = req.params.name;
  console.log("Incoming delete for facility:", facilityName);

  db.query(`DELETE FROM Facilities WHERE Name = ?`, [facilityName], (err, result) => {
    if (err) {
      console.error('Error deleting facility:', err);
      return res.status(500).send('Delete failed');
    }
    console.log(`Deleted Facility Name:`, facilityName);

    res.status(200).send('Facility deleted');
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
