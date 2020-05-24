import * as React from 'react';
import {AppRegistry} from 'react-native';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import App from './App';

export default function Main() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#128496',
      accent: 'yellow',
      backgroundColor: 'red',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent('Questions', () => Main);
