import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Facilities.css'; // You should create Facilities.css or copy styling from Staff.css

function Facilities() {
  const [facilitiesList, setFacilitiesList] = useState([]);
  const [searchFacility, setSearchFacility] = useState('');
  const [message, setMessage] = useState('');

  const [newFacility, setNewFacility] = useState({
    Type: '',
    Name: '',
    Location: '',
    Description: ''
  });

  const fetchFacilities = () => {
    axios
      .get(`http://localhost:3001/facilities${searchFacility ? `?search=${searchFacility}` : ''}`)
      .then(res => setFacilitiesList(res.data))
      .catch(err => console.error('Fetch facilities failed:', err));
  };

  const handleAddFacility = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/facilities', newFacility)
      .then(() => {
        setNewFacility({
          Type: '',
          Name: '',
          Location: '',
          Description: ''
        });
        setSearchFacility(''); 
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
    axios.delete(`http://localhost:3001/facilities/${name}`)
      .then(() => {
        setMessage('Facility successfully deleted');
        setFacilitiesList(prev => prev.filter(facility => facility.Name !== name));
      })
      .catch(err => console.error('Facility delete failed:', err));
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  useEffect(() => {
    if (searchFacility !== '') {
      axios.get(`http://localhost:3001/facilities?search=${searchFacility}`)
        .then(res => setFacilitiesList(res.data))
        .catch(err => console.error('Search facilities failed:', err));
    } else {
      fetchFacilities();
    }
  }, [searchFacility]);

  return (
    <>
      <div className="top-bar">
        <h1>🏛️ 🦁 Zoo Facilities Database 🏛️</h1>

        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/animals">Animals</a>
          <a href="/staff">Staff</a>
          <a href="/visitors">Visitors</a>
          <a href="/facilities">Facilities</a>
        </nav>

        <input
          type="text"
          placeholder="Search facilities..."
          className="search-bar"
          value={searchFacility}
          onChange={(e) => setSearchFacility(e.target.value)}
        />
      </div>

      <div className="facilities-page">
        <h1>🏢 Facility Management 🏢</h1>
        {message && <div className="status-message">{message}</div>}

        <div className="facilities-list-header">
          <h2>Facility List</h2>
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
        </div>

        <ul className="facilities-list">
          {facilitiesList.map(facility => (
            <li key={facility.Name} className="facility-item">
              <div className="facility-attributes">
                <strong>Type:</strong> {facility.Type}
              </div>
              <div className="facility-attributes">
                <strong>Name:</strong> {facility.Name}
              </div>
              <div className="facility-attributes">
                <strong>Location:</strong> {facility.Location}
              </div>
              <div className="facility-attributes">
                <strong>Description:</strong> {facility.Description || 'N/A'}
              </div>
              <button className="delete-button" onClick={() => handleDelete(facility.Name)}>❌ Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Facilities;
