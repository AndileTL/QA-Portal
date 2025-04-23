import React from 'react';
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;