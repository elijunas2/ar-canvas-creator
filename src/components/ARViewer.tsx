
import React, { useEffect } from 'react';
import { useFileChecker } from '@/hooks/useFileChecker';
import { useARScripts } from '@/hooks/useARScripts';
import ARLoadingScreen from '@/components/ARLoadingScreen';
import ARErrorScreen from '@/components/ARErrorScreen';
import ARScene from '@/components/ARScene';

const ARViewer = () => {
  const { missingFiles, checked } = useFileChecker();
  const shouldLoadScripts = checked && missingFiles.length === 0;
  const scriptsLoaded = useARScripts(shouldLoadScripts);

  useEffect(() => {
    console.log('ARViewer component mounted');
  }, []);

  if (!checked) {
    console.log('Still checking files...');
    return <ARLoadingScreen message="Tikrinama projekto aplinkos failus..." />;
  }

  if (missingFiles.length > 0) {
    console.log('Missing files detected, showing warning');
    return <ARErrorScreen missingFiles={missingFiles} />;
  }

  if (!scriptsLoaded) {
    console.log('Scripts still loading...');
    return <ARLoadingScreen message="Kraunami AR komponentai..." />;
  }

  return <ARScene />;
};

export default ARViewer;
