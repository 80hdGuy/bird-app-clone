import { useContext, useState } from 'react';
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native';
import { AuthContext } from '../../context/AuthProvider';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#212121',
      }}>
      <Text>Login screen</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        placeholderTextColor="grey"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor="grey"
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <Button title="Login" onPress={() => login(email, password)} />
      <Button title="Register" onPress={() => navigation.navigate('Register Screen')} />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {isLoading && (
        <ActivityIndicator style={{ marginTop: 8 }} size="large" color="grey" />
      )}
    </View>
  );
}
