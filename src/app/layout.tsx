import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import ConditionalFooter from "@/components/ConditionalFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SettingsProvider } from "@/contexts/SettingsContext";
import DynamicMetadata from "@/components/DynamicMetadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Candour International - Leading Industrial MRO Solutions",
  description: "Candour International provides comprehensive MRO and procurement solutions across diverse industries, ensuring reliable supply chains and operational excellence for our global clients.",
  icons: {
    icon: [
      { url: '/images/branding/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/branding/favicon.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/images/branding/favicon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/images/branding/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SettingsProvider>
          <DynamicMetadata />
          <ConditionalHeader />
          {children}
          <ConditionalFooter />
          <WhatsAppButton phoneNumber="+966 54 642 6914" />
        </SettingsProvider>
      </body>
    </html>
  );
}
