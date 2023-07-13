import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Punch = ({ number }) => {
  return (
    <View style={styles.filledPunch}>
      <Text style={{ color: '#fff', fontSize: 14, fontWeight: '500' }}>{number}</Text>
    </View>
  );
};

export default Punch;

const styles = StyleSheet.create({
  filledPunch: {
    marginVertical: 3,
    marginHorizontal: 2,
    backgroundColor: '#B97309',
    height: 26,
    width: 26, 
    borderRadius: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
});