import "./SelectedPage.scss";
import "../../styles/AnnotationLayer.css";
import "../../styles/TextLayer.css";
import { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import html2canvas from "html2canvas";

interface SelectedPdfProps {
  pageNumber: number;
  pageWidth: number;
  pageHeight: number;
  newsPdf: string;
  resetPageNumber: () => void;
}

const SelectedPdf = (props: SelectedPdfProps) => {
  const { pageNumber, newsPdf, pageHeight, pageWidth, resetPageNumber } = props;
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const [isSelecting, setIsSelecting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectionArea, setSelectionArea] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (pageNumber !== 0 || imagePreview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [pageNumber, imagePreview]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pdfContainerRef.current &&
        !pdfContainerRef.current.contains(event.target as Node)
      ) {
        resetPageNumber();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Start the selection process
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    const container = pdfContainerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      setSelectionArea({
        x: clientX - rect.left,
        y: clientY - rect.top,
        width: 0,
        height: 0,
      });
      setIsSelecting(true); // Start the selection
    }
  };

  // Track the selection area while dragging
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isSelecting) return;

    const container = pdfContainerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const newWidth = clientX - rect.left - selectionArea.x;
      const newHeight = clientY - rect.top - selectionArea.y;

      setSelectionArea((prev) => ({
        ...prev,
        width: newWidth,
        height: newHeight,
      }));
    }
  };

  // End the selection process but keep the selection box visible
  const handleEnd = () => {
    handleSelect(); // Keep the selection box visible until "Select" is clicked
  };

  // Confirm the selection and capture the selected region
  const handleSelect = async () => {
    const container = pdfContainerRef.current;
    alert(container);
    if (container) {
      const selectionBox = container.querySelector(
        ".selection-box"
      ) as HTMLElement;
      if (selectionBox) selectionBox.style.display = "none";

      const canvas = await html2canvas(container, {
        x: selectionArea.x,
        y: selectionArea.y,
        width: selectionArea.width,
        height: selectionArea.height,
        scale: 3, // High resolution capture
        logging: true, // Optional: Enable logging to debug issues
        useCORS: true, // To support cross-origin content
      });
      setImagePreview(canvas.toDataURL("image/png"));
    }
  };

  // Reset selection area to allow a new selection after confirming
  const handleResetSelection = () => {
    setSelectionArea({ x: 0, y: 0, width: 0, height: 0 });
    setImagePreview(null);
    setIsSelecting(false);
  };

  const handleShare = async () => {
    if (imagePreview) {
      const shareData = {
        title: "Selected Area",
        text: "Check out this selected area from the PDF.",
        files: [
          new File(
            [await (await fetch(imagePreview)).blob()],
            "selected-area.png",
            { type: "image/png" }
          ),
        ],
      };

      if (navigator.canShare && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
        } catch (error) {
          console.error("Error sharing:", error);
        }
      } else {
        const link = document.createElement("a");
        link.href = imagePreview;
        link.download = "selected-area.png";
        link.click();
      }
    }
  };

  return (
    <div className="selected-page">
      {!imagePreview && (
        <div
          className="selected-page-container"
          ref={pdfContainerRef}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        >
          <Document file={newsPdf}>
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              width={pageWidth}
              height={pageHeight}
            />
          </Document>
          {selectionArea.width > 0 && selectionArea.height > 0 && (
            <div
              className="selection-box"
              style={{
                left: selectionArea.x,
                top: selectionArea.y,
                width: selectionArea.width,
                height: selectionArea.height,
              }}
            />
          )}
        </div>
      )}
      {imagePreview && (
        <div className="preview-section">
          <img src={imagePreview} alt="Selected content" />
          <div className="preview-control">
            <button onClick={handleShare}>Share Selected Area</button>
            <button onClick={handleResetSelection}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedPdf;
