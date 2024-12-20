import "./App.scss";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import LogoBanner from "./assets/logo-banner.jpeg";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Routes } from "./routes/main-route";

function App() {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  });

  return (
    <div className="app">
      {location.pathname !== Routes.ADMIN_LOGIN && (
        <>
          <div className="logo-banner">
            <img src={LogoBanner} alt="logo-banner" className="logo-banner" />
          </div>
          <Header />
        </>
      )}
      <div className="app-content">
        <Outlet />
      </div>
      {location.pathname !== Routes.ADMIN_LOGIN && <Footer />}
    </div>
  );
}

export default App;
