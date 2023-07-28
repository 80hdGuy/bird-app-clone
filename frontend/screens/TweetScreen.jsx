import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TweetScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profileConainer}></View>
      <Text>Tweet Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8c8c8',
  },
});