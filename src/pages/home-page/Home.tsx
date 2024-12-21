import "./Home.scss";
import NewsPdf from "../../assets/Vijay-Karnataka.pdf";
import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { useSelector } from "react-redux";
import { RootState } from "../../store/app-store";

const Home = () => {
  const [file] = useState(NewsPdf);
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(500);
  const [pageHeight, setPageHeight] = useState(790);

  const isMobileDevice = useSelector<RootState>(
    (state) => state.uiControls.isMobileDevice
  );

  useEffect(() => {
    let containerWidth = window.innerWidth;
    let containerHeight = window.innerHeight;

    if (!isMobileDevice) {
      containerWidth = window.innerWidth * 0.8;
      containerHeight = window.innerHeight * 0.8;
      return;
    } else {
      const aspectRatio = 500 / 790;
      if (containerWidth / aspectRatio > containerHeight) {
        setPageHeight(containerHeight);
        setPageWidth(containerHeight * aspectRatio);
      } else {
        setPageWidth(containerWidth);
        setPageHeight(containerWidth / aspectRatio);
      }
    }
  }, [isMobileDevice]);

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
                width={isMobileDevice ? pageWidth : pageWidth * 2}
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
