import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Watchlist from "./pages/Watchlist";
import Holding from "./pages/Holding";
import Balance from "./pages/Balance";
import './styles.css';

const App = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  
  const userId = 2;  // This would be dynamic based on the logged-in user

  useEffect(() => {
    // Fetch user data
    fetch(`http://localhost:5000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setBalance(data.balance);
      })
      .catch(() => {
        alert("Error fetching user data");
      });

    // Fetch user's holdings from the API
    fetch(`http://localhost:5000/holdings?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setHoldings(data);
      })
      .catch(() => {
        alert("Error fetching holdings");
      });

    // Fetch user's watchlist from the API
    fetch(`http://localhost:5000/watchlist?user_id=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setWatchlist(data);
      })
      .catch(() => {
        alert("Error fetching watchlist");
      });

    setLoading(false);
  }, [userId]);

  if (loading) return <div>Loading...</div>;

  // Update user balance
  const updateBalance = (amount) => {
    setBalance(balance + amount);
    setUserData((prevData) => ({
      ...prevData,
      balance: balance + amount,
    }));

    // Optionally, update the balance on the backend (JSON Server)
    fetch(`http://localhost:5000/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData, balance: balance + amount }),
    });
  };

  // Add holding to the user's holdings
  const addHolding = (symbol, quantity, price) => {
    setHoldings((prevHoldings) => {
      const updatedHoldings = [...prevHoldings];
      const existingStock = updatedHoldings.find(
        (stock) => stock.symbol === symbol
      );
      if (existingStock) {
        existingStock.shares += quantity;
      } else {
        updatedHoldings.push({ symbol, shares: quantity, price });
      }
      return updatedHoldings;
    });
  };

  // Remove holding from the user's holdings
  const removeHolding = (symbol, quantity) => {
    setHoldings((prevHoldings) => {
      const updatedHoldings = prevHoldings
        .map((stock) => {
          if (stock.symbol === symbol) {
            stock.shares -= quantity;
          }
          return stock;
        })
        .filter((stock) => stock.shares > 0);
      return updatedHoldings;
    });
  };

  return (
    <Router>
      <div className="app-container">
 

        <nav className="navigation">
          <Link className="nav-link" to="/watchlist">Watchlist</Link>
          <Link className="nav-link" to="/holding">Holding</Link>
          <Link className="nav-link" to="/balance">Balance</Link>
        </nav>

        <main className="content">
          <Routes>
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  watchlist={watchlist}
                  balance={balance}
                  updateBalance={updateBalance}
                  addHolding={addHolding}
                />
              }
            />
            <Route
              path="/holding"
              element={
                <Holding
                  holdings={holdings}
                  updateBalance={updateBalance}
                  removeHolding={removeHolding}
                />
              }
            />
            <Route
              path="/balance"
              element={<Balance balance={balance} />}
            />
          </Routes>
        </main>

     
      </div>
    </Router>
  );
};

export default App;
