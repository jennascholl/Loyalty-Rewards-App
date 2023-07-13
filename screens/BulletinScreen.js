import React, { useState, useContext, useEffect } from 'react';
import {Text, TouchableOpacity, StyleSheet, View, SafeAreaView} from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from "@react-navigation/native";
import { Divider } from 'react-native-paper';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore"; 
import { AuthContext } from '../navigation/AuthProvider';
import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
} from '../styles/FeedStyles';

const BulletinScreen = () => {
  const route = useRoute();
  const item = route.params?.item;
  const sellerData = route.params?.sellerData;
  const [following, setFollowing] = useState(false);
  const { user } = useContext(AuthContext); 

  useEffect(() => {
    const getFollowing = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const documentSnapshot = await getDoc(docRef);
        const follows = documentSnapshot.data().follows;
        setFollowing(follows.includes(sellerData.id));
      } catch (error) {
        console.log('Error fetching follows: ', error);
      }
    };
  
    getFollowing();
  }, []);

  const updateFollowing = async () => {
    try {
      const docRef = doc(db, 'users', user.uid);
      if (following)
        await updateDoc(docRef, { follows: arrayRemove(sellerData.id) });
      else
        await updateDoc(docRef, { follows: arrayUnion(sellerData.id) });   
      
      setFollowing(!following);

    } catch (error) {
      console.log('Error updating follow status: ', error);
    }
  };

  return (
    <SafeAreaView style={{width: '100%', paddingHorizontal: 20 }}>
      <View style={{}}>
        <Text style={{ marginVertical: 15, fontSize: 26, fontWeight: '600' }}>{item.header}</Text>
        <Divider/>       
      </View>
      <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between"}}>
        <View style={{ flexDirection: "row"}}>
          <UserImg
                    source={{
                      uri: sellerData
                        ? sellerData.userImg ||
                        'https://i0.wp.com/www.anitawatkins.com/wp-content/uploads/2016/02/Generic-Profile-1600x1600.png?ssl=1'
                        : 'https://i0.wp.com/www.anitawatkins.com/wp-content/uploads/2016/02/Generic-Profile-1600x1600.png?ssl=1',
                    }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{sellerData?.name}</Text>
            <Text style={{}}>{item.date.toDate().toLocaleDateString()}</Text>
          </View>
        </View>   
        <TouchableOpacity style={styles.headerButton} onPress={updateFollowing}>
              <Text style={styles.headerButtonText}>{following ? "Following" : "Follow"}</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginVertical: 20, fontSize: 16, lineHeight: 20 }}>{item.body}</Text>
    </SafeAreaView>
  );
};

export default BulletinScreen;

const styles = StyleSheet.create({
  bulletin: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    width: '90%',
    height: windowHeight,
    padding: 10,
    justifyContent: 'space-between',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  headerButton: {
    width: 85,
    height: 30,
    backgroundColor: '#B97309',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'ArialMT',
    letterSpacing: -0.5,
  },
});