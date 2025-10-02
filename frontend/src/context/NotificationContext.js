import React, { createContext, useContext, useReducer } from 'react';

// Notification context
const NotificationContext = createContext();

// Notification reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return [...state, { ...action.payload, id: Date.now() }];
    case 'REMOVE_NOTIFICATION':
      return state.filter(notification => notification.id !== action.payload);
    case 'CLEAR_ALL':
      return [];
    default:
      return state;
  }
};

// Initial state
const initialState = [];

// Notification provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, initialState);

  const addNotification = (notification) => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        ...notification,
        id: Date.now()
      }
    });

    // Auto remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(Date.now());
      }, notification.duration || 5000);
    }
  };

  const removeNotification = (id) => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
      payload: id
    });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

// Notification container component
const NotificationContainer = () => {
  const { notifications, removeNotification } = useContext(NotificationContext);

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {notifications.map(notification => (
        <div
          key={notification.id}
          style={{
            backgroundColor: notification.type === 'error' ? '#f8d7da' : 
                           notification.type === 'success' ? '#d4edda' : 
                           notification.type === 'warning' ? '#fff3cd' : '#d1ecf1',
            color: notification.type === 'error' ? '#721c24' : 
                   notification.type === 'success' ? '#155724' : 
                   notification.type === 'warning' ? '#856404' : '#0c5460',
            padding: '12px 16px',
            borderRadius: '4px',
            border: `1px solid ${notification.type === 'error' ? '#f5c6cb' : 
                                notification.type === 'success' ? '#c3e6cb' : 
                                notification.type === 'warning' ? '#ffeaa7' : '#bee5eb'}`,
            minWidth: '300px',
            maxWidth: '400px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          <span style={{ fontSize: '14px' }}>{notification.message}</span>
          <button
            onClick={() => removeNotification(notification.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              fontSize: '18px',
              padding: '0',
              marginLeft: '10px'
            }}
            title="Close"
          >
            ×
          </button>
        </div>
      ))}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

// Custom hook to use notifications
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
