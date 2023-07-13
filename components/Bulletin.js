import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Bulletin = ({ item, navigation, sellerData }) => {
  return (
    <TouchableOpacity style={styles.bulletin} onPress={() => navigation.navigate('BulletinScreen', { item, sellerData })}>
      <Ionicons size={25} color={'#B97309'} name="chatbox-ellipses-outline" style={{marginLeft: 10, alignSelf: 'center'}}></Ionicons>
      <View style={{marginHorizontal: 10, width: '80%', paddingHorizontal: 10}}>
        <Text style={{ fontSize: 14, fontWeight: '600' }}>{item.header}</Text>
        <Text style={{ fontSize: 14 }}>{item.body}</Text>
      </View>
      <View style={{width: '100%'}}>
        <Text style={{ color: '#767675', textAlign: 'left'}}>{item.date.toDate().getMonth()}/{item.date.toDate().getDate()}</Text>
        <Ionicons style={{ marginLeft: 10 }} size={25} color={'#B3B4B1'} name="chevron-forward-outline"></Ionicons>
      </View>
    </TouchableOpacity>
  );
};

export default Bulletin;

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