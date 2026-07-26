import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Legions | Student-Led Impact in Tanzania",
  description: "Youth-led community action in Tanzania. Student-organized projects in education, environment, and infrastructure. Est. 2022, Dar es Salaam.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable} ${jetbrains.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
