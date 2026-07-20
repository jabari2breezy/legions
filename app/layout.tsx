import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Legions Club Tanzania - Youth-Led Humanitarian & Environmental Action',
  description: 'Legions Club is a student-led non-profit based in Dar es Salaam mobilizing youth for humanitarian and environmental impact. 139 volunteers, 2600+ service hours, tree planting, hospital renovations, orphan support.',
  keywords: ['youth non-profit', 'student volunteers', 'Dar es Salaam', 'humanitarian aid', 'environmental action', 'Tanzania'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;900&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full antialiased">
        {/* Global grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}