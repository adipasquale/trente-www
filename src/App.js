import React from 'react';
import { theme, ThemeProvider, Box } from "@chakra-ui/core";
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        Trente ans !
      </Box>
    </ThemeProvider>
  );
}

export default App;
