
import { useState, useEffect } from 'react';
import { AR_SCRIPTS } from '@/constants/arConfig';
import { playOnClickComponent } from '@/utils/arComponents';

// Extend Window interface to include AFRAME
declare global {
  interface Window {
    AFRAME: any;
  }
}

export const useARScripts = (shouldLoad: boolean) => {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    if (!shouldLoad) return;

    const loadScripts = async () => {
      console.log('Loading AR scripts...');
      
      // Load A-Frame
      if (!document.querySelector('script[src*="aframe"]')) {
        console.log('Loading A-Frame...');
        const aframeScript = document.createElement('script');
        aframeScript.src = AR_SCRIPTS.AFRAME;
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
        mindarScript.src = AR_SCRIPTS.MINDAR;
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

    loadScripts();
  }, [shouldLoad]);

  return scriptsLoaded;
};
