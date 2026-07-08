import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ประกาศผลการแข่งขันทักษะทางวิชาการ ท่าโขลงวิชาการ 2569",
  description: "ตัวแทนสถานศึกษาในสังกัดเทศบาลเมืองราชบุรี ระดับภาคกลาง ประจำปี 2569",
  metadataBase: new URL("https://ratchaburi-academic-awards.vercel.app"),
  openGraph: {
    title: "ประกาศผลการแข่งขันทักษะทางวิชาการ ท่าโขลงวิชาการ 2569",
    description: "ติดตามผลการแข่งขันและสรุปเหรียญของสถานศึกษาในสังกัดเทศบาลเมืองราชบุรี",
    url: "https://ratchaburi-academic-awards.vercel.app",
    siteName: "ท่าโขลงวิชาการ 2569",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1536,
        height: 1024,
        alt: "ประกาศผลการแข่งขันทักษะทางวิชาการ ท่าโขลงวิชาการ 2569"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ประกาศผลการแข่งขันทักษะทางวิชาการ ท่าโขลงวิชาการ 2569",
    description: "ติดตามผลการแข่งขันและสรุปเหรียญของสถานศึกษาในสังกัดเทศบาลเมืองราชบุรี",
    images: ["/images/og-image.png"]
  }
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
