import React from 'react';
import "./Layout.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout-container">
      <aside className="sidebar">
        <h2>Chat History</h2>
        <ul>
          <li>New Chat</li>
          <li>Chat 1</li>
          <li>Chat 2</li>
        </ul>
      </aside>
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
