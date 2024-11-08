import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FDC3 App Directory",
  description: "A reference app directory implementation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
