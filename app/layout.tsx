import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
// import Appbaar from "./components/Appbaar";


// import { AuthProvider } from './lib/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Attendy",
  description: "A Web Attendance tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {/* <Appbaar/> */}
        {children}
        </body>
        <Footer/>
    </html>
  );
}
