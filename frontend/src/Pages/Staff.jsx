import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Staff.css'; 

function Staff({ user, searchStaff }) {
  const [staffList, setStaffList] = useState([]);
  const [message, setMessage] = useState('');

  const [newStaff, setNewStaff] = useState({
    EmployeeID: '',
    Name: '',
    Salary: '',
    WeeklySchedule: '',
    DepartmentID: ''
  });

  const fetchStaff = () => {
    axios
      .get(`http://localhost:3001/staff${searchStaff ? `?search=${searchStaff}` : ''}`, {
        withCredentials: true
      })
      .then(res => setStaffList(res.data))
      .catch(err => console.error('Fetch staff failed:', err));
  };

  const handleAddStaff = (e) => {
    e.preventDefault();

    const staffToSubmit = {
      EmployeeID: parseInt(newStaff.EmployeeID, 10),
      Name: newStaff.Name,
      Salary: parseFloat(newStaff.Salary).toFixed(2),
      WeeklySchedule: newStaff.WeeklySchedule,
      DepartmentID: newStaff.DepartmentID
    };
  
    axios.post('http://localhost:3001/staff', staffToSubmit, {
      withCredentials: true
    })
    .then(() => {
      setNewStaff({
        EmployeeID: '',
        Name: '',
        Salary: '',
        WeeklySchedule: '',
        DepartmentID: ''
      });
      setMessage('Staff member successfully added');
      fetchStaff();
      setTimeout(() => setMessage(''), 10000);
    })
    .catch(err => {
      console.error('Staff addition failed:', err);
      if (err.response && err.response.data && err.response.data.error) {
        setMessage(`Error: ${err.response.data.error}`);
      } else {
        setMessage('Unknown error occurred.');
      }
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/staff/${id}`, {
      withCredentials: true
    })
      .then(() => {
        setMessage('Staff member successfully deleted');
        setStaffList(prevStaff => prevStaff.filter(staff => staff.EmployeeID !== id));
        setTimeout(() => setMessage(''), 10000);
      })
      .catch(err => console.error('Staff delete failed:', err));
  };

  useEffect(() => {
    fetchStaff();
  }, [searchStaff]); 

  return (
    <>
      <div className="staff-page">
        {message && <div className="status-message">{message}</div>}

        <div className="staff-list-header">
          <h2>Staff List</h2>
          <form className="add-form" onSubmit={handleAddStaff}>
            <input
              type="text"
              placeholder="EmployeeID"
              value={newStaff.EmployeeID}  
              onChange={(e) => setNewStaff({ ...newStaff, EmployeeID: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Name"
              value={newStaff.Name}
              onChange={(e) => setNewStaff({ ...newStaff, Name: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Salary"
              value={newStaff.Salary}
              onChange={(e) => setNewStaff({ ...newStaff, Salary: e.target.value })}
              step="0.01"
            />
            <input
              type="text"
              placeholder="Weekly Schedule"
              value={newStaff.WeeklySchedule}
              onChange={(e) => setNewStaff({ ...newStaff, WeeklySchedule: e.target.value })}
            />
            <input
              type="text"
              placeholder="Department ID"
              value={newStaff.DepartmentID}
              onChange={(e) => setNewStaff({ ...newStaff, DepartmentID: e.target.value })}
            />
            <button type="submit">Add Staff</button>
          </form>
        </div>

        <ul className="staff-list">
          {staffList.map(staff => (
            <li key={staff.EmployeeID} className="staff-item">
              <div className="staff-attributes">
                <strong>ID:</strong> {staff.EmployeeID}
              </div>
              <div className="staff-attributes">
                <strong>Name:</strong> {staff.Name}
              </div>
              <div className="staff-attributes">
                <strong>Salary:</strong> ${parseFloat(staff.Salary).toFixed(2)}
              </div>
              <div className="staff-attributes">
                <strong>Weekly Schedule:</strong> {staff.WeeklySchedule || 'N/A'}
              </div>
              <div className="staff-attributes">
                <strong>Department ID:</strong> {staff.DepartmentID || 'N/A'}
              </div>
              <button className="delete-button" onClick={() => handleDelete(staff.EmployeeID)}>❌ Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Staff;
