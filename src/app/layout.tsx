import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Firstpharmajob Safety Database - Pharmacovigilance Management",
  description: "Professional pharmacovigilance and adverse event management platform for regulatory compliance",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%230f172a' width='100' height='100'/><text x='50' y='70' font-size='60' font-weight='bold' text-anchor='middle' fill='white'>F</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#1a3a5c" />
      </head>
      <body className="bg-argus-bg text-argus-text-primary font-sans">
        {children}
      </body>
    </html>
  );
}
