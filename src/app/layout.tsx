import type { Metadata } from "next";
import "./globals.css";
import { EngagementProvider } from "@/contexts/EngagementContext";

export const metadata: Metadata = {
  title: "Rocky Point Real Estate | Jesus Mirazo - Coldwell Banker",
  description: "Your trusted real estate agent for property rentals and sales in Rocky Point (Puerto Peñasco), Mexico. Find your perfect beachfront paradise.",
  keywords: "Rocky Point real estate, Puerto Peñasco properties, Mexico beach rentals, oceanfront condos, vacation homes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <EngagementProvider>
          {children}
        </EngagementProvider>
      </body>
    </html>
  );
}
