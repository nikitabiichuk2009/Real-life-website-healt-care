import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "600", "800", "200"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CarePulse created by Nikita Biichuk",
  icons: {
    icon: "/assets/icons/logo-icon.svg",
  },
  description: "CarePulse - healthcare platform created by Nikita Biichuk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          font.variable
        )}
      >
        <ThemeProvider attribute="dark" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
