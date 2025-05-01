import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Animals.css';
import axios from 'axios';

function Animals({ user }) {
  console.log('User in Animals page:', user);

    const [animals, setAnimals] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [message, setMessage] = useState('');
    const [newAnimal, setNewAnimal] = useState({
      Name: '',
      Species: '',
      Age: '',
      Gender: '',
      ImageURL: '',
      Behavior: '',
      TransferHistory: '',
      Birthday: '',
      Breed: '',
      ConservationStatus: '',
      Housing: ''
    });
  
    const fetchAnimals = () => {
      axios
        .get(`http://localhost:3001/animals${searchItem ? `?search=${searchItem}` : ''}`)
        .then(res => setAnimals(res.data))
        .catch(err => console.error('Fetch failed:', err));
    };
  
    const handleAddAnimal = (e) => {
      e.preventDefault();
    
      // Only check name, species, age and gender. other fields optional 
      if (!newAnimal.Name || !newAnimal.Species || !newAnimal.Age || !newAnimal.Gender) {
        setMessage('Please fill out Name, Species, Age, and Gender');
        setTimeout(() => setMessage(''), 5000);
        return;
      }
    
      axios.post('http://localhost:3001/animals', newAnimal, {
        withCredentials: true
      })
      .then(() => {
        setNewAnimal({
          Name: '',
          Species: '',
          Age: '',
          Gender: '',
          ImageURL: '',
          Behavior: '',
          TransferHistory: '',
          Birthday: '',
          Breed: '',
          ConservationStatus: '',
          Housing: ''
        });
        setSearchItem('');
        setMessage("Animal successfully added");
        fetchAnimals();
        setTimeout(() => setMessage(''), 10000);
      })
      .catch(err => console.log('animal addition failed', err));
    }
  
    const handleDelete = (id) => {
      axios.delete(`http://localhost:3001/animals/${id}`, {
        withCredentials: true
      })
        .then(() => {
          // update UI immediately 
          setMessage("Animal successfully deleted");
          setAnimals(prevAnimals => prevAnimals.filter(animal => animal.AnimalID !== id));
  
          setTimeout( () => setMessage(''), 10000);
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
        <div className="animals-admin">
          {message && <div className="status-message">{message}</div>}
          <div className="animal-list-header">
            <h2>Animals List</h2>

          {(user?.role === 'staff' || user?.role === 'admin') && (
            <form className="add-form" onSubmit={handleAddAnimal}>
              <input 
                type="text"
                placeholder="Name"
                value={newAnimal.Name}
                onChange={(e) => setNewAnimal({...newAnimal, Name: e.target.value})}
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
                onChange={(e) => setNewAnimal({...newAnimal, Gender: e.target.value})}
              />
              <input 
                type="text"
                placeholder="Age"
                value={newAnimal.Age}
                onChange={(e)=>setNewAnimal({...newAnimal,Age: e.target.value})}
                />
                <input
                type="text"
                placeholder="Image URL"
                value={newAnimal.ImageURL}
                onChange={(e) => setNewAnimal({...newAnimal, ImageURL: e.target.value})}
                />
                  <input 
                type="text"
                placeholder="Behavior"
                value={newAnimal.Behavior}
                onChange={(e) => setNewAnimal({...newAnimal, Behavior: e.target.value})}
              />
              <input 
                type="text"
                placeholder="Transfer History"
                value={newAnimal.TransferHistory}
                onChange={(e) => setNewAnimal({...newAnimal, TransferHistory: e.target.value})}
              />
              <input 
                type="date" 
                placeholder="Birthdate"
                value={newAnimal.Birthday}
                onChange={(e) => setNewAnimal({...newAnimal, Birthday: e.target.value})}
              />
              <input 
                type="text"
                placeholder="Breed"
                value={newAnimal.Breed}
                onChange={(e) => setNewAnimal({...newAnimal, Breed: e.target.value})}
              />
              <input 
                type="text"
                placeholder="Conservation Status"
                value={newAnimal.ConservationStatus}
                onChange={(e) => setNewAnimal({...newAnimal, ConservationStatus: e.target.value})}
              />
              <input 
                type="text"
                placeholder="Housing"
                value={newAnimal.Housing}
                onChange={(e) => setNewAnimal({...newAnimal, Housing: e.target.value})}
              />
              <button type="submit">Add</button>
            </form>
          )}
        </div>

        <ul className="admin-animal-list">
          {animals.map(animal => (
            <li key={animal.AnimalID}>
              <div className="animal-info">
                <div><strong>ID:</strong> {animal.AnimalID}</div>
                <div><strong>Behavior:</strong> {animal.Behavior}</div>
                <div><strong>Species:</strong> {animal.Species}</div>
                <div><strong>Age:</strong> {animal.Age} years old</div>
                <div><strong>Gender:</strong> {animal.Gender}</div>
                <div><strong>Weight:</strong> {animal.Weight}</div>
                <div><strong>Name:</strong> {animal.Name}</div>
                <div><strong>Gender:</strong> {animal.Gender}</div>
                <div><strong>Transfer History:</strong> {animal.TransferHistory}</div>
                <div><strong>Birthdate:</strong> {animal.Birthday}</div>
                <div><strong>Breed:</strong> {animal.Breed}</div>
                <div><strong>Conservation Status:</strong> {animal.ConservationStatus}</div>
                <div><strong>Housing:</strong> {animal.Housing}</div>
                {animal.ImageURL && (
                  <img 
                    src={animal.ImageURL} 
                    alt={animal.Name} 
                    className="admin-animal-image" 
                  />
                )}
              </div>
              {(user?.role === 'staff' || user?.role === 'admin') && (
                <button className="delete-button" onClick={() => handleDelete(animal.AnimalID)}>❌ Delete</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Animals;
