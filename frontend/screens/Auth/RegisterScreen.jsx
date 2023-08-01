import { Button, Text, View } from 'react-native';

export default function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is the Register Screen</Text>
      <Button title="Go to login" onPress={() => navigation.navigate('Login Screen')} />
    </View>
  );
}
