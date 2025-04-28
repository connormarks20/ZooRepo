const express = require('express');
const session = require('express-session');
const cors = require('cors');
const db = require('./db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: 'we_bought_a_zoo',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use('/api/auth', authRoutes);

app.get('/api/me', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

// ----- Animals -----
app.get('/animals', async (req, res) => {
  const search = req.query.search || '';
  let query = 'SELECT * FROM Animal';
  let params = [];

  if (search) {
    query += ' WHERE Name LIKE ? OR Species LIKE ?';
    const searchTerm = `%${search}%`;
    params = [searchTerm, searchTerm];
  }

  try {
    const [results] = await db.query(query, params);
    res.json(results);
  } catch (err) {
    console.error('Error querying Animal table', err);
    res.status(500).send('Internal server error');
  }
});

app.post('/animals', async (req, res) => {
  if (!req.session.user || (req.session.user.role !== 'staff' && req.session.user.role !== 'admin')) {
    return res.status(403).send('Forbidden');
  }

  const { Name, Species, Age, Gender, ImageURL } = req.body;
  const query = 'INSERT INTO Animal (Name, Species, Age, Gender, ImageURL) VALUES (?,?,?,?,?)';
  
  try {
    const [result] = await db.query(query, [Name, Species, Age, Gender, ImageURL]);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Error inserting animal', err);
    res.status(500).send('Insert failed');
  }
});

app.delete('/animals/:id', async (req, res) => {
  if (!req.session.user || (req.session.user.role !== 'staff' && req.session.user.role !== 'admin')) {
    return res.status(403).send('Forbidden');
  }

  const animalId = req.params.id;
  
  try {
    await db.query('DELETE FROM Animal WHERE AnimalID = ?', [animalId]);
    res.status(200).send('Animal deleted');
  } catch (err) {
    console.error('Error deleting animal', err);
    res.status(500).send('Delete failed');
  }
});

// ----- Visitors -----
app.get('/visitors', async (req, res) => {
  const search = req.query.search || '';
  let query = 'SELECT * FROM Visitors';
  let params = [];

  if (search) {
    query += ' WHERE Name LIKE ? OR VisitorID LIKE ? OR GroupID LIKE ?';
    const searchTerm = `%${search}%`;
    params = [searchTerm, searchTerm, searchTerm];
  }

  try {
    const [results] = await db.query(query, params);
    res.json(results);
  } catch (err) {
    console.error('Error querying Visitors table', err);
    res.status(500).send('Internal server error');
  }
});

app.post('/visitors', async (req, res) => {
  const { Name, GroupID, DateOfVisit, AmountSpent, History, MembershipType } = req.body;
  const query = 'INSERT INTO Visitors (Name, GroupID, DateOfVisit, AmountSpent, History, MembershipType) VALUES (?,?,?,?,?,?)';
  
  try {
    const [result] = await db.query(query, [Name, GroupID, DateOfVisit, AmountSpent, History, MembershipType]);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Error inserting visitor', err);
    res.status(500).send('Insert failed');
  }
});

app.delete('/visitors/:id', async (req, res) => {
  const visitorID = req.params.id;
  
  try {
    await db.query('DELETE FROM Visitors WHERE VisitorID = ?', [visitorID]);
    res.status(200).send('Visitor deleted');
  } catch (err) {
    console.error('Error deleting visitor', err);
    res.status(500).send('Delete failed');
  }
});

// ----- Staff -----
app.get('/staff', async (req, res) => {
  const search = req.query.search || '';
  let query = 'SELECT * FROM Staff';
  let params = [];

  if (search) {
    query += ' WHERE Name LIKE ? OR EmployeeID LIKE ? OR DepartmentID LIKE ?';
    const searchTerm = `%${search}%`;
    params = [searchTerm, searchTerm, searchTerm];
  }

  try {
    const [results] = await db.query(query, params);
    res.json(results);
  } catch (err) {
    console.error('Error querying Staff table', err);
    res.status(500).send('Internal server error');
  }
});

app.post('/staff', async (req, res) => {
  const { Name, Salary, WeeklySchedule, DepartmentID } = req.body;
  const query = 'INSERT INTO Staff (Name, Salary, WeeklySchedule, DepartmentID) VALUES (?,?,?,?)';
  
  try {
    const [result] = await db.query(query, [Name, Salary, WeeklySchedule, DepartmentID]);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Error inserting staff', err);
    res.status(500).send('Insert failed');
  }
});

app.delete('/staff/:id', async (req, res) => {
  const employeeID = req.params.id;
  
  try {
    await db.query('DELETE FROM Staff WHERE EmployeeID = ?', [employeeID]);
    res.status(200).send('Staff record deleted');
  } catch (err) {
    console.error('Error deleting staff', err);
    res.status(500).send('Delete failed');
  }
});

// ----- Facilities -----
app.get('/facilities', async (req, res) => {
  const search = req.query.search || '';
  let query = 'SELECT * FROM Facilities';
  let params = [];

  if (search) {
    query += ' WHERE Name LIKE ? OR Type LIKE ? OR Location LIKE ? OR Description LIKE ?';
    const searchTerm = `%${search}%`;
    params = [searchTerm, searchTerm, searchTerm, searchTerm];
  }

  try {
    const [results] = await db.query(query, params);
    res.json(results);
  } catch (err) {
    console.error('Error querying Facilities table', err);
    res.status(500).send('Internal server error');
  }
});

app.post('/facilities', async (req, res) => {
  if (!req.session.user || (req.session.user.role !== 'staff' && req.session.user.role !== 'admin')) {
    return res.status(403).send('Forbidden');
  }

  const { Type, Name, Location, Description } = req.body;
  const query = 'INSERT INTO Facilities (Type, Name, Location, Description) VALUES (?,?,?,?)';
  
  try {
    const [result] = await db.query(query, [Type, Name, Location, Description]);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Error inserting facility', err);
    res.status(500).send('Insert failed');
  }
});

app.delete('/facilities/:name', async (req, res) => {
  if (!req.session.user || (req.session.user.role !== 'staff' && req.session.user.role !== 'admin')) {
    return res.status(403).send('Forbidden');
  }

  const facilityName = req.params.name;
  
  try {
    await db.query('DELETE FROM Facilities WHERE Name = ?', [facilityName]);
    res.status(200).send('Facility deleted');
  } catch (err) {
    console.error('Error deleting facility', err);
    res.status(500).send('Delete failed');
  }
});

// ----- Admin Dashboard -----
// Get all users (Admin only)
app.get('/api/users', async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const [users] = await db.query('SELECT id, username, role FROM users');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users', err);
    res.status(500).send('Server error');
  }
});

// Promote a user to staff or admin (Admin only)
app.post('/api/users/:id/promote', async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const userId = req.params.id;
  const { role } = req.body;

  if (!['visitor', 'staff', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    await db.query('UPDATE users SET role = ? WHERE id = ?', [role, userId]);
    res.json({ message: 'User role updated' });
  } catch (err) {
    console.error('Error updating user role', err);
    res.status(500).send('Server error');
  }
});

// Delete a user by ID
app.delete('/api/users/:id', async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const userId = req.params.id;

  try {
    await db.query('DELETE FROM users WHERE id = ?', [userId]);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user', err);
    res.status(500).send('Server error');
  }
});



// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
