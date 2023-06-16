import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text, SafeAreaView} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screens/HomeScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import SellerScreen from '../screens/SellerScreen';
// import ChatScreen from '../screens/ChatScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import AddPostScreen from '../screens/AddPostScreen';
// import MessagesScreen from '../screens/MessagesScreen';
// import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator> 
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({ route }) => ({
        // header: () => null,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          color: '#fff',
          fontWeight: '300',
          fontFamily: 'ArialMT',
          fontSize: 26,
          marginLeft: 8,
        },
        headerStyle: {
          backgroundColor: "#B97309",
          shadowColor: '#B97309',
          elevation: 0,
        },
        headerRight: () => (
          <View style={{marginTop: 10, height: 50}}>
            <FontAwesome5.Button
              name='bookmark'
              size={22}
              backgroundColor="#B97309"
              color="#fff"
              onPress={() => navigation.navigate('Bookmarks')}
            />
          </View>
        ),
      })
      }
    />
    <Stack.Screen
      name="Bookmarks"
      component={BookmarkScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#B97309',
          shadowColor: '#B97309',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#000" />
          </View>
        ),
      }}
    />
    <Stack.Screen
      name="SellerPage"
      component={SellerScreen}
      options={({ route }) => ({
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#B97309',
          shadowColor: '#B97309',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={25} color="#000" />
          </View>
        ),
        headerBackground: () => (
          <Image
          source={{
            uri: 'https://bmorrowproductions.com/wp-content/uploads/2023/01/Placeholder-Hero.jpg'
          }}
            style={styles.headerBackgroundImage} // Adjust the height to make the image taller
            resizeMode="cover" // Set the resize mode according to your image aspect ratio
          />
        ),  
      })}
    />
    {/* <Stack.Screen
      name="HomeProfile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{marginLeft: 15}}>
            <Ionicons name="arrow-back" size={25} color="#2e64e5" />
          </View>
        ),
      }}
    /> */}
  </Stack.Navigator>
);

// const MessageStack = ({navigation}) => (
//   <Stack.Navigator>
//     <Stack.Screen name="Messages" component={MessagesScreen} />
//     <Stack.Screen
//       name="Chat"
//       component={ChatScreen}
//       options={({route}) => ({
//         title: route.params.userName,
//         headerBackTitleVisible: false,
//       })}
//     />
//   </Stack.Navigator>
// );

// const ProfileStack = ({navigation}) => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Profile"
//       component={ProfileScreen}
//       options={{
//         headerShown: false,
//       }}
//     />
//     <Stack.Screen
//       name="EditProfile"
//       component={EditProfileScreen}
//       options={{
//         headerTitle: 'Edit Profile',
//         headerBackTitleVisible: false,
//         headerTitleAlign: 'center',
//         headerStyle: {
//           backgroundColor: '#fff',
//           shadowColor: '#fff',
//           elevation: 0,
//         },
//       }}
//     />
//   </Stack.Navigator>
// );

const AppStack = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'Chat') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#B97309',
      tabBarStyle: {
        backgroundColor: '#fff',
        paddingTop: 0, // Remove the top padding of the tab bar
      },
      tabBarContentContainerStyle: {
        paddingTop: 0, // Remove the top padding of the tab bar content
      },
    }}>
      <Tab.Screen
        name="Home Tab"
        options={{
          tabBarLabel: '',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons
            name="home"
            color="#B97309"
            size={35}
          />
          ),
          title: '',
          headerStyle: {
            height: '8%',
            backgroundColor: '#B97309',
            shadowColor: '#B97309',
            elevation: 0,
          },
        }}
        component={FeedStack}

      />
      {/* <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={({route}) => ({
          tabBarVisible: getTabBarVisibility(route),
          // Or Hide tabbar when push!
          // https://github.com/react-navigation/react-navigation/issues/7677
          // tabBarVisible: route.state && route.state.index === 0,
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="chatbox-ellipses-outline"
              color={color}
              size={size}
            />
          ),
        })}
      /> */}
      {/* <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          // tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  headerBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: 150,
  },
});