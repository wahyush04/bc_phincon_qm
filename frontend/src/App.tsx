import { useState } from 'react'
import './App.css'
import TopNavigationBar from './components/TopNavigationBar';
import Product from './components/Product';

function App() {
  const [activeTab, setActiveTab] = useState("content");

  return (
    <div className="min-h-screen bg-gray-50">
        <TopNavigationBar onTabChange={setActiveTab} activeTab={activeTab} />
        <div className="w-full px-4 py-6">
        {activeTab === "product" && <Product />}
        </div>
    </div>
);
}

export default App;