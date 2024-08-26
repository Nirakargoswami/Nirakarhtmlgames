// app/theme-provider.js 👈🏽

'use client';

import { ChakraProvider } from '@chakra-ui/react'

export default function ThemeProvider({ children }) {
  return (
    <ChakraProvider>
      {children}
    </ChakraProvider>
  );
}