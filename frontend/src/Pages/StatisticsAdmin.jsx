import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StatisticsAdmin() {
  const [staffData, setStaffData] = useState([]);
  const [statistics, setStatistics] = useState({
    totalEmployees: 0,
    averageSalary: 0,
    highestSalary: 0,
    lowestSalary: 0,
    totalSalaryExpense: 0,
    employeesByDepartment: {},
  });

  useEffect(() => {
    axios.get('http://localhost:3001/staff', { withCredentials: true })
      .then(response => {
        console.log("Staff Data Response:", response.data);
        setStaffData(response.data);
      })
      .catch(err => {
        console.error("Failed to fetch staff data", err);
      });
  }, []);

  useEffect(() => {
    if (staffData.length > 0) {
      const totalEmployees = staffData.length;
      const totalSalaryExpense = staffData.reduce((acc, employee) => acc + parseFloat(employee.Salary), 0);
      const averageSalary = totalSalaryExpense / totalEmployees;
      const highestSalary = Math.max(...staffData.map(employee => parseFloat(employee.Salary)));
      const lowestSalary = Math.min(...staffData.map(employee => parseFloat(employee.Salary)));

      const employeesByDepartment = staffData.reduce((acc, employee) => {
        if (acc[employee.DepartmentID]) {
          acc[employee.DepartmentID]++;
        } else {
          acc[employee.DepartmentID] = 1;
        }
        return acc;
      }, {});

      setStatistics({
        totalEmployees,
        averageSalary,
        highestSalary,
        lowestSalary,
        totalSalaryExpense,
        employeesByDepartment,
      });
    }
  }, [staffData]);

  return (
    <div className="statistics-container">
      <h2>Staff Statistics</h2>
      <p>Total Employees: {statistics.totalEmployees}</p>
      <p>Average Salary: ${statistics.averageSalary.toFixed(2)}</p>
      <p>Highest Salary: ${statistics.highestSalary.toFixed(2)}</p>
      <p>Lowest Salary: ${statistics.lowestSalary.toFixed(2)}</p>
      <p>Total Salary Expense: ${statistics.totalSalaryExpense.toFixed(2)}</p>

      <div>
        <h3>Employees by Department:</h3>
        <ul>
          {Object.entries(statistics.employeesByDepartment).map(([department, count]) => (
            <li key={department}>{department}: {count}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StatisticsAdmin;
