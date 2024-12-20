import "./App.scss";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import LogoBanner from "./assets/logo-banner.jpeg";
import Home from "./pages/home-page/Home";
import Admin from "./pages/home-page/admin-page/Admin";
import AdminLogin from "./pages/home-page/admin-page/AdminLogin";

function App() {
  return (
    <div className="app">
      <div className="logo-banner">
        <img src={LogoBanner} alt="logo-banner" className="logo-banner" />
      </div>
      <Header />
      <div className="app-content">
        <Home />
      </div>
      <Footer />
    </div>
  );
}

export default App;
