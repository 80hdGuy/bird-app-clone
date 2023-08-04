import { format } from 'date-fns';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
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
import RenderItem from '../components/RenderItem';
import { AuthContext } from '../context/AuthProvider';
import axiosConfig from '../utilities/axiosConfig';

export default function ProfileScreen({ route, navigation }) {
  const [userData, setUserData] = useState(null);
  const [isLoadingUserInfo, setIsLoadingUserInfo] = useState(true);

  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [isFollowedDataLoaded, setIsFollowedDataLoaded] = useState(false);

  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useContext(AuthContext);

  const [userTweets, setUserTweets] = useState([]);
  const [isLoadingUserTweets, setIsLoadingUserTweets] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [page, setPage] = useState(1);
  const [isAtTheEndOfScrolling, setIsAtTheEndOfScrolling] = useState(false);

  useEffect(() => {
    getIsFollowing();
  }, []);

  useEffect(() => {
    getUserProfile();
    getUserTweets();
  }, [page]);

  useEffect(() => {
    if (isUserDataLoaded && isFollowedDataLoaded) {
      setIsLoadingUserInfo(false);
    }
  }, [isUserDataLoaded, isFollowedDataLoaded]);

  function getIsFollowing() {
    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    axiosConfig
      .get(`/is_following/${route.params.userId}}`)
      .then((response) => {
        setIsFollowing(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsFollowedDataLoaded(true);
      });
  }

  function followUser() {
    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    axiosConfig
      .post(`/follow/${route.params.userId}}`)
      .then((response) => {
        setIsFollowing(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsFollowedDataLoaded(true);
      });
  }

  function unfollowUser() {
    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    axiosConfig
      .post(`/unfollow/${route.params.userId}}`)
      .then((response) => {
        setIsFollowing(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsFollowedDataLoaded(true);
      });
  }

  function getUserProfile() {
    axiosConfig
      .get(`/users/${route.params.userId}}`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsUserDataLoaded(true);
      });
  }

  function getUserTweets() {
    axiosConfig
      .get(`/users/${route.params.userId}/tweets?page=${page}`)
      .then((response) => {
        if (page === 1) {
          setUserTweets(response.data.data);
        } else {
          setUserTweets([...userTweets, ...response.data.data]);
        }
        if (!response.data.next_page_url) {
          setIsAtTheEndOfScrolling(true);
        }
        setIsLoadingUserTweets(false);
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoadingUserTweets(false);
      });
  }

  function handleRefresh() {
    setIsRefreshing(true);
    getUserTweets();
  }

  function handleEndReached() {
    setPage(page + 1);
  }

  const profileHeader = () => (
    <View style={styles.container}>
      {isLoadingUserInfo ? (
        <ActivityIndicator style={{ marginTop: 8 }} size="large" color="grey" />
      ) : (
        <>
          <Image
            style={styles.backgroundImage}
            source={{
              uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&%20ixid=MnwxMjA3fDB8MHxwaG90by1wYWdl%20fHx8fGVufDB8fHx8&auto=format&fit=crop&w=1080&q=80',
            }}
          />

          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{ uri: userData.avatar }} />
            {user.id !== route.params.userId && (
              <View>
                {isFollowing ? (
                  <TouchableOpacity style={styles.unfollowButton}>
                    <Text
                      style={styles.unfollowButtonText}
                      onPress={() => unfollowUser()}>
                      Unfollow
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText} onPress={() => followUser()}>
                      Follow
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          <View style={styles.nameContainer}>
            <Text style={styles.profileName}>{userData.name}</Text>
            <Text style={styles.profileHandle}>@{userData.username}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{userData.description}</Text>
          </View>
          <View style={styles.locationContainer}>
            <IconLocation width={20} height={20} color="gray"></IconLocation>
            <Text style={styles.textGrey}>{userData.location}</Text>
          </View>
          <View style={styles.linkContainer}>
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => Linking.openURL(userData.link)}>
              <IconLink width={20} height={20} color="gray"></IconLink>
              <Text style={styles.linkColor}>{userData.linktext}</Text>
            </TouchableOpacity>
            <View style={[styles.linkItem, styles.ml4]}>
              <IconCalendar width={20} height={20} color="gray"></IconCalendar>
              <Text style={styles.textGrey}>
                Joined {format(new Date(userData.created_at), 'MMMM yyyy')}
              </Text>
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
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoadingUserTweets ? (
        <ActivityIndicator style={{ marginTop: 8 }} size="large" color="grey" />
      ) : (
        <FlatList
          data={userTweets}
          renderItem={(props) => <RenderItem {...props} />}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.tweetSeperator}></View>}
          ListHeaderComponent={profileHeader}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0}
          ListFooterComponent={() =>
            !isAtTheEndOfScrolling && (
              <ActivityIndicator size="large" color="grey"></ActivityIndicator>
            )
          }
          scrollIndicatorInsets={{ right: 1 }} //only needed for iOS 13 devices it fixes bugged scrollbar
        />
      )}
    </View>
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
  unfollowButton: {
    backgroundColor: '#c8c8c8',
    borderBlockColor: '#0f1418',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 24,
  },
  followButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  unfollowButtonText: {
    color: '#0f1418',
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
