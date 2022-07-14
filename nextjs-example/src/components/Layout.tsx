import Link from 'next/link';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="App">
      <nav>
        <Link href="/">Default</Link>
        <Link href="placement/top-left">Top Left</Link>
        <Link href="placement/bottom-left">Bottom Left</Link>
        <Link href="placement/bottom-right">Bottom Right</Link>
        <Link href="multiple">Multiple</Link>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
