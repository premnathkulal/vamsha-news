import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./pages/home-page/Home";
import LogoBanner from "./assets/logo-banner.jpeg";

function App() {
  return (
    <div className="app">
      <div className="logo-banner">
        <img src={LogoBanner} alt="logo-banner" className="logo-banner" />
      </div>
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
