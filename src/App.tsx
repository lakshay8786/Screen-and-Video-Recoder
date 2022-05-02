import React from 'react';
import {AppHeader, MainRecoder} from '@UI'
import {ChakraProvider} from '@chakra-ui/react'
import theme from 'theme';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <AppHeader />
      <MainRecoder />
    </ChakraProvider>
  );
}

export default App;
