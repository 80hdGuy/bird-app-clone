import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthContext } from '../context/AuthProvider';
import axiosConfig from '../utilities/axiosConfig';

export default function NewTweetScrean({ navigation }) {
  const [tweet, setTweet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  function sendTweet() {
    if (tweet.length === 0) {
      Alert.alert('Please enter a tweet.');
      return;
    }
    setIsLoading(true);
    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    axiosConfig
      .post(`tweets`, { body: tweet })
      .then((response) => {
        navigation.navigate('Home1', { newTweetAdded: response.data });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.tweetButtonContainer}>
        <Text style={tweet.length > 250 ? styles.textRed : styles.textGrey}>
          Characters left: {280 - tweet.length}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {isLoading && (
            <ActivityIndicator style={{ marginRight: 10 }} size="small" color="grey" />
          )}
          <TouchableOpacity
            style={styles.tweetButton}
            onPress={() => sendTweet()}
            disabled={isLoading}>
            <Text style={styles.tweetButtonText}>Tweet</Text>
          </TouchableOpacity>
        </View>
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
