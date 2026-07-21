'use client';

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="h-screen w-full bg-[var(--color-bg-deep)] flex items-center justify-center p-8 text-center">
          <h1 className="font-[Playfair_Display] text-4xl text-white mb-4">Something went wrong</h1>
          <p className="text-white/70 font-[Poppins] mb-6 max-w-md mx-auto">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };