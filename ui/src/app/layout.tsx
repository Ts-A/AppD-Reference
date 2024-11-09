import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FINOS | FDC3 AppD",
  description: "FINOS FDC3 App Directory Reference Implementation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-zinc-900">{children}</body>
    </html>
  );
}
