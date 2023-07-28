import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import IconComment from '../assets/icons/IconComment';
import IconRetweet from '../assets/icons/IconRetweet';
import IconHeart from '../assets/icons/IconHeart';
import IconShare from '../assets/icons/IconShare';
import IconPlus from '../assets/icons/IconPlus';

const DATA = [
  {
    id: 1,
    title: 'First item',
  },
  {
    id: 2,
    title: 'Second item',
  },
  {
    id: 3,
    title: 'Third item',
  },
  {
    id: 4,
    title: 'Fourth item',
  },
  {
    id: 5,
    title: 'Fifth item',
  },
  {
    id: 6,
    title: 'Sixth item',
  },
  {
    id: 7,
    title: 'Seventh item',
  },
  {
    id: 8,
    title: 'Eighth item',
  },
  {
    id: 9,
    title: 'Ninth item',
  },
  {
    id: 10,
    title: 'Tenth item',
  },
];

export default function HomeScreen({ navigation }) {
  function gotoProfile() {
    navigation.navigate('Profile Screen');
  }
  function gotoSingleTweet() {
    navigation.navigate('Tweet Screen');
  }
  function gotoNewTweet() {
    navigation.navigate('New Tweet');
  }

  const renderItem = ({ item }) => (
    <View style={styles.tweetContainer}>
      <TouchableOpacity onPress={() => gotoProfile()}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => gotoSingleTweet()}>
          <Text numberOfLines={1} style={styles.tweetName}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.tweetHandle}>
            @handle
          </Text>
          <Text style={styles.middot}>&middot;</Text>
          <Text numberOfLines={1} style={styles.tweetTimestamp}>
            9m
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tweetContentContainer}
          onPress={() => gotoSingleTweet()}>
          <Text style={styles.tweetContent}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam
            assumenda aut corporis velit tempora alias, illum pariatur
            repudiandae repellendus excepturi!
          </Text>
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
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={styles.tweetSeperator}></View>
        )}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => gotoNewTweet()}>
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
