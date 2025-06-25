"use client";
import { ThemeContextProvider } from "@/contexts/DarkMode/ThemeContextProvider";

export default function ThemeClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}
