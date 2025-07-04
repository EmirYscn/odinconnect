import QueryProvider from "@/components/QueryProvider";
import { SocketProvider } from "@/contexts/SocketContext";
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "@/app/globals.css";
import ThemeClientLayout from "@/contexts/DarkMode/ThemeClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Odin Connect",
    template: "Odin Connect | %s",
  },
  description:
    "Connect with your friends on OdinConnect, the social media platform for the Odin community.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-[var(--color-grey-600)] transition-colors duration-1000`}
      >
        <ThemeClientLayout>
          <QueryProvider>
            <SocketProvider>{children}</SocketProvider>
          </QueryProvider>
        </ThemeClientLayout>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </body>
    </html>
  );
}
