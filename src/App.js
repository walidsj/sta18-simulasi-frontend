import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Router } from './routes';
import { Helmet } from 'react-helmet';
import { RecoilRoot } from 'recoil';
import '@fontsource/nunito';
import theme from './theme';

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Helmet
          defaultTitle="Simulasi STA'18"
          titleTemplate="%s - Simulasi STA'18"
        />
        <Router />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
