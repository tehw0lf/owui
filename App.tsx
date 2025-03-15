import React from 'react';
import {WebView} from 'react-native-webview';

const App = () => {
  const injectedJavaScript = `
    document.getElementsByName('email')[0].value = "tehwolf@local.local";
    document.getElementsByName('current-password')[0].value = "LW#PJ{so9(Vwq]S%x*tbR?352+w+ pT#&Es4(\`27., 4W/~#FKg2t@:@JX^cq2pX";
    document.getElementsByTagName('form')[0].submit();
  `;

  return (
    <WebView
      source={{uri: 'http:192.168.42.20:3000/'}}
      injectedJavaScript={injectedJavaScript}
    />
  );
};

export default App;
