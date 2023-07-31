import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconComment from '../assets/icons/IconComment';
import IconDots from '../assets/icons/IconDots';
import IconHeart from '../assets/icons/IconHeart';
import IconRetweet from '../assets/icons/IconRetweet';
import IconShare from '../assets/icons/IconShare';
import axiosConfig from '../utilities/axiosConfig';

export default function TweetScreen({ route, navigation }) {
  const [tweetData, setTweetData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTweet();
  }, []);

  function getTweet() {
    axiosConfig
      .get(`tweets/${route.params.tweetId}`)
      .then((response) => {
        setTweetData(response.data);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  function gotoProfile(userId) {
    navigation.navigate('Profile Screen', {
      userId: userId,
    });
  }
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 8 }} size="large" color="grey" />
      ) : (
        <>
          <View style={styles.profileConainer}>
            <TouchableOpacity
              style={styles.flexRow}
              onPress={() => gotoProfile(tweetData.user.id)}>
              <Image style={styles.avatar} source={{ uri: tweetData.user.avatar }} />
              <View>
                <Text style={styles.tweetName}>{tweetData.user.name}</Text>
                <Text style={styles.tweetHandle}>@{tweetData.user.username}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <IconDots width={30} height={30} color="#3c3c3c"></IconDots>
            </TouchableOpacity>
          </View>
          <View style={styles.tweetContentContainer}>
            <Text style={styles.tweetContent}>{tweetData.body}</Text>
            <View style={styles.tweetTimestampContainer}>
              <Text style={styles.tweetTimestampText}>
                {format(new Date(tweetData.created_at), 'h:mm a')}
              </Text>
              <Text style={styles.tweetTimestampText}>&middot;</Text>
              <Text style={styles.tweetTimestampText}>
                {format(new Date(tweetData.created_at), 'd MMM. yy')}
              </Text>
              <Text style={styles.tweetTimestampText}>&middot;</Text>
              <Text style={[styles.tweetTimestampText, styles.linkColor]}>
                Twitter for android
              </Text>
            </View>
          </View>
          <View style={styles.tweetEngagement}>
            <View style={styles.flexRow}>
              <Text style={styles.tweetEngagementNumber}>628</Text>
              <Text style={styles.tweetEngagementLabel}>Retweets</Text>
            </View>
            <View style={[styles.flexRow, styles.ml4]}>
              <Text style={styles.tweetEngagementNumber}>38</Text>
              <Text style={styles.tweetEngagementLabel}>Quote Tweets</Text>
            </View>
            <View style={[styles.flexRow, styles.ml4]}>
              <Text style={styles.tweetEngagementNumber}>2,934</Text>
              <Text style={styles.tweetEngagementLabel}>Likes</Text>
            </View>
          </View>
          <View style={[styles.tweetEngagement, styles.spaceAround]}>
            <TouchableOpacity>
              <IconComment width={22} height={22} color="gray"></IconComment>
            </TouchableOpacity>
            <TouchableOpacity>
              <IconRetweet width={22} height={22} color="gray"></IconRetweet>
            </TouchableOpacity>
            <TouchableOpacity>
              <IconHeart width={22} height={22} color="gray"></IconHeart>
            </TouchableOpacity>
            <TouchableOpacity>
              <IconShare width={22} height={22} color="gray"></IconShare>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8c8c8',
  },
  flexRow: {
    flexDirection: 'row',
  },
  profileConainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 8,
    borderRadius: 25,
  },
  tweetName: {
    fontWeight: 'bold',
    color: '#222222',
  },
  tweetHandle: {
    color: 'gray',
    marginTop: 4,
  },
  tweetContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tweetContent: {
    fontSize: 20,
    lineHeight: 30,
  },
  tweetTimestampContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  tweetTimestampText: {
    color: 'gray',
    marginRight: 6,
  },
  linkColor: {
    color: '#1d9bf1',
  },
  tweetEngagement: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tweetEngagementNumber: {
    fontWeight: 'bold',
  },
  tweetEngagementLabel: {
    color: 'grey',
    marginLeft: 6,
  },
  ml4: {
    marginLeft: 16,
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
});
