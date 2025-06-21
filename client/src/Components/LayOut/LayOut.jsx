import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

function LayOut({ isLoggedIn, handleLogout }) {
  return (
    <div>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default LayOut;
