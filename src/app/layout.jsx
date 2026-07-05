import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Free AEO Audit | Takumi Digital",
  description: "Is your business invisible to AI? Get your free Answer Engine Optimization audit and discover how AI assistants find your business.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
