import React from "react";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { Outlet } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
