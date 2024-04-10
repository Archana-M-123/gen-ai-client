import React, { useState, useEffect } from 'react';

interface FileListSidebarProps {
  onSelectPdf: (pdfUrl: string) => void;
  pdfList: { name: string; url: string }[];
}

const FileListSidebar: React.FC<FileListSidebarProps> = ({ onSelectPdf, pdfList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFiles, setFilteredFiles] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    setFilteredFiles(pdfList);
  }, [pdfList]);

  const searchFiles = () => {
    const filtered = pdfList.filter(pdf => pdf.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredFiles(filtered);
  };

  const handlePdfClick = (pdfUrl: string) => {
    onSelectPdf(pdfUrl);
  };

  return (
    <div className="w-1/6 px-2">
      <div className="flex flex-row border border-blue-500 pt-1 pb-1">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search files"
          className="pl-1 focus:outline-none"
        />
        <button onClick={searchFiles} className="">
          <img src="/search.jpg" alt="Search" className="w-[33px] h-[33px]" />
        </button>
      </div>
      <div className="/folder.png flex flex-row">
        <img src="/folder.jpg" alt="folder" className="w-[60px] h-[60px]" />
        <div className="mt-5">[SAMPLE]Collections</div>
      </div>
      <div className="ml-4">{pdfList.length} files</div>

      <ul className="mt-2 ml-8">
        {filteredFiles.map((file, index) => (
          <li key={index} onClick={() => handlePdfClick(file.url)} style={{ cursor: 'pointer' }}>
            <div className="flex flex-row">
              <img src="/pdf.jpg" alt="pdf" className="w-[33px] h-[33px] mb-4" />
              {file.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileListSidebar;
