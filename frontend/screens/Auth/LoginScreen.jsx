import { useContext, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { AuthContext } from '../../context/AuthProvider';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login screen</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        placeholder="Enter email address"
        placeholderTextColor="grey"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        placeholder="Enter password"
        placeholderTextColor="grey"
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <Button title="Login" onPress={() => login(email, password)} />
      <Button title="Register" onPress={() => navigation.navigate('Register Screen')} />
    </View>
  );
}
