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
import Facilities from './Pages/Facilities';


function App() {
  return (
    <Router>
      <div className="app">
        <nav>
        <Link to="/">Home</Link> | <Link to="/staff">Staff</Link> | <Link to="/animals">Animals</Link> | <Link to="/facilities">Facilities</Link> 
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/animals" element={<Animals />} />
          <Route path="/visitors" element={<Visitors />} />
          <Route path="/facilities" element={<Facilities />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
