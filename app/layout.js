import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./ThemeProvider";
import Navbar from "./components/navbar/page";
import { ChakraProvider } from "@chakra-ui/react";
import Googleadsec from "./Gogeladasence"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HTML GAMES",
  description: "ONLINE BEST GAME",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Googleadsec />

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
