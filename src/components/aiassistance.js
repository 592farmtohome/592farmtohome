import React, { useState, useEffect } from 'react';

const AIAssistance = ({ onClose }) => {
  const [marketData, setMarketData] = useState({
    wheat: { price: 0, supply: 0, demand: 0 },
    corn: { price: 0, supply: 0, demand: 0 },
    soybean: { price: 0, supply: 0, demand: 0 }
  });
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulating fetching current market data
    const newData = {};
    ['wheat', 'corn', 'soybean'].forEach(product => {
      newData[product] = {
        price: (Math.random() * 1000 + 200).toFixed(2),
        supply: Math.floor(Math.random() * 1000) + 100,
        demand: Math.floor(Math.random() * 1000) + 100
      };
    });
    setMarketData(newData);
  }, []);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const generateAIResponse = () => {
    // This is a simple simulation of AI response generation
    // In a real application, you would call an AI service API here
    const products = Object.keys(marketData);
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const data = marketData[randomProduct];

    let recommendation;
    if (data.demand > data.supply) {
      recommendation = `Based on current market trends, it might be a good time to sell ${randomProduct}. The demand (${data.demand} kg) is higher than the supply (${data.supply} kg), which could lead to favorable prices.`;
    } else {
      recommendation = `The market for ${randomProduct} seems saturated right now. The supply (${data.supply} kg) exceeds the demand (${data.demand} kg). You might want to hold off on selling or consider buying if the price (G$${data.price}/kg) fits your budget.`;
    }

    setAiResponse(`Regarding your query: "${userInput}"\n\n${recommendation}\n\nRemember, this is just a suggestion based on current market data. Always consider your own circumstances and risk tolerance when making decisions.`);
  };

  return (
    <div className="ai-assistance">
      <h2>AI Assistance</h2>
      <div>
        <textarea
          value={userInput}
          onChange={handleInputChange}
          placeholder="Ask for market advice or recommendations..."
          rows="4"
          cols="50"
        />
      </div>
      <button onClick={generateAIResponse}>Get AI Recommendation</button>
      {aiResponse && (
        <div className="ai-response">
          <h3>AI Recommendation:</h3>
          <p>{aiResponse}</p>
        </div>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AIAssistance;
