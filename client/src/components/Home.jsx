import React, { useState } from 'react';
import BestSellers from './BestSellers';
import OnSaleBooks from './OnSaleBooks';
import './Home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState("bestsellers");

  return (
    <div className="homeContainer">
      <div className="tabContainer">
        <button
          className={activeTab === "bestsellers" ? "active" : ""}
          onClick={() => setActiveTab("bestsellers")}
        >
          Best Sellers
        </button>
        <button
          className={activeTab === "onsale" ? "active" : ""}
          onClick={() => setActiveTab("onsale")}
        >
          On Sale
        </button>
      </div>

      <div className="contentContainer">
        {activeTab === "bestsellers" && <BestSellers />}
        {activeTab === "onsale" && <OnSaleBooks />}
      </div>
    </div>
  );
};

export default Home;
