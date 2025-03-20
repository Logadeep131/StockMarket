
import React from 'react';
import FloatingUserButton from './FloatingUserButton';
import '../styles.css';

const Header = () => {
  return (
    <header className="header">
      Portfolio Dashboard
      <FloatingUserButton />
    </header>
  );
};

export default Header;
