import React, { ReactNode, useState } from 'react';
import FileListSidebar from './components/common/FileListSidebar';
import PDFViewer from './components/common/PDFViewer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [pdfViewerWidth, setPdfViewerWidth] = useState<string>('50%');
  const [pdfList, setPdfList] = useState<{ name: string; url: string }[]>([
    { name: 'sample1.pdf', url: '/sample1.pdf' },
    { name: 'sample2.pdf', url: '/sample2.pdf' },
    { name: 'sample3.pdf', url: '/sample3.pdf' },
  ]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    if (showSidebar) {
      setPdfViewerWidth('66.5%');
    } else {
      setPdfViewerWidth('50%');
    }
  };

  const handlePdfSelect = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
  };

  const handleFileUpload = (file: File | null) => {
    if (file) {
      const newPdf: { name: string; url: string } = {
        name: file.name,
        url: URL.createObjectURL(file),
      };
      setPdfList([...pdfList, newPdf]);
      setSelectedPdf(newPdf.url);
    }
  };

  return (
    <div className="main-layout">
      <div className="header flex flex-row ml-6 mt-2">
        <button onClick={toggleSidebar} className="">
          {showSidebar ? (
            <img src="/side-expand.svg" alt="Toggle Sidebar" width={20} height={20} />
          ) : (
            <img src="/side-collapse.png" alt="Toggle Sidebar" width={20} height={20} />
          )}
        </button>
        <div className="ml-6 mr-4 text-gray-300 text-[20px]">| </div>
        <img src="chatdoc.png" alt="alt" width={28} height={28} />
        <span className="title ml-2 font-extrabold text-[18px] text-gray-700">ChatDOC</span>
      </div>
      <hr className="my-3" />

      <div className="flex">
        {showSidebar && <FileListSidebar onSelectPdf={handlePdfSelect} pdfList={pdfList} />}
        <div className="w-1/2 px-4" style={{ width: pdfViewerWidth }}>
          {selectedPdf ? (
            <PDFViewer pdfUrl={selectedPdf} />
          ) : (
            <div>
              <input type="file" onChange={e => handleFileUpload(e.target.files ? e.target.files[0] : null)} />
            </div>
          )}
        </div>

        <div className="w-1/4 px-4" style={{ width: '200px' }}>
          Chat Section
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Layout;
