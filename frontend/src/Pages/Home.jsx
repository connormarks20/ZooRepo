import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Home.css';
function Home() {
  
  const [animals, setAnimals] = useState([]);
  const [searchItem, setSearchItem] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/animals${searchItem ? `?search=${searchItem}` : ''}`)
      .then(res => setAnimals(res.data))
      .catch(err => console.error('Fetch failed:', err));
  }, [searchItem]); 

  return (
    <>
      <div className="animals-page">
      <div className="welcome">
        <h1>🐾 Welcome to the Zoo Database 🐾</h1>
        
      </div>
  <div className="animal-list">
    {animals.map(animal => (
      <div 
      className={`animal-card ${expandedId === animal.AnimalID ? 'expanded' : ''}`} 
      key={animal.AnimalID}
      onClick={() => setExpandedId(expandedId === animal.AnimalID ? null : animal.AnimalID)}
    >
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

       {/* This part only shows when card is expanded */}
  {expandedId === animal.AnimalID && (
    <div className="find-out-more">
      <p>Find out more about {animal.Breed}!</p>
      <a 
        href={`https://en.wikipedia.org/wiki/${encodeURIComponent(animal.Breed)}`} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Learn more on Wikipedia
      </a>
    </div>
  )}
    </div>
    ))}
  </div>
</div>
    </>
  );
}


export default Home;
