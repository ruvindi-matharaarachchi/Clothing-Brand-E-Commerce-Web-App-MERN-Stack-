import React from 'react';

const Home = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Clothing Store</h1>
      <p>Product list here</p>
      <div style={{ marginTop: '20px' }}>
        <h2>Featured Products</h2>
        <p>This is where the product grid will be displayed.</p>
        <p>Features to implement:</p>
        <ul>
          <li>Product listing with images</li>
          <li>Search and filter functionality</li>
          <li>Category filtering</li>
          <li>Pagination</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
