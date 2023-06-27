import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MapScreen = () => {
  return (
    <Text>This is the map screen</Text>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  bulletin: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    width: '90%',
    height: windowHeight / 12,
    padding: 10,
    justifyContent: 'space-between',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});