
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ARViewer from '@/components/ARViewer';
import ARInstructions from '@/components/ARInstructions';

const Index = () => {
  const [showAR, setShowAR] = useState(false);

  if (showAR) {
    return <ARViewer />;
  }

  return (
    <div className="min-h-screen bg-red-500">
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AR Canvas Creator
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Web-based AR experience using MindAR.js
          </p>
          <Button 
            onClick={() => setShowAR(true)}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Launch AR Experience
          </Button>
        </div>
        
        <ARInstructions />
      </div>
    </div>
  );
};

export default Index;
