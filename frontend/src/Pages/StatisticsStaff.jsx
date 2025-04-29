import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StatisticsStaff() {
  const [visitorData, setVisitorData] = useState([]);
  const [statistics, setStatistics] = useState({
    totalVisitors: 0,
    totalAmountSpent: 0,
    firstVisitCount: 0,
    visitorsByMembership: {},
  });

  useEffect(() => {
    axios.get('http://localhost:3001/visitors', { withCredentials: true })
      .then(response => {
        console.log("Visitor Data Response:", response.data);
        setVisitorData(response.data);
      })
      .catch(err => {
        console.error("Failed to fetch visitor data", err);
      });
  }, []);

  useEffect(() => {
    if (visitorData.length > 0) {
      const totalVisitors = visitorData.length;

      const totalAmountSpent = visitorData.reduce((acc, visitor) => acc + parseFloat(visitor.AmountSpent.replace('$', '')), 0);

      const firstVisitCount = visitorData.filter(visitor => visitor.History === 'First visit').length;

      const visitorsByMembership = visitorData.reduce((acc, visitor) => {
        const membership = visitor.Membership || 'Unknown';
        acc[membership] = (acc[membership] || 0) + 1;
        return acc;
      }, {});

      setStatistics({
        totalVisitors,
        totalAmountSpent,
        firstVisitCount,
        visitorsByMembership,
      });
    }
  }, [visitorData]);

  return (
    <div className="statistics-container">
      <h2>Visitor Statistics</h2>
      <p>Total Visitors: {statistics.totalVisitors}</p>
      <p>Total Amount Spent: ${statistics.totalAmountSpent.toFixed(2)}</p>
      <p>First-Time Visitors: {statistics.firstVisitCount}</p>

      <div>
        <h3>Visitors by Membership Type:</h3>
        <ul>
          {Object.entries(statistics.visitorsByMembership).map(([membership, count]) => (
            <li key={membership}>{membership}: {count}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StatisticsStaff;
