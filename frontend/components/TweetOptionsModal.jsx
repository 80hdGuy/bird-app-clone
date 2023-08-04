import { useEffect, useRef } from 'react';
import {
  Alert,
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconPin from '../assets/icons/IconPin';
import IconTrashCan from '../assets/icons/IconTrashCan';

export default function TweetOptionsModal({ onClose, onDelete }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 0.6,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  function showDeleteAlert() {
    Alert.alert('Delete this tweet?', null, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => onDelete(),
        style: 'cancel',
      },
    ]);
  }

  return (
    <Animated.View style={[styles.container, { opacity: opacity }]}>
      <Modal animationType="slide" transparent={true} onRequestClose={onClose}>
        <Pressable style={styles.closeModalContainer} onPress={onClose}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContentContainer}>
              <TouchableOpacity style={styles.button}>
                <IconPin width={22} height={22} color="black" />
                <Text style={[styles.buttonText, styles.textSize16]}>Pin Tweet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => showDeleteAlert()}>
                <IconTrashCan width={20} height={20} color="red" />
                <Text style={[styles.buttonText, styles.textSize16, { color: 'red' }]}>
                  Delete Tweet
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#1d1b1b',
  },
  closeModalContainer: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
    position: 'absolute',
    flex: 1,
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    height: 100,
    width: '90%',
    elevation: 2,
  },
  textSize16: {
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    height: 40,
    width: 250,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
