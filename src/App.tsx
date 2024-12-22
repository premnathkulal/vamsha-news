import "./App.scss";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import LogoBanner from "./assets/logo-banner.jpeg";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Routes } from "./routes/main-route";
import { useDispatch } from "react-redux";
import { setIsMobileDevice } from "./store/slices/ui-controls";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth < 1000) {
        // dispatch({ type: "SET_MOBILE_VIEW", payload: true });
        dispatch(setIsMobileDevice(true));
      } else {
        dispatch(setIsMobileDevice(false));
      }
    };
    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  return (
    <div className="app">
      {location.pathname !== Routes.ADMIN_LOGIN && (
        <>
          {location.pathname !== Routes.ADMIN_PAGE && (
            <div className="logo-banner">
              <img src={LogoBanner} alt="logo-banner" className="logo-banner" />
            </div>
          )}
          <Header />
        </>
      )}
      <div className="app-content">
        <Outlet />
      </div>
      {![Routes.ADMIN_LOGIN, Routes.ADMIN_PAGE].includes(
        location.pathname as Routes
      ) && <Footer />}
    </div>
  );
}

export default App;
