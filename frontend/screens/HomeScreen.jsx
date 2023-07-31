import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import IconPlus from '../assets/icons/IconPlus';
import RenderItem from '../components/RenderItem';
import axiosConfig from '../utilities/axiosConfig';

export default function HomeScreen({ route, navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const [page, setPage] = useState(1);
  const [isAtTheEndOfScrolling, setIsAtTheEndOfScrolling] = useState(false);
  const flatListRef = useRef();

  useEffect(() => {
    getAllTweets();
  }, [page]);

  useEffect(() => {
    if (route.params?.newTweetAdded) {
      flatListRef.current.scrollToOffset({
        offset: 0,
      });
      getAllTweetsRefresh();
    }
  }, [route.params?.newTweetAdded]);

  function getAllTweetsRefresh() {
    setPage(1);
    setIsAtTheEndOfScrolling(false);
    setIsRefreshing(false);

    axiosConfig
      .get(`/tweets`)
      .then((response) => {
        setData(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  function getAllTweets() {
    axiosConfig
      .get(`/tweets?page=${page}`)
      .then((response) => {
        if (page === 1) {
          setData(response.data.data);
        } else {
          setData([...data, ...response.data.data]);
        }
        if (!response.data.next_page_url) {
          setIsAtTheEndOfScrolling(true);
        }
        setIsLoading(false);
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  function handleRefresh() {
    setIsRefreshing(true);
    getAllTweetsRefresh();
  }

  function handleEndReached() {
    setPage(page + 1);
  }

  function gotoNewTweet() {
    navigation.navigate('New Tweet');
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 8 }} size="large" color="grey" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={(props) => <RenderItem {...props} />}
          keyExtractor={(tweet) => tweet.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.tweetSeperator}></View>}
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
  tweetSeperator: {
    borderBottomWidth: 1,
    borderColor: '#949494',
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
