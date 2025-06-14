
import { useState, useEffect } from 'react';
import { TEST_FILES } from '@/constants/arConfig';

export const useFileChecker = () => {
  const [missingFiles, setMissingFiles] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    console.log('Checking for required files...');
    
    const checkFiles = async () => {
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

  return { missingFiles, checked };
};
