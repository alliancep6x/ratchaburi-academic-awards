import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ประกาศผลการแข่งขันทักษะทางวิชาการ ระดับภาคกลาง 2569",
  description: "สำนักการศึกษา เทศบาลเมืองราชบุรี"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="font-thai antialiased">{children}</body>
    </html>
  );
}
