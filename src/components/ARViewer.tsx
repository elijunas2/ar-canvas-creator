
import React, { useEffect, useRef, useState } from 'react';

// Extend Window interface to include AFRAME
declare global {
  interface Window {
    AFRAME: any;
  }
}

const TEST_FILES = [
  {src: "test.png", label: "test.png (target image)"},
  {src: "test.mp4", label: "test.mp4 (video)"},
  {src: "test.mind", label: "test.mind (image target file)"}
];

const ARViewer = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [missingFiles, setMissingFiles] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    console.log('ARViewer component mounted');
    
    // Check if the required files exist
    const checkFiles = async () => {
      console.log('Checking for required files...');
      const results = await Promise.all(
        TEST_FILES.map(async (file) => {
          try {
            const res = await fetch(`./${file.src}`, {method: "HEAD"});
            console.log(`File ${file.src}: ${res.ok ? 'EXISTS' : 'MISSING'}`);
            return res.ok ? null : file.label;
          } catch (error) {
            console.log(`File ${file.src}: ERROR -`, error);
            return file.label;
          }
        })
      );
      const missing = results.filter(Boolean) as string[];
      console.log('Missing files:', missing);
      setMissingFiles(missing);
      setChecked(true);
    };

    checkFiles();
  }, []);

  useEffect(() => {
    // Load required scripts dynamically
    const loadScripts = async () => {
      console.log('Loading AR scripts...');
      
      // Load A-Frame
      if (!document.querySelector('script[src*="aframe"]')) {
        console.log('Loading A-Frame...');
        const aframeScript = document.createElement('script');
        aframeScript.src = 'https://aframe.io/releases/1.4.0/aframe.min.js';
        document.head.appendChild(aframeScript);

        await new Promise((resolve) => {
          aframeScript.onload = () => {
            console.log('A-Frame loaded successfully');
            resolve(undefined);
          };
          aframeScript.onerror = (error) => {
            console.error('Failed to load A-Frame:', error);
            resolve(undefined);
          };
        });
      }

      // Load MindAR
      if (!document.querySelector('script[src*="mindar"]')) {
        console.log('Loading MindAR...');
        const mindarScript = document.createElement('script');
        mindarScript.src = 'https://cdn.jsdelivr.net/npm/mind-ar@1.2.2/dist/mindar-image-aframe.prod.js';
        document.head.appendChild(mindarScript);

        await new Promise((resolve) => {
          mindarScript.onload = () => {
            console.log('MindAR loaded successfully');
            resolve(undefined);
          };
          mindarScript.onerror = (error) => {
            console.error('Failed to load MindAR:', error);
            resolve(undefined);
          };
        });
      }

      // Register the play-on-click component after A-Frame loads
      if (window.AFRAME && !window.AFRAME.components['play-on-click']) {
        console.log('Registering play-on-click component...');
        window.AFRAME.registerComponent('play-on-click', playOnClickComponent);
      }
      
      setScriptsLoaded(true);
      console.log('All AR scripts loaded');
    };

    if (checked && missingFiles.length === 0) {
      loadScripts();
    }
  }, [checked, missingFiles]);

  if (!checked) {
    console.log('Still checking files...');
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black text-white">
        <div className="text-lg">Tikrinama projekto aplinkos failus...</div>
      </div>
    );
  }

  if (missingFiles.length > 0) {
    console.log('Missing files detected, showing warning');
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
  }

  if (!scriptsLoaded) {
    console.log('Scripts still loading...');
    return (
      <div className="w-full h-screen flex justify-center items-center bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-lg">Kraunami AR komponentai...</div>
        </div>
      </div>
    );
  }

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

// Component to handle video play on click
const playOnClickComponent = {
  init: function() {
    this.el.addEventListener('click', () => {
      const video = this.el.components.material.material.map.image;
      if (video && typeof video.play === "function" && typeof video.pause === "function") {
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  }
};

export default ARViewer;
