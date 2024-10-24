import React from 'react';

const Header = () => (
  <header style={{
    background: '#70c1b3',
    color: 'white',
    padding: '1rem 0',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  }}>
    <div className="container">
      <h1 style={{
        margin: 0,
        textAlign: 'center',
        fontWeight: 600,
        fontSize: '2.5rem'
      }}>Farm to Home - Consolidated Agricultural Market Platform</h1>
    </div>
  </header>
);

export default Header;
