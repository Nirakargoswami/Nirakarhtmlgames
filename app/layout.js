import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./ThemeProvider";
import Navbar from "./components/navbar/page";
import { ChakraProvider } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HTML GAMES",
  description: "ONLINE BEST GAME",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6763007387304477" crossOrigin="anonymous"
        ></script> */}
        
      </head>
      <body style={{ background: "#020528" }}>
        <ThemeProvider>
          <ChakraProvider>
            <Navbar />
            {children}
          </ChakraProvider>

        </ThemeProvider>
      </body>
    </html>
  );
}
