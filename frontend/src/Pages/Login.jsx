import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/auth/login',
        { username, password },
        { withCredentials: true }
      );

      setStatusMessage('Login successful!');
      // After successful login, fetch user info
      const res = await axios.get('http://localhost:3001/api/me', { withCredentials: true });
      setUser(res.data.user);
      console.log(res.data);

      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/'); // send normal users back to home
      }
    } catch (err) {
      console.error(err);
      setStatusMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {statusMessage && <div className="status-message">{statusMessage}</div>}
      </div>
    </div>
  );
}

export default Login;
