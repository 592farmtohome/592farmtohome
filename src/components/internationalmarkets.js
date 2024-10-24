import React, { useState, useEffect } from 'react';

const InternationalMarkets = ({ onClose }) => {
  const [markets, setMarkets] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState(null);

  useEffect(() => {
    // Simulating fetching international market data
    const fetchMarkets = () => {
      const mockMarkets = [
        { id: 1, name: 'European Union', products: ['Wheat', 'Corn'], exchangeRate: 0.0041 },
        { id: 2, name: 'United States', products: ['Soybean', 'Corn'], exchangeRate: 0.0048 },
        { id: 3, name: 'China', products: ['Rice', 'Soybean'], exchangeRate: 0.031 },
        { id: 4, name: 'Brazil', products: ['Coffee', 'Soybean'], exchangeRate: 0.024 },
      ];
      setMarkets(mockMarkets);
    };

    fetchMarkets();
  }, []);

  const handleMarketSelect = (market) => {
    setSelectedMarket(market);
  };

  return (
    <div className="international-markets">
      <h2>International Markets</h2>
      <div className="market-list">
        <h3>Available Markets</h3>
        <ul>
          {markets.map(market => (
            <li key={market.id}>
              <button onClick={() => handleMarketSelect(market)}>
                {market.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedMarket && (
        <div className="market-details">
          <h3>{selectedMarket.name} Market Details</h3>
          <p>Exchange Rate: 1 GYD = {selectedMarket.exchangeRate.toFixed(4)} {selectedMarket.name === 'European Union' ? 'EUR' : 'USD'}</p>
          <h4>Available Products:</h4>
          <ul>
            {selectedMarket.products.map(product => (
              <li key={product}>{product}</li>
            ))}
          </ul>
          <button>Connect to {selectedMarket.name} Market</button>
        </div>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default InternationalMarkets;
