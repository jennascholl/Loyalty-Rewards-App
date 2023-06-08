import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const CustomSwitch = ({
  selectionMode,
  option1,
  option2,
  option3,
  onSelectSwitch,
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = (value) => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View
      style={{
        height: 36,
        width: '95%',
        gap: 4,
        borderRadius: 40,
        borderColor: '#AD40AF',
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: -4
      }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          // borderWidth: 1,
          borderColor: getSelectionMode == 2 ? 'white' : '#E8D9C2',
          // backgroundColor: getSelectionMode == 1 ? '#AD40AF' : '#e4e4e4',
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 1 ? 'white' : '#E8D9C2',
            fontWeight: '500',
            fontSize: 16,
            // fontFamily: 'Roboto-Medium',
          }}>
          {option1}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          // borderWidth: 1,
          borderColor: getSelectionMode == 2 ? 'white' : '#E8D9C2',
          // backgroundColor: getSelectionMode == 2 ? '#AD40AF' : '#e4e4e4',
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 2 ? 'white' : '#E8D9C2',
            fontWeight: '500',
            fontSize: 16,
            // fontFamily: 'Roboto-Medium',
          }}>
          {option2}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(3)}
        style={{
          flex: 1,
          // borderWidth: 1,
          borderColor: getSelectionMode == 3 ? 'white' : '#E8D9C2',
          // backgroundColor: getSelectionMode == 2 ? '#AD40AF' : '#e4e4e4',
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: getSelectionMode == 3 ? 'white' : '#E8D9C2',
            fontWeight: '500',
            fontSize: 16,
            // fontFamily: 'Roboto-Medium',
          }}>
          {option3}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomSwitch;