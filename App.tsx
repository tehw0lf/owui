import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

const App = () => {
  const injectedJavaScript = `
  setTimeout(() => {
    document.getElementsByName('email')[0].value = "lars@local.local";
    document.getElementsByName('current-password')[0].value = "oL9PCJ;&,$w=s>+\\srD[ W37tc$3X<zKZ?M4/2MC3o;|d7mg>-i%K%X?j(e'=5Df";
    document.getElementsByTagName('form')[0].submit();
    }, 500);
  `;
  return (
    <View>
      <WebView
        source={{uri: 'http:192.168.42.20:3000/auth'}}
        originWhitelist={['*']}
        injectedJavaScript={injectedJavaScript}
      />
    </View>
  );
};

export default App;
