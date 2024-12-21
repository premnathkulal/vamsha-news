import "./Home.scss";
import NewsPdf from "../../assets/Vijay-Karnataka.pdf";
import { Document, Page } from "react-pdf";
import HTMLFlipBook from "react-pageflip";
import { useEffect, useState } from "react";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";
// import "react-pageflip/dist/index.css";

const Home = () => {
  const [file] = useState(NewsPdf); // Replace with your PDF path
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(500); // Width of the flipbook pages
  const [pageHeight, setPageHeight] = useState(700); // Height of the flipbook pages

  useEffect(() => {
    const updatePageSize = () => {
      const containerWidth = window.innerWidth * 0.8; // Adjust according to layout
      const containerHeight = window.innerHeight * 0.8; // Adjust according to layout
      const aspectRatio = 500 / 700; // Flipbook aspect ratio

      if (containerWidth / aspectRatio > containerHeight) {
        setPageHeight(containerHeight);
        setPageWidth(containerHeight * aspectRatio);
      } else {
        setPageWidth(containerWidth);
        setPageHeight(containerWidth / aspectRatio);
      }
    };

    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => {
    setNumPages(numPages);
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px auto",
          width: "80%",
        }}
      >
        <HTMLFlipBook
          width={pageWidth}
          height={pageHeight}
          showCover={true}
          className=""
          startPage={1}
          size="fixed"
          minWidth={pageWidth}
          maxWidth={pageWidth}
          minHeight={pageHeight}
          maxHeight={pageHeight}
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
                  width={pageWidth}
                  height={pageHeight}
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
