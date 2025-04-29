import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StatisticsVisitor() {
  const [animalData, setAnimalData] = useState([]);
  const [statistics, setStatistics] = useState({
    totalAnimals: 0,
    averageAge: 0,
    oldestAge: 0,
    youngestAge: 0,
    animalsByGender: {},
    animalsBySpecies: {},
  });

  useEffect(() => {
    axios.get('http://localhost:3001/animals', { withCredentials: true })
      .then(response => {
        console.log("Animal Data Response:", response.data);
        setAnimalData(response.data);
      })
      .catch(err => {
        console.error("Failed to fetch animal data", err);
      });
  }, []);

  useEffect(() => {
    if (animalData.length > 0) {
      const totalAnimals = animalData.length;
      const totalAge = animalData.reduce((acc, animal) => acc + parseFloat(animal.Age), 0);
      const averageAge = totalAge / totalAnimals;
      const oldestAge = Math.max(...animalData.map(animal => parseFloat(animal.Age)));
      const youngestAge = Math.min(...animalData.map(animal => parseFloat(animal.Age)));

      const animalsByGender = animalData.reduce((acc, animal) => {
        const gender = animal.Gender || "Unknown";
        acc[gender] = (acc[gender] || 0) + 1;
        return acc;
      }, {});

      const animalsBySpecies = animalData.reduce((acc, animal) => {
        const species = animal.Species || "Unknown";
        acc[species] = (acc[species] || 0) + 1;
        return acc;
      }, {});

      setStatistics({
        totalAnimals,
        averageAge,
        oldestAge,
        youngestAge,
        animalsByGender,
        animalsBySpecies,
      });
    }
  }, [animalData]);

  return (
    <div className="statistics-container">
      <h2>Animal Statistics</h2>
      <p>Total Animals: {statistics.totalAnimals}</p>
      <p>Average Age: {statistics.averageAge.toFixed(2)} years</p>
      <p>Oldest Animal Age: {statistics.oldestAge} years</p>
      <p>Youngest Animal Age: {statistics.youngestAge} years</p>

      <div>
        <h3>Animals by Gender:</h3>
        <ul>
          {Object.entries(statistics.animalsByGender).map(([gender, count]) => (
            <li key={gender}>{gender}: {count}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Animals by Species:</h3>
        <ul>
          {Object.entries(statistics.animalsBySpecies).map(([species, count]) => (
            <li key={species}>{species}: {count}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StatisticsVisitor;
