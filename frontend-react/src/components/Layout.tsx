/**
 * Layout Component
 * 
 * Provides the basic page structure and navigation.
 */

import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <h1>📋 Project Manager</h1>
          <p className="subtitle">Hexagonal Architecture Demo</p>
        </div>
      </header>
      <main className="main">
        <div className="container">{children}</div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>
            Built with FastAPI, Node.js, and React • Hexagonal Architecture
          </p>
        </div>
      </footer>
    </div>
  );
};
