import "./Home.scss";
import NewsPdf from "../../assets/Vijay-Karnataka.pdf";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import HTMLFlipBook from "react-pageflip";
// import "react-pageflip/dist/index.css";
import { useState } from "react";

const Home = () => {
  const [file] = useState(NewsPdf); // Replace with your PDF path
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => {
    setNumPages(numPages);
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>PDF Viewer with Page Flip</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px auto",
          width: "80%",
        }}
      >
        <HTMLFlipBook
          width={500}
          height={700}
          showCover={true}
          className=""
          startPage={1}
          size="fixed"
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1536}
          maxShadowOpacity={0.5}
          mobileScrollSupport={true}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          style={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
          showPageCorners={false}
          disableFlipByClick={false}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div key={index} className="demoPage">
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<div>Loading PDF...</div>}
              >
                <Page
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default Home;
