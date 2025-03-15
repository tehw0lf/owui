import React, {useEffect, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {WebView} from 'react-native-webview';

const hostname = 'http:192.168.42.20:3000/';

const saveCredentials = async (username: string, password: string) => {
  await Keychain.setGenericPassword(username, password);
};

const loadCredentials = async () => {
  const credentials = await Keychain.getGenericPassword();
  if (credentials) {
    return credentials;
  }
  return null;
};

const App = () => {
  const [username] = useState(undefined);
  const [password] = useState(undefined);
  const [webViewVisible, setWebViewVisible] = useState(false);

  useEffect(() => {
    loadCredentials();
  }, []);

  const injectedJavaScript = `
    document.getElementsByName('email')[0].value = '${username}';
    document.getElementsByName('current-password')[0].value = '${password}';
    document.getElementsByTagName('form')[0].submit();
  `;

  const handleLogin = async () => {
    if (username && password) {
      if ((await loadCredentials()) == null) {
        saveCredentials(username, password);
      }
      setWebViewVisible(true);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {webViewVisible ? (
        <WebView
          source={{uri: hostname}}
          injectedJavaScript={injectedJavaScript}
        />
      ) : (
        <View>
          <Text>Open Web UI Autologin for {hostname}</Text>
          {!username && <TextInput placeholder="E-Mail" value={username} />}
          {!password && <TextInput placeholder="Password" value={password} />}
          <Button title="Login" onPress={handleLogin} />
        </View>
      )}
    </View>
  );
};

export default App;
