import React, { useState, useEffect } from 'react';

const MarketData = () => {
  const [marketData, setMarketData] = useState({
    wheat: { price: 0, supply: 0, demand: 0 },
    corn: { price: 0, supply: 0, demand: 0 },
    soybean: { price: 0, supply: 0, demand: 0 }
  });

  useEffect(() => {
    const updateMarketData = () => {
      const newData = {};
      ['wheat', 'corn', 'soybean'].forEach(product => {
        newData[product] = {
          price: (Math.random() * 1000 + 200).toFixed(2),
          supply: Math.floor(Math.random() * 1000) + 100,
          demand: Math.floor(Math.random() * 1000) + 100
        };
      });
      setMarketData(newData);
    };

    updateMarketData();
    const interval = setInterval(updateMarketData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="market-data">
      <h2>Current Market Prices</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price (per kg)</th>
            <th>Supply</th>
            <th>Demand</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(marketData).map(([product, data]) => (
            <tr key={product}>
              <td>{product.charAt(0).toUpperCase() + product.slice(1)}</td>
              <td>G${data.price}</td>
              <td>{data.supply} kg</td>
              <td>{data.demand} kg</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketData;
