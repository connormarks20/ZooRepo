import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/cities')
      .then(res => {
        setCities(res.data);
      })
      .catch(err => {
        console.error('API call failed:', err);
      });
  }, []);

  return (
    <div className="App">
      <h1>10 Most Populous Cities from World DB </h1>
      <ul>
        {cities.map((city, idx) => (
          <li key={idx}>
            {city.Name} ({city.CountryCode}) — {city.Population.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
