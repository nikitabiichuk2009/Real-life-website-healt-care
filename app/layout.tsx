import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

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
    <ClerkProvider
      afterSignOutUrl={"/"}
      appearance={{
        baseTheme: dark,
        layout: {
          logoImageUrl: "/assets/icons/logo-full.svg",
          socialButtonsVariant: "iconButton",
        },
      }}
    >
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-dark-300 font-sans antialiased",
            font.variable
          )}
        >
          <ThemeProvider attribute="dark" defaultTheme="dark">
            <Toaster />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
