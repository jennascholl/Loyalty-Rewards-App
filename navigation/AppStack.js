import React from 'react';
import { View, Image, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screens/HomeScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import SellerScreen from '../screens/SellerScreen';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BulletinScreen from '../screens/BulletinScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const getTabBarIconName = (routeName, focused) => {
  if (routeName === 'Home Tab') {
    return focused ? 'home' : 'home-outline';
  } else if (routeName === 'Map Tab') {
    return focused ? 'location' : 'location-outline';
  } else if (routeName === 'Profile Tab') {
    return focused ? 'person-circle' : 'person-circle-outline'
  }
  return 'home'; // Change this to the default icon name
};

const FeedStack = ({ navigation }) => (
  <Stack.Navigator> 
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({ route }) => ({
        headerTitle: 'Home',
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
            <Ionicons.Button
              name='bookmarks'
              size={30}
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
            <Ionicons name="chevron-back-outline" size={30} color="#000" />
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
        <Ionicons
          name="chevron-back-outline"
          size={30}
          color="#000"
          onPress={() => navigation.goBack()}
        />
      </View>
    ),
    headerBackground: () => (
      <Image
        source={{
          uri: 'https://bmorrowproductions.com/wp-content/uploads/2023/01/Placeholder-Hero.jpg',
        }}
        style={styles.headerBackgroundImage}
        resizeMode="cover"
      />
    ),
    tabBarVisible: false, // Hide the bottom tab bar
  })}
/>
    <Stack.Screen
      name="BulletinScreen"
      component={BulletinScreen}
      options={({ route }) => ({
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          shadowColor: '#B97309',
          elevation: 0,
          backgroundColor: '#B97309'
        },
      
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <View style={{ marginLeft: 15 }}>
            <Ionicons name="chevron-back-outline" size={30} color="#000" />
          </View>
        ),
      })}
    />
    <Stack.Screen
      name="Map"
      component={MapScreen}
      options={({ route }) => ({        
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#B97309',
          shadowColor: '#B97309',
          elevation: 0,
        },
      })}
    />
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#B97309',
          shadowColor: '#B97309',
          elevation: 0,
        },
      }}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  const getTabBarVisibility = (route) => {
    const routeName = route.name;

    console.log(route.name);
    if (routeName === "Map Tab") {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          const iconName = getTabBarIconName(route.name, focused);
          return <Ionicons name={iconName} color={color} size={35} height={35} />;
        },
        tabBarActiveTintColor: '#B97309',
        tabBarInactiveTintColor: '#E8D9C2',
        tabBarStyle: {
          backgroundColor: '#fff',
          paddingTop: 10,
        },
        headerStyle: {
          height: '8%',
          backgroundColor: '#B97309',
          shadowColor: '#B97309',
          elevation: 0,
        },
        headerTitleStyle: {
          color: '#fff',
          fontWeight: '300',
          fontFamily: 'ArialMT',
          fontSize: 26,
          marginLeft: 8,
        },
      })}
    >
      <Tab.Screen
        name="Home Tab"
        component={FeedStack}
        options={{
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Map Tab"
        component={MapScreen}
        options={{
          headerShown: false,
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Profile Tab"
        component={ProfileScreen}
        options={{
          tabBarLabel: '',
        }}
      />
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