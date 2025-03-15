import React from 'react';
import {WebView} from 'react-native-webview';

const App = () => {
  const injectedJavaScript = `
    document.getElementsByName('email')[0].value = "lars@local.local";
    document.getElementsByName('current-password')[0].value = "oL9PCJ;&,$w=s>+\\srD[ W37tc$3X<zKZ?M4/2MC3o;|d7mg>-i%K%X?j(e'=5Df";
    document.getElementsByTagName('form')[0].submit();
  `;

  return (
    <WebView
      source={{uri: 'http:192.168.42.20:3000/'}}
      onLoad={() => injectedJavaScript}
    />
  );
};

export default App;
