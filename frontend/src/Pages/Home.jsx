import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [animals, setAnimals] = useState([]);
  const [searchItem, setSearchItem] = useState('');
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
        <h2>Animals List</h2>
        <ul className="animal-list">
          {animals.map(animal => (
            <li key={animal.AnimalID}>
              <strong>{animal.Name}</strong> — {animal.Species}, {animal.Age} years old, {animal.Gender}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Home;
