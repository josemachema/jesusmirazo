import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { EngagementProvider } from "@/contexts/EngagementContext";

export const metadata: Metadata = {
  title: "Rocky Point Real Estate | Jesus Mirazo - Coldwell Banker",
  description: "Your trusted real estate agent for property rentals and sales in Rocky Point (Puerto Peñasco), Mexico. Find your perfect beachfront paradise with Jesus Mirazo, top Coldwell Banker agent.",
  keywords: "Rocky Point real estate, Puerto Peñasco properties, Mexico beach rentals, oceanfront condos, vacation homes, Coldwell Banker, beachfront properties, real estate agent",
  authors: [{ name: "Jesus Mirazo" }],
  creator: "Jesus Mirazo - Coldwell Banker",
  publisher: "Coldwell Banker",
  robots: "index, follow",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rockypointjesus.com",
    siteName: "Rocky Point Real Estate - Jesus Mirazo",
    title: "Rocky Point Real Estate | Jesus Mirazo - Coldwell Banker",
    description: "Find your dream beachfront property in Rocky Point with Jesus Mirazo, top Coldwell Banker agent. Vacation rentals and homes for sale.",
    images: [
      {
        url: "/hero-beach.jpg",
        width: 1200,
        height: 630,
        alt: "Rocky Point Beach - Puerto Peñasco Real Estate",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Rocky Point Real Estate | Jesus Mirazo",
    description: "Your trusted real estate expert in Rocky Point. Vacation rentals and beachfront properties for sale.",
    images: ["/hero-beach.jpg"],
    creator: "@JesusMirazoRE",
  },

  // Verification
  verification: {
    google: "google-site-verification-code", // TODO: Add after Google Search Console setup
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Google Analytics - GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="antialiased">
        <EngagementProvider>
          {children}
        </EngagementProvider>
      </body>
    </html>
  );
}
