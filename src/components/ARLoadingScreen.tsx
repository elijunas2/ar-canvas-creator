
import React from 'react';

interface ARLoadingScreenProps {
  message: string;
}

const ARLoadingScreen: React.FC<ARLoadingScreenProps> = ({ message }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-black text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
        <div className="text-lg">{message}</div>
      </div>
    </div>
  );
};

export default ARLoadingScreen;
