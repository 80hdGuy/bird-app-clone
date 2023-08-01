import React, { useContext } from 'react';
import { Button, View } from 'react-native';
import { AuthContext } from '../context/AuthProvider';

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext);
  return (
    <View
      style={{
        backgroundColor: '#1f2d2e',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
