import React from "react";

import Routers from "../router/Routers";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <>
      
        <NavBar />
        
          <Routers />
        
        <Footer />
      
    </>
  );
};

export default Layout;
