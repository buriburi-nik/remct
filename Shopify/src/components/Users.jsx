import React, { useState, useEffect } from 'react';

export default function Users() {
  const [all, setAll] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('https://fakestoreapi.com/users')
      .then(r => r.json())
      .then(setAll);
  }, []);

  const shown = all.filter(u =>
    filter === 'all' ? true : u.gender === filter
  );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Users</h2>
      <div onChange={e => setFilter(e.target.value)}>
        <label><input type="radio" value="all" defaultChecked /> All</label>{' '}
        <label><input type="radio" value="male" /> Male</label>{' '}
        <label><input type="radio" value="female" /> Female</label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {shown.map(u => (
            <tr key={u.id}>
              <td>{u.name.firstname} {u.name.lastname}</td>
              <td>{u.email}</td>
              <td>{u.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
