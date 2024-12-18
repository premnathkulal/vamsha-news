import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <iframe
        src="https://docs.google.com/gview?url=https://drive.google.com/uc?id=1-Nc3Hd0jTrNgvIyiuAF14lvaUyui9vcU&embedded=true"
        // style="width: 100%; height: 800px"
        loading="eager"
        allowFullScreen
        frameBorder="0"
        scrolling="auto"
      ></iframe>
    </div>
  );
};

export default Home;
