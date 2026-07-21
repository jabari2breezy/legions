import Head from 'next/head';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Add any client-side initialization here
  }, []);

  return (
    <>
      <Head>
        <title>Legions Club Tanzania - Youth-Led Humanitarian & Environmental Action</title>
        <meta name="description" content="Legions Club is a student-led non-profit based in Dar es Salaam mobilizing youth for humanitarian and environmental impact. 139 volunteers, 2600+ service hours, tree planting, hospital renovations, orphan support." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;900&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="h-screen w-full bg-[var(--color-bg-deep)] flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="font-[Playfair_Display] text-6xl text-white mb-4">Legions Club</h1>
          <p className="text-white/70 font-[Poppins] text-xl max-w-2xl mx-auto">
            Youth-led humanitarian and environmental action in Dar es Salaam
          </p>
          <p className="text-white/50 font-[Poppins] mt-4">
            Pages Router test - if you can see this, the basic structure works!
          </p>
        </div>
      </div>
    </>
  );
}