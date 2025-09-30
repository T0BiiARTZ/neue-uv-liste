import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ÜV-Listen-Generator",
  description: "Einfache MVP-App zum Generieren von ÜV-Listen (Demo-Daten)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
