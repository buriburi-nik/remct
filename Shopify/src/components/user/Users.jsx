import React, { useState, useEffect } from 'react';
import './Users.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetch('https://fakestoreapi.com/users')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    filter === 'all' ? true : user.address?.city?.toLowerCase() === filter.toLowerCase()
  );

  // Get unique cities for filter
  const cities = [...new Set(users.map(user => 
    user.address?.city ? user.address.city : 'Unknown'
  ))].sort();

  if (loading) {
    return (
      <div className="container">
        <div className="content-area">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="content-area">
          <div className="empty-state">
            <div className="empty-state-icon">⚠️</div>
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="content-area">
        <h2>Users</h2>
        
        <div className="filter-controls" style={{ margin: '1rem 0' }}>
          <label htmlFor="filter" style={{ marginRight: '0.5rem' }}>Filter by:</label>
          <select
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          >
            <option value="all">All Users</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        
        {filteredUsers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h3>No users found</h3>
            <p>Try changing your filter</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name?.firstname} {user.name?.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || 'N/A'}</td>
                  <td>{user.address?.city || 'Unknown'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}