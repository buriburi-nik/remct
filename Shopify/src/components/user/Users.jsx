import React, { useState, useEffect } from 'react';
import './Users.css';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [cityFilter, setCityFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fake gender assignment
  const assignRandomGender = (users) => {
    return users.map(user => ({
      ...user,
      gender: Math.random() > 0.5 ? 'male' : 'female'
    }));
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch('https://fakestoreapi.com/users')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
      })
      .then(data => {
        const enrichedUsers = assignRandomGender(data);
        setUsers(enrichedUsers);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleCityFilterChange = (e) => {
    setCityFilter(e.target.value);
  };

  const handleGenderFilterChange = (e) => {
    setGenderFilter(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    const cityMatch = cityFilter === 'all' || user.address?.city?.toLowerCase() === cityFilter.toLowerCase();
    const genderMatch = genderFilter === 'all' || user.gender === genderFilter;
    return cityMatch && genderMatch;
  });

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

        {/* City Dropdown Filter */}
        <div className="filter-controls" style={{ marginBottom: '1rem' }}>
          <label htmlFor="filter" style={{ marginRight: '0.5rem' }}>City:</label>
          <select
            id="filter"
            value={cityFilter}
            onChange={handleCityFilterChange}
            style={{
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ddd',
              marginRight: '1rem'
            }}
          >
            <option value="all">All Cities</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          {/* Gender Radio Filter */}
          <label style={{ marginRight: '0.5rem' }}>Gender:</label>
          <label style={{ marginRight: '1rem' }}>
            <input
              type="radio"
              name="gender"
              value="all"
              checked={genderFilter === 'all'}
              onChange={handleGenderFilterChange}
            /> All
          </label>
          <label style={{ marginRight: '1rem' }}>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={genderFilter === 'male'}
              onChange={handleGenderFilterChange}
            /> Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={genderFilter === 'female'}
              onChange={handleGenderFilterChange}
            /> Female
          </label>
        </div>

        {/* User Table or Empty */}
        {filteredUsers.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <h3>No users found</h3>
            <p>Try changing your filters</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name?.firstname} {user.name?.lastname}</td>
                  <td>{user.gender}</td>
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
