import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  weight: ["400", "500", "700", "800"],
  subsets: ["arabic"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "كم باقي لين التخرج؟",
  description: "عد تنازلي ليوم التخرج",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${tajawal.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
