
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import './styles.css';

const Balance = ({ balance }) => {
  return (
    <div className="container">
      <Header />
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">💰 Account Balance</h2>
          <div className="balance-amount">${balance.toLocaleString()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Balance;
