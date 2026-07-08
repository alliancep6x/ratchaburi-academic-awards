import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ประกาศผลการแข่งขันทักษะทางวิชาการ ท่าโขลงวิชาการ 2569",
  description: "ตัวแทนสถานศึกษาในสังกัดเทศบาลเมืองราชบุรี ระดับภาคกลาง ประจำปี 2569"
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
