import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import './Visitors.css';

function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [searchVisitor, setSearchVisitor] = useState('');
  const [message, setMessage] = useState('');
  
  const [newVisitor, setNewVisitor] = useState({
    VisitorID: '',
    Name: '',
    GroupID: '',
    DateOfVisit: '',
    AmountSpent: '',
    History: '',
    MembershipType: ''
  });

  const fetchVisitors = () => {
    axios
      .get(`http://localhost:3001/visitors${searchVisitor ? `?search=${searchVisitor}` : ''}`)
      .then(res => setVisitors(res.data))
      .catch(err => console.error('Fetch visitors failed:', err));
  };

  const handleAddVisitor = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/visitors', newVisitor, {
      withCredentials: true
    })
      .then(() => {
        setNewVisitor({
          VisitorID: '',
          Name: '',
          GroupID: '',
          DateOfVisit: '',
          AmountSpent: '',
          History: '',
          MembershipType: ''
        });
        setSearchVisitor(''); // refresh visitor list
        setMessage('Visitor successfully added');
        fetchVisitors();
        setTimeout(() => setMessage(''), 10000);
      })
      .catch(err => console.error('Visitor addition failed:', err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/visitors/${id}`, {
      withCredentials: true
    })
      .then(() => {
        setMessage('Visitor successfully deleted');
        setVisitors(prevVisitors => prevVisitors.filter(visitor => visitor.VisitorID !== id));
      })
      .catch(err => console.error('Visitor delete failed:', err));
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  useEffect(() => {
    if (searchVisitor !== '') {
      axios.get(`http://localhost:3001/visitors?search=${searchVisitor}`)
        .then(res => setVisitors(res.data))
        .catch(err => console.error('Search visitors failed:', err));
    } else {
      fetchVisitors();
    }
  }, [searchVisitor]);

  return (
    <>
      <div className="visitor-page">
        {message && <div className="status-message">{message}</div>}

        <div className="visitor-list-header">
          <h2>Visitor List</h2>
          <form className="add-form" onSubmit={handleAddVisitor}>
            <input
              type="text"
              placeholder="Name"
              value={newVisitor.Name}
              onChange={(e) => setNewVisitor({ ...newVisitor, Name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Group ID"
              value={newVisitor.GroupID}
              onChange={(e) => setNewVisitor({ ...newVisitor, GroupID: e.target.value })}
            />
            <input
              type="date"
              placeholder="Date of Visit"
              value={newVisitor.DateOfVisit}
              onChange={(e) => setNewVisitor({ ...newVisitor, DateOfVisit: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount Spent"
              value={newVisitor.AmountSpent}
              onChange={(e) => setNewVisitor({ ...newVisitor, AmountSpent: e.target.value })}
              step="0.01"
            />
            <input
              type="text"
              placeholder="History"
              value={newVisitor.History}
              onChange={(e) => setNewVisitor({ ...newVisitor, History: e.target.value })}
            />
            <input
              type="text"
              placeholder="Membership Type"
              value={newVisitor.MembershipType}
              onChange={(e) => setNewVisitor({ ...newVisitor, MembershipType: e.target.value })}
            />
            <button type="submit">Add Visitor</button>
          </form>
        </div>


        <ul className="visitor-list">
  {visitors.map(visitor => (
    <li key={visitor.VisitorID} className="visitor-item">
      <div className="visitor-attributes">
        <strong>ID:</strong> {visitor.VisitorID}
      </div>
      <div className="visitor-attributes">
        <strong>Name:</strong> {visitor.Name}
      </div>
      <div className="visitor-attributes">
        <strong>Group:</strong> {visitor.GroupID || 'N/A'}
      </div>
      <div className="visitor-attributes">
        <strong>Date Visited:</strong> {new Date(visitor.DateOfVisit).toLocaleDateString()}
      </div>
      <div className="visitor-attributes">
        <strong>Amount Spent:</strong> ${visitor.AmountSpent || '0.00'}
      </div>
      <div className="visitor-attributes">
        <strong>History:</strong> {visitor.History || 'N/A'}
      </div>
      <div className="visitor-attributes">
        <strong>Membership:</strong> {visitor.MembershipType || 'None'}
      </div>
      <button className="delete-button" onClick={() => handleDelete(visitor.VisitorID)}>❌ Delete</button>
    </li>
  ))}
</ul>


      </div>
    </>
  );
}

export default Visitors;
