
import React, { useRef } from 'react';

const ARScene: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  console.log('Rendering AR scene');

  return (
    <div className="w-full h-screen bg-black relative">
      <div 
        ref={sceneRef}
        className="w-full h-full"
        dangerouslySetInnerHTML={{
          __html: `
            <a-scene 
              mindar-image="imageTargetSrc: ./test.mind; showStats: false; uiScanning: #scanning; uiError: #error; uiLoading: #loading;"
              color-space="sRGB" 
              renderer="colorManagement: true, physicallyCorrectLights"
              vr-mode-ui="enabled: false" 
              device-orientation-permission-ui="enabled: false"
              style="width: 100%; height: 100%;"
            >
              <a-assets>
                <video
                  id="test-video"
                  src="./test.mp4"
                  preload="auto"
                  response-type="arraybuffer"
                  loop
                  crossorigin
                  webkit-playsinline
                  autoplay
                  muted
                  playsinline
                ></video>
              </a-assets>

              <a-camera
                position="0 0 0"
                look-controls="enabled: false"
                cursor="fuse: false; rayOrigin: mouse;"
                raycaster="far: 10000; objects: .clickable"
              ></a-camera>

              <a-entity mindar-image-target="targetIndex: 0">
                <a-video
                  src="#test-video"
                  position="0 0 0"
                  height="1"
                  width="1.78"
                  rotation="-90 0 0"
                  class="clickable"
                  play-on-click
                ></a-video>
              </a-entity>
            </a-scene>
          `
        }}
      />
      
      {/* Loading and Error UI */}
      <div id="loading" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading AR Experience...</p>
        </div>
      </div>
      
      <div id="scanning" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 text-white">
        <div className="text-center">
          <div className="w-48 h-48 border-4 border-dashed border-white rounded-lg mx-auto mb-4 animate-pulse"></div>
          <p className="text-lg">Point camera at test.png image</p>
          <p className="text-sm mt-2 opacity-75">Make sure the image is well lit and clearly visible</p>
        </div>
      </div>
      
      <div id="error" className="absolute inset-0 flex items-center justify-center bg-red-900 bg-opacity-80 text-white">
        <div className="text-center">
          <p className="text-lg mb-2">Camera Access Required</p>
          <p className="text-sm">Please allow camera permissions and refresh the page</p>
          <button 
            onClick={() => window.history.back()}
            className="mt-4 bg-white text-red-900 px-4 py-2 rounded hover:bg-gray-100"
          >
            Grįžti atgal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ARScene;
