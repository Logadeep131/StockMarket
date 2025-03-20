import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import './styles.css';

const Watchlist = ({ watchlist = [], balance, updateBalance, addHolding }) => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    // Fetch the prices for all the watchlist stocks
    const fetchPrices = () => {
      watchlist.forEach((stock) => {
        // Just a mockup for prices, replace it with real-time API if needed
        setPrices((prevPrices) => ({
          ...prevPrices,
          [stock.symbol]: (Math.random() * 100 + 10).toFixed(2),
        }));
      });
    };
    fetchPrices();
  }, [watchlist]);

  const handleBuy = (symbol, quantity) => {
    const pricePerShare = parseFloat(prices[symbol]);
    const totalCost = pricePerShare * quantity;
    if (totalCost > balance) {
      alert("Insufficient balance to complete the purchase.");
    } else {
      updateBalance(-totalCost);
      addHolding(symbol, quantity, pricePerShare);
      alert(`Bought ${quantity} shares of ${symbol} for $${totalCost.toFixed(2)}`);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">📊 Stock Watchlist</h2>
          {watchlist.length > 0 ? (
            <ul className="watchlist">
              {watchlist.map((stock, index) => (
                <li key={index} className="watchlist-item">
                  <span className="stock-symbol">{stock.symbol}</span>
                  <span className="stock-price">
                    ${prices[stock.symbol] || "0.00"}
                  </span>
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    id={`quantity-${stock.symbol}`}
                  />
                  <button
                    className="buy-button"
                    onClick={() =>
                      handleBuy(
                        stock.symbol,
                        parseInt(document.getElementById(`quantity-${stock.symbol}`).value, 10)
                      )
                    }
                  >
                    Buy
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-watchlist">No stocks in watchlist</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Watchlist;
