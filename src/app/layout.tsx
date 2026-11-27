import "./globals.css";

import { Inter } from "next/font/google";
import localFont from "next/font/local";

import Providers from "@/components/layout/Providers";
import SiteAnalytics from "@/components/layout/SiteAnalytics";
import ViewportShell from "@/components/layout/ViewportShell";

export { metadata } from "./metadata";

const glacialIndifference = localFont({
  src: [
    {
      path: "../../fonts/GlacialIndifference-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/GlacialIndifference-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-glacial",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${glacialIndifference.variable} ${inter.variable} h-full overflow-x-hidden antialiased`}
    >
      <body className="h-screen max-h-screen overflow-hidden bg-[#F7F8F3] text-[#735E53] selection:bg-[#D9621E]/20">
        <Providers>
          <ViewportShell>{children}</ViewportShell>
        </Providers>
        <SiteAnalytics />
      </body>
    </html>
  );
}