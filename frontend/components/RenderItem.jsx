import { useNavigation } from '@react-navigation/native';
import { formatDistanceToNowStrict } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconComment from '../assets/icons/IconComment';
import IconHeart from '../assets/icons/IconHeart';
import IconRetweet from '../assets/icons/IconRetweet';
import IconShare from '../assets/icons/IconShare';
import formatDistance from '../utilities/formatDistanceCustom';

export default function RenderItem({ item: tweet }) {
  const navigation = useNavigation();

  function gotoProfile(userId) {
    navigation.navigate('Profile Screen', {
      userId: userId,
    });
  }

  function gotoSingleTweet(tweetId) {
    navigation.navigate('Tweet Screen', {
      tweetId: tweetId,
    });
  }

  return (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => gotoProfile(tweet.user.id)}>
        <Image style={styles.avatar} source={{ uri: tweet.user.avatar }} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => gotoSingleTweet(tweet.id)}>
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
          onPress={() => gotoSingleTweet(tweet.id)}>
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
}

const styles = StyleSheet.create({
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
});
