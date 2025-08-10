import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Inly",
  description: "Break free from limiting patterns and build healthier habits with your AI-powered mental wellness companion, available 24/7.",

  openGraph: {
    title: "Inly – Your AI Mental Wellness Companion",
    description:
      "Break free from limiting patterns and build healthier habits with your AI-powered mental wellness companion, available 24/7.",
    url: defaultUrl,
    siteName: "Inly",
    images: [
      {
        url: `${defaultUrl}/images/homePage.png`,
        width: 1200,
        height: 630,
        alt: "Inly preview image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

const outfit = Outfit({
  variable: "--font-outfit",
  display: "swap",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} ${playfairDisplay.variable} antialiased`}>
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disabeTransitionOnChange
        > */}
        {children}
        {/* </ThemeProvider> */}
        <Analytics />
      </body>
    </html>
  );
}
