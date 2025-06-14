
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ARViewer from '@/components/ARViewer';
import ARInstructions from '@/components/ARInstructions';

const Index = () => {
  const [showAR, setShowAR] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  useEffect(() => {
    console.log('Index component mounted');
    const info = [
      `URL: ${window.location.href}`,
      `User Agent: ${navigator.userAgent}`,
      `Screen: ${window.screen.width}x${window.screen.height}`,
      `Viewport: ${window.innerWidth}x${window.innerHeight}`,
      `Base URL: ${import.meta.env.BASE_URL || 'undefined'}`,
      `Mode: ${import.meta.env.MODE}`,
    ];
    setDebugInfo(info);
    console.log('Debug info:', info);
  }, []);

  if (showAR) {
    return <ARViewer />;
  }

  return (
    <div className="min-h-screen bg-green-500">
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AR Canvas Creator
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Web-based AR experience using MindAR.js
          </p>
          <Button 
            onClick={() => {
              console.log('Launch AR clicked');
              setShowAR(true);
            }}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Launch AR Experience
          </Button>
        </div>
        
        <ARInstructions />
        
        {/* Debug informacija development režime */}
        {import.meta.env.DEV && (
          <div className="mt-8 bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-white">Debug Info:</h3>
            <ul className="text-sm text-white opacity-75">
              {debugInfo.map((info, index) => (
                <li key={index} className="mb-1">{info}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
