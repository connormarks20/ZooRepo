import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Navigate
} from 'react-router-dom';
import axios from 'axios';

import Home from './Pages/Home';
import Staff from './Pages/Staff';
import Animals from './Pages/Animals';
import Visitors from './Pages/Visitors';
import Facilities from './Pages/Facilities';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AdminDashboard from './Pages/AdminDashboard';
import StatisticsAdmin from './Pages/StatisticsAdmin';
import StatisticsVisitor from './Pages/StatisticsVisitor';
import StatisticsStaff from './Pages/StatisticsStaff';

function TopBar({ searchFacility, setSearchFacility, setSearchAnimal, setSearchVisitor, setSearchStaff, user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  // Only show search input on these pages
  const showSearchBar = ['/animals', '/staff', '/visitors', '/facilities'].includes(currentPath);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;  
    if (currentPath === '/animals') {
      setSearchAnimal(value);
    } else if (currentPath === '/facilities') {
      setSearchFacility(value);
    } else if (currentPath === '/visitors') {
      setSearchVisitor(value);
    } else if (currentPath === '/staff') {
      setSearchStaff(value);
    }
  };
  

  return (
    <div className="top-bar">
      <h1>🐧 🐻 🐨 Zoological DB 🦁 🐒 🦓</h1>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/animals">Animals</Link>
        {(user?.role === 'staff' || user?.role === 'admin') && <Link to="/staff">Staff</Link>}
        {(user?.role === 'staff' || user?.role === 'admin') && <Link to="/visitors">Visitors</Link>}
        <Link to="/facilities">Facilities</Link>
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
        {user?.role === 'admin' && <Link to="/admin">Admin Dashboard</Link>}
        {user?.role === 'admin' && <Link to="/statisticsAdmin">Statistics Admin</Link>}
        {user?.role === 'visitor' && <Link to="/statisticsVisitor">Statistics Visitor</Link>}
        {user?.role === 'staff' && <Link to="/statisticsStaff">Statistics Staff</Link>}
        {user && <Link to="#" onClick={handleLogout}>Logout</Link>}
      </nav>

      {showSearchBar && (
        <input
          type="text"
          placeholder="Search List..."
          className="search-bar"
          onChange={handleSearchChange}  // 🔥 Use the dynamic handler
        />
      )}
    </div>
  );
}


function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchFacility, setSearchFacility] = useState('');
  const [searchAnimal, setSearchAnimal] = useState('');
  const [searchVisitor, setSearchVisitor] = useState('');
  const [searchStaff, setSearchStaff] = useState('');


  // On app load, check if user is logged in
  useEffect(() => {
    axios.get('http://localhost:3001/api/me', { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>; // small loading screen while checking login

  return (
    <Router>
      <div className="app">
      <TopBar 
        setSearchFacility={setSearchFacility} 
        setSearchAnimal={setSearchAnimal}
        setSearchVisitor={setSearchVisitor}
        setSearchStaff={setSearchStaff}
        user={user} 
        setUser={setUser} 
      />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/animals" element={<Animals user={user} searchAnimal={searchAnimal}/>} />
          <Route path="/facilities" element={<Facilities user={user} searchFacility={searchFacility}/>} />
          
          {/* Staff page - staff/admin only */}
          <Route path="/staff" element={
            user?.role === 'staff' || user?.role === 'admin'
              ? <Staff user={user} searchStaff={searchStaff} />
              : <Navigate to="/" />
          } />

          {/* Visitors page - staff/admin only */}
          <Route path="/visitors" element={
            user?.role === 'staff' || user?.role === 'admin'
              ? <Visitors user={user} searchVisitor={searchVisitor}/>
              : <Navigate to="/" />
          } />

          {/* Statistics page - statisticsAdmin only */}
          <Route path="/statisticsAdmin" element={
            user?.role === 'statisticsAdmin' || user?.role === 'admin'
              ? <StatisticsAdmin/>
              : <Navigate to="/" />
          } />

          {/* Statistics page - statisticsVisitor only */}
            <Route path="/statisticsVisitor" element={
            user?.role === 'statisticsVisitor' || user?.role === 'visitor'
              ? <StatisticsVisitor/>
              : <Navigate to="/" />
          } />

          {/* Statistics page - statisticsStaff only */}
          <Route path="/statisticsStaff" element={
            user?.role === 'statisticsStaff' || user?.role === 'staff'
              ? <StatisticsStaff/>
              : <Navigate to="/" />
          } />

          {/* Admin Dashboard - admin only */}
          <Route path="/admin" element={
            user?.role === 'admin'
              ? <AdminDashboard />
              : <Navigate to="/" />
          } />

          {/* Login/Register - only for not logged in */}
          <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
