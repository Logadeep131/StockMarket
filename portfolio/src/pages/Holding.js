import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import './styles.css';

const Holding = ({ holdings = [], updateBalance, removeHolding }) => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    // Fetch the prices for all the holdings stocks
    const fetchPrices = () => {
      holdings.forEach((stock) => {
        // Just a mockup for prices, replace it with real-time API if needed
        setPrices((prevPrices) => ({
          ...prevPrices,
          [stock.symbol]: (Math.random() * 100 + 10).toFixed(2),
        }));
      });
    };
    fetchPrices();
  }, [holdings]);

  const handleSell = (symbol, quantity) => {
    const holding = holdings.find((stock) => stock.symbol === symbol);
    if (holding.shares < quantity) {
      alert("Insufficient shares to sell.");
    } else {
      const pricePerShare = parseFloat(prices[symbol]);
      const totalProceeds = pricePerShare * quantity;
      
      // Update balance and remove the stock after the sale
      updateBalance(totalProceeds);
      
      // Call the removeHolding function correctly
      removeHolding(symbol, quantity);  // This will handle the logic for reducing the stock's shares

      alert(`Sold ${quantity} shares of ${symbol} for $${totalProceeds.toFixed(2)}`);
    }
  };

  return (
    <div className="container">
      <Header />
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">💼 Stock Holdings</h2>
          {holdings.length > 0 ? (
            <ul className="holdings-list">
              {holdings.map((stock, index) => (
                <li key={index} className="holding-item">
                  <span className="holding-symbol">{stock.symbol}</span>
                  <span className="holding-details">
                    {stock.shares} shares @ ${prices[stock.symbol] || "0.00"}
                  </span>
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    id={`quantity-${stock.symbol}`}
                  />
                  <button
                    className="sell-button"
                    onClick={() => {
                      const quantityToSell = parseInt(
                        document.getElementById(`quantity-${stock.symbol}`).value,
                        10
                      );
                      handleSell(stock.symbol, quantityToSell);
                    }}
                  >
                    Sell
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-holdings">No holdings found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Holding;
