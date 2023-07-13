import React, { useContext, useState } from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import FormButton from '../components/FormButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../navigation/AuthProvider';

const ProfileScreen = () => {
  const {logout} = useContext(AuthContext);
  return (
    <View style={{padding: 20}}>
      <FormButton
        buttonTitle="SIGN OUT"
        onPress={() => logout()}
      />
    </View>

  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  bulletin: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    width: '90%',
    height: windowHeight / 12,
    padding: 10,
    justifyContent: 'space-between',
  },
});