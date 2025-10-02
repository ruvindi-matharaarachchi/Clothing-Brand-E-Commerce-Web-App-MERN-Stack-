import React from 'react';

const SuccessMessage = ({ message, onClose, autoClose = true, duration = 3000 }) => {
  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose, duration]);

  return (
    <div style={{
      backgroundColor: '#d4edda',
      color: '#155724',
      padding: '12px 16px',
      borderRadius: '4px',
      marginBottom: '16px',
      border: '1px solid #c3e6cb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span style={{ fontSize: '14px' }}>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#155724',
            cursor: 'pointer',
            fontSize: '18px',
            padding: '0',
            marginLeft: '10px'
          }}
          title="Close"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SuccessMessage;
