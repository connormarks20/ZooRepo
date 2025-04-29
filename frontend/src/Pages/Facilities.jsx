import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import './Facilities.css';

function Facilities({ user, searchFacility }) {
  const [facilitiesList, setFacilitiesList] = useState([]);
  const [message, setMessage] = useState('');

  const [newFacility, setNewFacility] = useState({
    Type: '',
    Name: '',
    Location: '',
    Description: ''
  });

  const fetchFacilities = () => {
    axios
      .get(`http://localhost:3001/facilities${searchFacility ? `?search=${searchFacility}` : ''}`, {
        withCredentials: true
      })
      .then(res => setFacilitiesList(res.data))
      .catch(err => console.error('Fetch facilities failed:', err));
  };

  const handleAddFacility = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/facilities', newFacility, {
      withCredentials: true
    })
      .then(() => {
        setNewFacility({
          Type: '',
          Name: '',
          Location: '',
          Description: ''
        });
        setMessage('Facility successfully added');
        fetchFacilities();
        setTimeout(() => setMessage(''), 10000);
      })
      .catch(err => {
        console.error('Facility addition failed:', err);
        if (err.response && err.response.data && err.response.data.error) {
          setMessage(`Error: ${err.response.data.error}`);
        } else {
          setMessage('Unknown error occurred.');
        }
      });
  };

  const handleDelete = (name) => {
    axios.delete(`http://localhost:3001/facilities/${name}`, {
      withCredentials: true
    })
      .then(() => {
        setMessage('Facility successfully deleted');
        setFacilitiesList(prev => prev.filter(facility => facility.Name !== name));
        setTimeout(() => setMessage(''), 10000);
      })
      .catch(err => {
        console.error('Facility delete failed:', err);
        if (err.response && err.response.data && err.response.data.error) {
          setMessage(`Error: ${err.response.data.error}`);
        } else {
          setMessage('Unknown error occurred.');
        }
      });
  };
  

  useEffect(() => {
    fetchFacilities();
  }, [searchFacility]); 

  return (
    <>
      <div className="facilities-page">
        {message && <div className="status-message">{message}</div>}

        <div className="facilities-list-header">
          <h2>Facility List</h2>

          {(user?.role === 'staff' || user?.role === 'admin') && (
            <form className="add-form" onSubmit={handleAddFacility}>
              <input
                type="text"
                placeholder="Type"
                value={newFacility.Type}
                onChange={(e) => setNewFacility({ ...newFacility, Type: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Name"
                value={newFacility.Name}
                onChange={(e) => setNewFacility({ ...newFacility, Name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={newFacility.Location}
                onChange={(e) => setNewFacility({ ...newFacility, Location: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={newFacility.Description}
                onChange={(e) => setNewFacility({ ...newFacility, Description: e.target.value })}
              />
              <button type="submit">Add Facility</button>
            </form>
          )}
        </div>

        <ul className="facilities-list">
          {facilitiesList.map(facility => (
            <li key={facility.Name} className="facility-row">
              <div className="facility-column">
                <strong>Type:</strong> {facility.Type}
              </div>
              <div className="facility-column">
                <strong>Name:</strong> {facility.Name}
              </div>
              <div className="facility-column">
                <strong>Location:</strong> {facility.Location}
              </div>
              <div className="facility-column">
                <strong>Description:</strong> {facility.Description || 'N/A'}
              </div>
              {(user?.role === 'staff' || user?.role === 'admin') && (
                <button className="delete-button" onClick={() => handleDelete(facility.Name)}>❌ Delete</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Facilities;
