import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Home from './Pages/Home';
import Staff from './Pages/Staff';
import Animals from './Pages/Animals';
import Visitors from './Pages/Visitors';


function App() {
  return (
    <Router>
      <div className="app">
        <nav>
        <Link to="/">Home</Link> | <Link to="/staff">Staff</Link> | <Link to="/animals">Animals</Link> | <Link to="/visitors">Visitors</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/visitors" element={<Visitors />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
