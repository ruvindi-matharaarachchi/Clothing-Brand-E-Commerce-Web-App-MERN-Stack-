import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Product Details</h1>
      <p>Product ID: {id}</p>
      <div style={{ marginTop: '20px' }}>
        <h2>Product Information</h2>
        <p>This is where individual product details will be displayed.</p>
        <p>Features to implement:</p>
        <ul>
          <li>Product image gallery</li>
          <li>Product description and specifications</li>
          <li>Size selection</li>
          <li>Add to cart functionality</li>
          <li>Quantity selector</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
