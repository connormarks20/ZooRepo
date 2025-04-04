import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [animals, setAnimals] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [message, setMessage] = useState('');
  const [newAnimal, setNewAnimal] = useState ({
    Name: '',
    Species: '',
    Age: '',
    Gender: ''
  });

  const fetchAnimals = () => {
    axios
      .get(`http://localhost:3001/animals${searchItem ? `?search=${searchItem}` : ''}`)
      .then(res => setAnimals(res.data))
      .catch(err => console.error('Fetch failed:', err));
  };

  const handleAddAnimal = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/animals', newAnimal)
    .then(() => {
      setNewAnimal({Name: '', Species: '', Age: '', Gender: ''});
      setSearchItem(''); // refresh animals list 
      setMessage("Animal successfully added");
      fetchAnimals();

      setTimeout( () => setMessage(''), 3000);
    })
    .catch(err => console.log('animal addition failed', err));
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/animals/${id}`)
      .then(() => {
        // update UI immediately 
        setMessage("Animal successfully deleted");
        setAnimals(prevAnimals => prevAnimals.filter(animal => animal.AnimalID !== id));
      })
      .catch(err => console.error('Delete Failed', err));
  };

  useEffect(() => {
    axios.get('http://localhost:3001/animals')
      .then(res => {
        setAnimals(res.data);
      })
      .catch(err => {
        console.error('API call failed:', err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/animals?search=${searchItem}`)
      .then(res => {
        setAnimals(res.data);
      })
      .catch(err => {
        console.error('API call failed:', err);
      });
  }, [searchItem]);

  return (
    <>
   <div className="top-bar">
  <h1> 🐧 🐻 🐨 Zoological DB 🦁 🐒 🦓</h1>

  <nav className="nav-links">
    <a href="#">Home</a>
    <a href="#">Animals</a>
    <a href="#">Staff</a>
    <a href="#">Visitors</a>
  </nav>

  <input
    type="text"
    placeholder="Search animals..."
    className="search-bar"
    value={searchItem}
    onChange={(e) => setSearchItem(e.target.value)}
  />
</div>

      <div className="home">
        <h1>🐾 Welcome to the Zoo Database 🐾</h1>
        {message && <div className="status-message">{message}</div>}
        <div className="animal-list-header">
          <h2>Animals List</h2>
          <form className="add-form" onSubmit={handleAddAnimal}>
          <input 
            type="text"
            placeholder="Name"
            value={newAnimal.Name}
            onChange={(e)=>setNewAnimal({...newAnimal, Name: e.target.value})}
            required 
          />
          <input
          type="text"
          placeholder="Species"
          value={newAnimal.Species}
          onChange={(e) => setNewAnimal({...newAnimal, Species: e.target.value})}
          required 
          />
          <input 
          type="text"
          placeholder="Gender"
          value={newAnimal.Gender}
          onChange={(e)=>setNewAnimal({...newAnimal, Gender: e.target.value})}
          />
          <input 
          type="text"
          placeholder="Age"
          value={newAnimal.Age}
          onChange={(e)=>setNewAnimal({...newAnimal,Age: e.target.value})}
          />
          <button type="submit">Add</button>
          </form>
        </div>

        <u1 className="animal-list">
          {animals.map(animal => (
            <li key={animal.AnimalID}>
              <strong>{animal.AnimalID} {animal.Name}</strong> - {animal.Species}, {animal.Age} years old, {animal.Gender}
              <button className="delete-button" onClick={() => handleDelete(animal.AnimalID)}>❌ Delete</button>
            </li>
          ))}
        </u1>
      </div>
    </>
  );
}

export default Home;
