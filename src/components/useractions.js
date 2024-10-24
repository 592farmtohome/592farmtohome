import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserActions = ({ onBuyClick, onSellClick, onAIAssistClick, onMarketTrendsClick, onInternationalMarketsClick }) => {
  const { currentUser, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="user-actions">
      <h2>Market Actions</h2>
      {currentUser ? (
        <>
          <button onClick={handleLogout} disabled={isLoading}>
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
          <button onClick={onBuyClick}>Buy Products</button>
          {currentUser.userType === 'farmer' && (
            <button onClick={onSellClick}>Sell Products</button>
          )}
          <button onClick={onMarketTrendsClick}>View Market Trends</button>
          <button onClick={onInternationalMarketsClick}>Access International Markets</button>
          <button onClick={onAIAssistClick}>AI Assistance</button>
        </>
      ) : (
        <button onClick={() => {/* Implement login logic */}}>Login</button>
      )}
    </div>
  );
};

export default UserActions;
