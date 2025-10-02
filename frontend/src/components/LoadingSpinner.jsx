import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeStyles = {
    small: { width: '20px', height: '20px', borderWidth: '2px' },
    medium: { width: '40px', height: '40px', borderWidth: '4px' },
    large: { width: '60px', height: '60px', borderWidth: '6px' }
  };

  const currentSize = sizeStyles[size] || sizeStyles.medium;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div style={{
        display: 'inline-block',
        ...currentSize,
        border: `${currentSize.borderWidth} solid #f3f3f3`,
        borderTop: `${currentSize.borderWidth} solid #007bff`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: text ? '10px' : '0'
      }}></div>
      {text && (
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          {text}
        </p>
      )}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
