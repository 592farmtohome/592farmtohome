import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import SellProducts from './SellProducts';

function FarmerProfile() {
  const { currentUser } = useAuth();
  const [supplies, setSupplies] = useState([]);
  const [newSupply, setNewSupply] = useState({ name: '', quantity: '', unit: '' });
  const [showSellProducts, setShowSellProducts] = useState(false);

  useEffect(() => {
    const fetchSupplies = async () => {
      const suppliesRef = db.collection('farmers').doc(currentUser.uid).collection('supplies');
      const snapshot = await suppliesRef.get();
      const suppliesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSupplies(suppliesData);
    };
    fetchSupplies();
  }, [currentUser.uid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupply(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSupply = async (e) => {
    e.preventDefault();
    if (newSupply.name && newSupply.quantity && newSupply.unit) {
      const suppliesRef = db.collection('farmers').doc(currentUser.uid).collection('supplies');
      await suppliesRef.add(newSupply);
      setSupplies(prev => [...prev, { ...newSupply, id: Date.now().toString() }]);
      setNewSupply({ name: '', quantity: '', unit: '' });
    }
  };

  return (
    <div className="farmer-profile">
      <h2>Farmer Profile</h2>
      
      <div className="supply-input">
        <h3>Add New Supply</h3>
        <form onSubmit={handleAddSupply}>
          <input
            type="text"
            name="name"
            value={newSupply.name}
            onChange={handleInputChange}
            placeholder="Supply name"
            required
          />
          <input
            type="number"
            name="quantity"
            value={newSupply.quantity}
            onChange={handleInputChange}
            placeholder="Quantity"
            required
          />
          <input
            type="text"
            name="unit"
            value={newSupply.unit}
            onChange={handleInputChange}
            placeholder="Unit (e.g., kg, liters)"
            required
          />
          <button type="submit">Add Supply</button>
        </form>
      </div>

      <div className="supplies-list">
        <h3>My Supplies</h3>
        <ul>
          {supplies.map(supply => (
            <li key={supply.id}>
              {supply.name}: {supply.quantity} {supply.unit}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => setShowSellProducts(true)}>Sell Products</button>
      
      {showSellProducts && (
        <SellProducts 
          supplies={supplies} 
          onClose={() => setShowSellProducts(false)} 
        />
      )}
    </div>
  );
}

export default FarmerProfile;
