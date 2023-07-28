import React from 'react';
import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconCalendar from '../assets/icons/IconCalendar';
import IconLink from '../assets/icons/IconLink';
import IconLocation from '../assets/icons/IconLocation';

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

export default function ProfileScreen() {
  const renderItem = ({ item }) => (
    <View style={{ marginVertical: 20 }}>
      <Text>{item.title}</Text>
    </View>
  );

  const profileHeader = () => (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={{
          uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&%20ixid=MnwxMjA3fDB8MHxwaG90by1wYWdl%20fHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
        }}
      />
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        />
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.profileName}>Rihards Jansons</Text>
        <Text style={styles.profileHandle}>@1080hdGuy</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          CEO of CEOs. The best of the best. {'\n'}Currently hacking a way into Elons
          mission to Mars.
        </Text>
      </View>
      <View style={styles.locationContainer}>
        <IconLocation width={20} height={20} color="gray"></IconLocation>
        <Text style={styles.textGrey}>Ogre, Latvia</Text>
      </View>
      <View style={styles.linkContainer}>
        <TouchableOpacity
          style={styles.linkItem}
          onPress={() => Linking.openURL('https://github.com/80hdGuy')}>
          <IconLink width={20} height={20} color="gray"></IconLink>
          <Text style={styles.linkColor}>github.com</Text>
        </TouchableOpacity>
        <View style={[styles.linkItem, styles.ml4]}>
          <IconCalendar width={20} height={20} color="gray"></IconCalendar>
          <Text style={styles.textGrey}>Joined June 2023</Text>
        </View>
      </View>
      <View style={styles.followContainer}>
        <View style={styles.followItem}>
          <Text style={styles.followItemNumber}>590</Text>
          <Text style={styles.followItemLabel}>Following</Text>
        </View>
        <View style={[styles.followItem, styles.ml4]}>
          <Text style={styles.followItemNumber}>2,354</Text>
          <Text style={styles.followItemLabel}>Followers</Text>
        </View>
      </View>
      <View style={styles.seperator}></View>
    </View>
  );

  return (
    <FlatList
      style={{ backgroundColor: '#c8c8c8' }}
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.tweetSeperator}></View>}
      ListHeaderComponent={profileHeader}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8c8c8',
  },
  textGrey: {
    color: 'gray',
  },
  ml4: {
    marginLeft: 16,
  },
  backgroundImage: {
    width: 800,
    height: 120,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    marginTop: -34,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#c8c8c8',
  },
  followButton: {
    backgroundColor: '#0f1418',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 24,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  nameContainer: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  profileName: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  profileHandle: {
    color: 'gray',
    marginTop: 1,
  },
  descriptionContainer: {
    paddingHorizontal: 10,
    marginTop: 8,
  },
  description: {
    lineHeight: 22,
  },
  locationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 12,
  },
  linkContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 12,
  },
  linkColor: {
    color: '#0090ef',
  },
  linkItem: {
    flexDirection: 'row',
  },
  followContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  followItem: {
    flexDirection: 'row',
  },
  followItemNumber: {
    fontWeight: 'bold',
  },
  followItemLabel: {
    marginLeft: 4,
  },
  seperator: {
    borderBottomWidth: 1,
    borderBlockColor: '#E5E7EB',
  },
  tweetSeperator: {
    borderBottomWidth: 1,
    borderColor: '#949494',
  },
});
