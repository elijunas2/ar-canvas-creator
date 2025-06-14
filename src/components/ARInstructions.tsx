
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ARInstructions = () => {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">AR Canvas Creator - Setup Guide</CardTitle>
          <CardDescription>
            Follow these steps to set up your AR experience with test.png and test.mp4
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">📋 Required Files</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <div>
                  <strong>test.png</strong> - Your image target (the image to be tracked)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <div>
                  <strong>test.mp4</strong> - Your video content (will play on the tracked image)
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600">⚠</span>
                <div>
                  <strong>test.mind</strong> - Image target file (needs to be created from test.png)
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">🔧 Creating the .mind File</h3>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">1</span>
                <div>
                  Go to the <a href="https://hiukim.github.io/mind-ar-js-doc/tools/compile" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">MindAR Image Target Compiler</a>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">2</span>
                <div>Upload your <strong>test.png</strong> image</div>
              </li>
              <li className="flex gap-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">3</span>
                <div>Click "Start" to compile the image target</div>
              </li>
              <li className="flex gap-3">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">4</span>
                <div>Download the generated <strong>.mind</strong> file and rename it to <strong>test.mind</strong></div>
              </li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">📁 File Structure</h3>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <div>public/</div>
              <div className="ml-4">├── test.png</div>
              <div className="ml-4">├── test.mp4</div>
              <div className="ml-4">└── test.mind</div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Place all three files in the <code className="bg-gray-100 px-1 rounded">public</code> folder of your project
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">📱 Testing on Mobile</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <div>Deploy your app to <strong>HTTPS</strong> (required for camera access)</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <div>Use <strong>Chrome</strong> or <strong>Safari</strong> on mobile for best compatibility</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <div>Allow camera permissions when prompted</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <div>Point camera at the <strong>test.png</strong> image - video will appear on top</div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <div>Tap the video to play/pause</div>
              </li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">💡 Tips for Better Tracking</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Use high-contrast images with clear details</li>
              <li>• Avoid reflective or glossy surfaces</li>
              <li>• Ensure good lighting conditions</li>
              <li>• Keep the target image flat and unfolded</li>
              <li>• Print the image on paper for better results</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ARInstructions;
