import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconComment from '../assets/icons/IconComment';
import IconDots from '../assets/icons/IconDots';
import IconHeart from '../assets/icons/IconHeart';
import IconRetweet from '../assets/icons/IconRetweet';
import IconShare from '../assets/icons/IconShare';

export default function TweetScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.profileConainer}>
        <TouchableOpacity style={styles.flexRow}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          />
          <View>
            <Text style={styles.tweetName}>Rihards Jansons</Text>
            <Text style={styles.tweetHandle}>@1080hdGuy</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <IconDots width={30} height={30} color="#3c3c3c"></IconDots>
        </TouchableOpacity>
      </View>
      <View style={styles.tweetContentContainer}>
        <Text style={styles.tweetContent}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam eos optio fuga
          ut commodi eum, earum autem vero cupiditate accusamus.
        </Text>
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
