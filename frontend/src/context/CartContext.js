import React, { createContext, useContext, useReducer, useEffect } from 'react';
import cartService from '../api/cartService';

// Cart context
const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_CART':
      return { 
        ...state, 
        cart: action.payload, 
        loading: false, 
        error: null 
      };
    case 'CLEAR_CART':
      return { 
        ...state, 
        cart: { items: [], itemCount: 0, subtotal: 0, updatedAt: new Date() },
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  cart: { items: [], itemCount: 0, subtotal: 0, updatedAt: new Date() },
  loading: false,
  error: null
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, []);

  // Load cart from API
  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cart = await cartService.getCart();
      dispatch({ type: 'SET_CART', payload: cart });
    } catch (error) {
      console.error('Error loading cart:', error);
      // Don't set error for 401 (not logged in)
      if (error.response?.status !== 401) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to load cart' });
      }
    }
  };

  // Add item to cart
  const addItem = async (productId, size, quantity) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cart = await cartService.addItem(productId, size, quantity);
      dispatch({ type: 'SET_CART', payload: cart });
      return cart;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to add item to cart' });
      throw error;
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId, quantity) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cart = await cartService.updateQuantity(itemId, quantity);
      dispatch({ type: 'SET_CART', payload: cart });
      return cart;
    } catch (error) {
      console.error('Error updating quantity:', error);
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to update quantity' });
      throw error;
    }
  };

  // Update item size
  const updateSize = async (itemId, size) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cart = await cartService.updateSize(itemId, size);
      dispatch({ type: 'SET_CART', payload: cart });
      return cart;
    } catch (error) {
      console.error('Error updating size:', error);
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to update size' });
      throw error;
    }
  };

  // Remove item from cart
  const removeItem = async (itemId) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cart = await cartService.removeItem(itemId);
      dispatch({ type: 'SET_CART', payload: cart });
      return cart;
    } catch (error) {
      console.error('Error removing item:', error);
      dispatch({ type: 'SET_ERROR', payload: error.response?.data?.message || 'Failed to remove item' });
      throw error;
    }
  };

  // Clear cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const value = {
    ...state,
    loadCart,
    addItem,
    updateQuantity,
    updateSize,
    removeItem,
    clearCart,
    clearError
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
