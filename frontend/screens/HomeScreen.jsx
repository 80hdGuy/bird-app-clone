import { API_BASE_URL } from '@env';
import axios from 'axios';
import { formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconComment from '../assets/icons/IconComment';
import IconHeart from '../assets/icons/IconHeart';
import IconPlus from '../assets/icons/IconPlus';
import IconRetweet from '../assets/icons/IconRetweet';
import IconShare from '../assets/icons/IconShare';
import formatDistance from '../utilities/formatDistanceCustom';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllTweets();
  }, []);

  function getAllTweets() {
    axios
      .get(API_BASE_URL + 'tweets')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function gotoProfile() {
    navigation.navigate('Profile Screen');
  }
  function gotoSingleTweet() {
    navigation.navigate('Tweet Screen');
  }
  function gotoNewTweet() {
    navigation.navigate('New Tweet');
  }

  const renderItem = ({ item: tweet }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => gotoProfile()}>
        <Image style={styles.avatar} source={{ uri: tweet.user.avatar }} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.flexRow} onPress={() => gotoSingleTweet()}>
          <Text numberOfLines={1} style={styles.tweetName}>
            {tweet.user.name}
          </Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>
            @{tweet.user.username}
          </Text>
          <Text style={styles.middot}>&middot;</Text>
          <Text numberOfLines={1} style={styles.tweetTimestamp}>
            {formatDistanceToNowStrict(new Date(tweet.created_at), {
              locale: {
                ...locale,
                formatDistance,
              },
            })}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tweetContentContainer}
          onPress={() => gotoSingleTweet()}>
          <Text style={styles.tweetContent}>{tweet.body}</Text>
        </TouchableOpacity>
        <View style={styles.tweetEngagement}>
          <TouchableOpacity style={styles.flexRow}>
            <IconComment
              width={22}
              height={22}
              color="gray"
              style={{ marginRight: 2 }}></IconComment>
            <Text style={styles.textGray}>456</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <IconRetweet
              width={22}
              height={22}
              color="gray"
              style={{ marginRight: 2 }}></IconRetweet>
            <Text style={styles.textGray}>4,556</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <IconHeart
              width={22}
              height={22}
              color="gray"
              style={{ marginRight: 2 }}></IconHeart>
            <Text style={styles.textGray}>922,225</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.flexRow, styles.ml4]}>
            <IconShare
              width={21}
              height={21}
              color="gray"
              style={{ marginRight: 2 }}></IconShare>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.tweetSeperator}></View>}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={() => gotoNewTweet()}>
        <IconPlus
          width={40}
          height={40}
          color="white"
          style={{ marginRight: 2 }}></IconPlus>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8c8c8',
  },
  tweetContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  tweetSeperator: {
    borderBottomWidth: 1,
    borderColor: '#949494',
  },
  avatar: {
    width: 42,
    height: 42,
    marginRight: 8,
    borderRadius: 21,
  },
  flexRow: {
    flexDirection: 'row',
  },
  tweetName: {
    fontWeight: 'bold',
    color: '#222222',
  },
  tweetHandle: {
    color: 'gray',
    marginHorizontal: 8,
  },

  middot: {
    color: 'gray',
  },
  tweetTimestamp: {
    fontStyle: 'italic',
    color: 'gray',
    marginHorizontal: 8,
  },
  tweetContentContainer: {
    marginTop: 4,
  },
  tweetContent: {
    lineHeight: 20,
  },
  textGray: {
    color: 'gray',
  },
  tweetEngagement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  ml4: {
    marginLeft: 16,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d9bf1',
    position: 'absolute',
    bottom: 20,
    right: 12,
  },
});
