import "./Home.scss";
import NewsPdf from "../../assets/Vijay-Karnataka.pdf";
import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";

const Home = () => {
  const [file] = useState(NewsPdf);
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(500);
  const [pageHeight, setPageHeight] = useState(790);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const updatePageSize = () => {
      setIsMobile(true);
      let containerWidth = window.innerWidth;
      let containerHeight = window.innerHeight;

      if (!(window.innerWidth < 1000)) {
        setIsMobile(false);
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
        {Array.from(new Array(numPages), (_, index) => (
          <div key={index}>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={index === 0 && <div>Loading PDF...</div>}
            >
              <Page
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={isMobile ? pageWidth : pageWidth * 2}
                height={pageHeight}
              />
            </Document>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
