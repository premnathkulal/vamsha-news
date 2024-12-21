import "./Home.scss";
import NewsPdf from "../../assets/Vijay-Karnataka.pdf";
import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import HTMLFlipBook from "react-pageflip";

const Home = () => {
  const [file] = useState(NewsPdf);
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(500);
  const [pageHeight, setPageHeight] = useState(790);

  useEffect(() => {
    const updatePageSize = () => {
      let containerWidth = window.innerWidth;
      let containerHeight = window.innerHeight;

      if (!(window.innerWidth < 500)) {
        containerWidth = window.innerWidth * 0.8;
        containerHeight = window.innerHeight * 0.8;
        return;
      }
      const aspectRatio = 500 / 790;

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
    <div className="home">
      <div className="new-paper-container">
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
            <div key={index}>
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
