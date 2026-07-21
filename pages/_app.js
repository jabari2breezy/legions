import '../styles/globals.css';
import { ErrorBoundary } from '../components/ui/ErrorBoundary';
import { CustomCursor } from '../components/ui/CustomCursor';

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="h-screen w-full bg-[#060A14] flex items-center justify-center p-8 text-center">
          <div>
            <h1 className="text-4xl text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Something went wrong</h1>
            <p className="text-white/70 mb-6 max-w-md mx-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
              The page failed to load. Please refresh or try again later.
            </p>
          </div>
        </div>
      }
    >
      <CustomCursor />
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
