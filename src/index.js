import { getProducts, purchaseProduct, sellProduct, getMarketTrends, getInternationalMarkets, connectToMarket, aiAssist } from './services/api';

document.getElementById('buy-btn').addEventListener('click', () => {
  if (isLoggedIn) {
    openModal('buyProductsModal');
    getProducts()
      .then(products => {
        const productList = document.getElementById('productList');
        productList.innerHTML = products.map(product => `
          <div class="product-item">
            <h3>${product.name}</h3>
            <p>Farmer: ${product.seller}</p>
            <p>Price: ${product.price_display}</p>
            <button onclick="handlePurchase(${product.id})">Buy</button>
          </div>
        `).join('');
      });
  } else {
    alert('Please log in to buy products.');
  }
});

function handlePurchase(productId) {
  purchaseProduct(productId)
    .then(result => {
      if (result.success) {
        alert('Purchase successful!');
      } else {
        alert('Purchase failed: ' + result.message);
      }
    });
}

document.getElementById('sell-btn').addEventListener('click', () => {
  if (isLoggedIn) {
    openModal('sellProductsModal');
  } else {
    alert('Please log in to sell products.');
  }
});

document.getElementById('sellProductForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const productName = document.getElementById('productName').value;
  const productPrice = document.getElementById('productPrice').value;
  const productQuantity = document.getElementById('productQuantity').value;

  sellProduct(productName, productPrice, productQuantity)
    .then(data => {
      if (data.success) {
        alert('Product listed successfully!');
        closeModal('sellProductsModal');
      } else {
        alert('Failed to list product: ' + data.message);
      }
    });
});

document.getElementById('view-trends-btn').addEventListener('click', () => {
  if (isLoggedIn) {
    openModal('marketTrendsModal');
    getMarketTrends()
      .then(trends => {
        const trendsList = document.getElementById('trendsList');
        trendsList.innerHTML = trends.map(trend => `
          <div class="trend-item">
            <h3>${trend.product}</h3>
            <p>Status: ${trend.status}</p>
            <p>Price Change: ${trend.change}</p>
          </div>
        `).join('');
      });
  } else {
    alert('Please log in to view market trends.');
  }
});

document.getElementById('international-markets-btn').addEventListener('click', () => {
  if (isLoggedIn) {
    openModal('internationalMarketsModal');
    getInternationalMarkets()
      .then(markets => {
        const marketsList = document.getElementById('marketsList');
        marketsList.innerHTML = markets.map(market => `
          <div class="market-item">
            <h3>${market.name}</h3>
            <p>Products: ${market.products.join(', ')}</p>
            <p>Exchange Rate: 1 GYD = ${market.exchangeRate.toFixed(4)} ${market.currency}</p>
            <button onclick="handleConnectToMarket(${market.id})">Connect</button>
          </div>
        `).join('');
      });
  } else {
    alert('Please log in to access international markets.');
  }
});

function handleConnectToMarket(marketId) {
  connectToMarket(marketId)
    .then(result => {
      if (result.success) {
        alert('Connected to international market successfully!');
      } else {
        alert('Connection failed: ' + result.message);
      }
    });
}

document.getElementById('ai-assist-btn').addEventListener('click', () => {
  if (isLoggedIn) {
    openModal('aiAssistModal');
  } else {
    alert('Please log in to use AI assistance.');
  }
});

document.getElementById('askAI').addEventListener('click', () => {
  const question = document.getElementById('userQuestion').value;
  aiAssist(question)
    .then(data => {
      document.getElementById('aiResponse').innerText = data.response;
    });
});

function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
}

// Close button functionality
document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.onclick = function() {
    this.parentElement.parentElement.style.display = "none";
  }
});

// ... rest of the existing code ...
