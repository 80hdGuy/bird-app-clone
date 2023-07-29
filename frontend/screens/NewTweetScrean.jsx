import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function NewTweetScrean({ navigation }) {
  const [tweet, setTweet] = useState('');

  function sendTweet() {
    navigation.navigate('Tab');
  }

  return (
    <View style={styles.container}>
      <View style={styles.tweetButtonContainer}>
        <Text style={tweet.length > 250 ? styles.textRed : styles.textGrey}>
          Characters left: {280 - tweet.length}
        </Text>
        <TouchableOpacity style={styles.tweetButton} onPress={() => sendTweet()}>
          <Text style={styles.tweetButtonText}>Tweet</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tweetBoxContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        />
        <TextInput
          style={styles.input}
          onChangeText={setTweet}
          value={tweet}
          placeholder="What's happening?"
          placeholderTextColor="grey"
          multiline
          maxLength={280}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textGrey: {
    color: 'grey',
  },
  textRed: {
    color: 'red',
  },
  ml4: {
    marginLeft: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#c8c8c8',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  tweetButtonContainer: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tweetButton: {
    backgroundColor: '#0090ef',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 24,
  },
  tweetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tweetBoxContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: 8,
    marginTop: 10,
    borderRadius: 21,
  },
  input: {
    flex: 1,
    fontSize: 18,
    lineHeight: 20,
    padding: 10,
  },
});
