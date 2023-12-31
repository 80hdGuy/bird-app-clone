import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axiosConfig from '../../utilities/axiosConfig';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [error, setError] = useState('');

  function register(email, username, password, confirmPassword) {
    setIsLoading(true);
    axiosConfig
      .post('/register', {
        name: name,
        email: email,
        username: username,
        password: password,
        password_confirmation: confirmPassword,
      })
      .then((response) => {
        navigation.navigate('Login Screen');

        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        const key = Object.keys(error.response.data.errors)[0];
        setError(error.response.data.errors[key][0]);
        setIsLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Register</Text>
      {error && <Text style={{ paddingHorizontal: 55, color: 'red' }}>{error}</Text>}
      <TextInput
        style={[styles.inputBox, styles.textSize16]}
        onChangeText={setName}
        value={name}
        placeholder="Name"
        placeholderTextColor="grey"
      />
      <TextInput
        style={[styles.inputBox, styles.textSize16]}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        placeholderTextColor="grey"
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.inputBox, styles.textSize16]}
        onChangeText={setUsername}
        value={username}
        placeholder="@handle"
        placeholderTextColor="grey"
      />
      <TextInput
        style={[styles.inputBox, styles.textSize16]}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor="grey"
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <TextInput
        style={[styles.inputBox, styles.textSize16]}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm password"
        placeholderTextColor="grey"
        autoCapitalize="none"
        secureTextEntry={true}
      />

      {isLoading ? (
        <ActivityIndicator style={{ height: 40 }} size="large" color="#08c5c7" />
      ) : (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            register(email, username, password, confirmPassword);
            setPassword('');
            setConfirmPassword('');
          }}>
          <Text style={[styles.loginButtonText, styles.textSize16]}>Register</Text>
        </TouchableOpacity>
      )}

      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.registerText, styles.textSize16]}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login Screen')}>
          <Text style={[styles.registerLink, styles.textSize16]}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  textSize16: {
    fontSize: 16,
  },
  headingText: {
    fontSize: 40,
    color: '#08c5c7',
  },
  inputBox: {
    color: '#08c5c7',
    width: 250,
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#373737',
    elevation: 5,
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 120,
    paddingHorizontal: 20,
    backgroundColor: '#08c5c7',
    borderRadius: 20,
  },
  loginButtonText: {
    color: '#181818',
    fontWeight: 'bold',
  },
  registerText: {
    marginRight: 16,
    color: 'grey',
  },
  registerLink: {
    color: '#08c5c7',
    textDecorationLine: 'underline',
  },
});
