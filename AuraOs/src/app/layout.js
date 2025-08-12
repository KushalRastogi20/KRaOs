import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "./contexts/SettingsContext";
import { TerminalProvider } from '@/components/terminal/context';
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AuraOs",
  description: "AuraOs is a terminal-basedd operating system that provides a unique command line interface for managing files, launching applications, and curating a personalized computing experience."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SettingsProvider>
          <TerminalProvider>
            {children}
          </TerminalProvider>
        </SettingsProvider>

      </body>
    </html>
  );
}
