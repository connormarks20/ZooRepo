import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Home.css';
function Home() {
  
  const [animals, setAnimals] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [expandedId, setExpandedId] = useState([]);
  const [visitors, setVisitors] = useState([]);
  const [searchVisitor, setSearchVisitor] = useState('');
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/animals${searchItem ? `?search=${searchItem}` : ''}`)
      .then(res => setAnimals(res.data))
      .catch(err => console.error('Fetch failed:', err));
  }, [searchItem]); 

  return (
    <>

      <div className="top-bar">
        <h1> 🐧 🐻 🐨 Zoological DB 🦁 🐒 🦓</h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/animals">Animals</Link>
          <Link to="/staff">Staff</Link>
          <Link to ="/visitors">Visitors</Link>
          <Link to ="/facilities">Facilities</Link>
        </nav>
        <input
    type="text"
    placeholder="Search animals..."
    className="search-bar"
    value={searchItem}
    onChange={(e) => setSearchItem(e.target.value)}
  />
        
      </div>
      

      <div className="animals-page">
      <div className="welcome">
        <h1>🐾 Welcome to the Zoo Database 🐾</h1>
        
      </div>
  <div className="animal-list">
    {animals.map(animal => (
      <div className="animal-card" key={animal.AnimalID}>
      {animal.ImageURL && (
        <img 
          src={animal.ImageURL} 
          alt={animal.Name} 
          className="animal-image" 
        />
      )}
      <h2>{animal.Name}</h2>
      <p><strong>Species:</strong> {animal.Species}</p>
      <p><strong>Age:</strong> {animal.Age} years old</p>
      <p><strong>Gender:</strong> {animal.Gender}</p>
      <p><strong>Weight:</strong> {animal.Weight} pounds</p>
      <p><strong>Behavior:</strong> {animal.Behavior}</p>
      <p><strong>Transfer History:</strong> {animal.TransferHistory}</p>
      <p><strong>Birthdate:</strong> {animal.Birthday?.slice(0, 10)}</p>
      <p><strong>Breed:</strong> {animal.Breed}</p>
      <p><strong>Conservation Status:</strong> {animal.ConservationStatus}</p>
      <p><strong>Housing:</strong> {animal.Housing}</p>
    </div>
    ))}
  </div>
</div>
    </>
  );
}


export default Home;
