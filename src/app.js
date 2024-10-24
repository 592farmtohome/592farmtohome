import React, { useState } from 'react';
import Header from './components/Header';
import MarketData from './components/MarketData';
import UserActions from './components/UserActions';
import BuyProducts from './components/BuyProducts';
import FarmerProfile from './components/FarmerProfile';
import AIAssistance from './components/AIAssistance';
import MarketTrends from './components/MarketTrends';
import InternationalMarkets from './components/InternationalMarkets';
import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { currentUser } = useAuth();
  const [showBuyProducts, setShowBuyProducts] = useState(false);
  const [showAIAssistance, setShowAIAssistance] = useState(false);
  const [showMarketTrends, setShowMarketTrends] = useState(false);
  const [showInternationalMarkets, setShowInternationalMarkets] = useState(false);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="main-content">
          <MarketData />
          <UserActions 
            onBuyClick={() => setShowBuyProducts(true)}
            onAIAssistClick={() => setShowAIAssistance(true)}
            onMarketTrendsClick={() => setShowMarketTrends(true)}
            onInternationalMarketsClick={() => setShowInternationalMarkets(true)}
          />
        </div>
        {currentUser && currentUser.userType === 'farmer' && <FarmerProfile />}
      </div>
      {showBuyProducts && (
        <div className="popup-overlay">
          <div className="popup-content">
            <BuyProducts onClose={() => setShowBuyProducts(false)} />
          </div>
        </div>
      )}
      {showAIAssistance && (
        <div className="popup-overlay">
          <div className="popup-content">
            <AIAssistance onClose={() => setShowAIAssistance(false)} />
          </div>
        </div>
      )}
      {showMarketTrends && (
        <div className="popup-overlay">
          <div className="popup-content">
            <MarketTrends onClose={() => setShowMarketTrends(false)} />
          </div>
        </div>
      )}
      {showInternationalMarkets && (
        <div className="popup-overlay">
          <div className="popup-content">
            <InternationalMarkets onClose={() => setShowInternationalMarkets(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
