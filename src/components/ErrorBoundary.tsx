
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('ErrorBoundary caught an error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary details:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-screen flex justify-center items-center bg-red-50">
          <div className="max-w-md bg-white rounded-lg shadow-lg p-8 border border-red-300 text-center">
            <h2 className="text-xl font-bold text-red-700 mb-4">Įvyko klaida</h2>
            <p className="text-gray-800 mb-4">
              Aplikacijoje įvyko nenumatyta klaida.
            </p>
            <details className="text-left text-sm bg-gray-100 p-4 rounded mb-4">
              <summary className="cursor-pointer font-medium">Techninė informacija</summary>
              <pre className="mt-2 text-xs overflow-auto">
                {this.state.error?.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Perkrauti puslapį
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
