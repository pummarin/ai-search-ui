import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Chat from './view/Chat';
import Layout from './view/layout/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Chat />} />
          </Routes>
        </div>
          
      </Layout>
    </Router>
    
  );
}

export default App;
