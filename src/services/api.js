import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getProduct = async (productId) => {
  const response = await axios.get(`${API_URL}/get-product/${productId}/`);
  return response.data;
};

export const updatePrice = async (productId) => {
  const response = await axios.post(`${API_URL}/update-price/${productId}/`);
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products/`);
  return response.data;
};

export const purchaseProduct = async (productId) => {
  const response = await axios.post(`${API_URL}/purchase/${productId}/`);
  return response.data;
};

export const sellProduct = async (name, price, quantity) => {
  const response = await axios.post(`${API_URL}/sell-product/`, { name, price, quantity });
  return response.data;
};

export const getMarketTrends = async () => {
  const response = await axios.get(`${API_URL}/market-trends/`);
  return response.data;
};

export const getInternationalMarkets = async () => {
  const response = await axios.get(`${API_URL}/international-markets/`);
  return response.data;
};

export const connectToMarket = async (marketId) => {
  const response = await axios.post(`${API_URL}/connect-market/${marketId}/`);
  return response.data;
};

export const aiAssist = async (question) => {
  const response = await axios.post(`${API_URL}/ai-assist/`, { question });
  return response.data;
};
