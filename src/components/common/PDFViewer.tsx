import React from 'react';

interface PDFViewerProps {
  pdfUrl: string | null;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  return (
    <div>
      {pdfUrl ? <iframe src={pdfUrl} width="100%" height="900px" title="PDF Viewer" /> : <p>Please select a PDF file from the sidebar.</p>}
    </div>
  );
};
export default PDFViewer;
