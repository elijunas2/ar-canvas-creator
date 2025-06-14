
import React from 'react';

interface ARErrorScreenProps {
  missingFiles: string[];
}

const ARErrorScreen: React.FC<ARErrorScreenProps> = ({ missingFiles }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-yellow-50">
      <div className="max-w-md bg-white rounded-lg shadow-lg p-8 border border-yellow-300 text-center">
        <h2 className="text-xl font-bold text-yellow-700 mb-4">Trūksta būtinų failų</h2>
        <p className="text-gray-800 mb-2">
          AR vizualizacijai veikiant, būtini šie failai:
        </p>
        <ul className="mb-4 text-left text-sm list-disc list-inside text-yellow-800">
          {missingFiles.map(f => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <p className="text-gray-600 text-sm mb-4">
          Prašome pridėti trūkstamus failus į <code className="bg-gray-100 px-2 rounded">public</code> katalogą.  
          <br />
          Po to – perkraukite (deploy) aplikaciją.
        </p>
        <div className="space-y-2">
          <a
            href="https://hiukim.github.io/mind-ar-js-doc/tools/compile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-100 border border-yellow-500 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200 transition"
          >
            MindAR .mind generatorius
          </a>
          <br />
          <button 
            onClick={() => window.history.back()}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Grįžti atgal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ARErrorScreen;
