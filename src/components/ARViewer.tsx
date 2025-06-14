
import React, { useEffect, useRef } from 'react';

const ARViewer = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load required scripts dynamically
    const loadScripts = async () => {
      // Load A-Frame
      if (!document.querySelector('script[src*="aframe"]')) {
        const aframeScript = document.createElement('script');
        aframeScript.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
        document.head.appendChild(aframeScript);
        
        await new Promise((resolve) => {
          aframeScript.onload = resolve;
        });
      }

      // Load MindAR
      if (!document.querySelector('script[src*="mindar"]')) {
        const mindarScript = document.createElement('script');
        mindarScript.src = 'https://cdn.jsdelivr.net/npm/mind-ar@1.2.2/dist/mindar-image-aframe.prod.js';
        document.head.appendChild(mindarScript);
        
        await new Promise((resolve) => {
          mindarScript.onload = resolve;
        });
      }
    };

    loadScripts();
  }, []);

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
        </div>
      </div>
    </div>
  );
};

// Component to handle video play on click
const playOnClickComponent = {
  init: function() {
    this.el.addEventListener('click', () => {
      const video = this.el.components.material.material.map.image;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  }
};

// Register the component when A-Frame is loaded
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    if (window.AFRAME) {
      window.AFRAME.registerComponent('play-on-click', playOnClickComponent);
    }
  });
}

export default ARViewer;
