import React, { useState } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

function SellProducts({ supplies, onClose }) {
  const { currentUser } = useAuth();
  const [selectedSupply, setSelectedSupply] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSupply && quantity && price) {
      const productRef = db.collection('products');
      await productRef.add({
        name: selectedSupply,
        quantity: parseInt(quantity),
        price: parseFloat(price),
        sellerId: currentUser.uid,
        createdAt: new Date()
      });
      alert('Product listed for sale successfully!');
      onClose();
    }
  };

  return (
    <div className="sell-products">
      <h3>Sell Products</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedSupply}
          onChange={(e) => setSelectedSupply(e.target.value)}
          required
        >
          <option value="">Select a supply</option>
          {supplies.map(supply => (
            <option key={supply.id} value={supply.name}>{supply.name}</option>
          ))}
        </select>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity to sell"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price per unit (GYD)"
          step="0.01"
          required
        />
        <button type="submit">List for Sale</button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default SellProducts;
