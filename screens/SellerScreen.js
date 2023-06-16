import React, { useState, useContext, useEffect } from "react";
import { Text, SafeAreaView, ScrollView, View, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { AuthContext } from '../navigation/AuthProvider';
import { authentication, db } from '../firebase/firebaseConfig';
import { doc, getDoc, getDocs, collection, updateDoc, arrayRemove, arrayUnion, query, where, collectionGroup, setLogLevel } from "firebase/firestore"; 
import { useRoute } from "@react-navigation/native";

import { COLORS, icons, images, SIZES } from "../constants";
import { PunchCard } from "../components/PunchCard";
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
  Divider,
} from '../styles/FeedStyles';
// import {
//   Nearbyjobs,
//   Popularjobs,
//   ScreenHeaderBtn,
//   Welcome,
// } from "../components";
import CustomSwitch from "../components/home/CustomSwitch";

const SellerScreen = () => {
  const route = useRoute();
  const sellerData = route.params?.sellerData;
  const [filterTab, setFilterTab] = useState(1);
  const [cardData, setCardData] = useState([]);
  const [following, setFollowing] = useState(false);
  const { user } = useContext(AuthContext); 

  const onSelectSwitch = value => {
    setFilterTab(value);
  };

  useEffect(() => {
    const getCards = async () => {
      try {
        if (sellerData && sellerData.id) { // Check if sellerData and sellerData.id are defined
          const sellerRef = doc(db, 'sellers', sellerData.id);
          const cardsSnapshot = await getDocs(collection(sellerRef, 'cards'));
          const sellerCardData = cardsSnapshot.docs.map((doc) => {
            const cardItem = doc.data();
            cardItem.id = doc.id; // Assign the document ID to the id property
            return cardItem;
          });
          setCardData(sellerCardData);
        }

      } catch (error) {
        console.log('Error fetching these seller cards: ', error);
      }
    };

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
  
    getCards();
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F1F1F0' }}>
        <View
          style={{
            flex: 1,
            paddingBottom: SIZES.medium,
          }}
      >
          {/* <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                // router.push(`/search/${searchTerm}`)
              }
            }}
          /> */}
          <View style={{
            height: '55%',
            flex: 1,
            width: '100%',
            backgroundColor: '#B97309',
            borderColor: '#;B97309',
            borderBottomLeftRadius: 80,
            position: 'absolute',
            marginTop: 100,
            paddingTop: 10,
            
        }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, marginBottom: 10, marginHorizontal: 20}}>
            <Text style={{ color: "#fff", fontSize: 26 }}>{sellerData?.name}</Text>
            <TouchableOpacity style={styles.headerButton} onPress={updateFollowing}>
              <Text style={styles.headerButtonText}>{following ? "Following" : "Follow"}</Text>
            </TouchableOpacity>
          </View>
          <CustomSwitch style={{ flex:1, width: '90%'}}
                selectionMode={1}
                option1="Rewards"
                option2="Bulletin"
                option3="About"
                onSelectSwitch={onSelectSwitch}
            />
          </View>
      </View>
      <Container style={{ width:'100%', marginTop: -200}}>
        {filterTab == 1 &&
          <FlatList style={{width:'100%'}}
            data={cardData}
            renderItem={({ item }) => (
              <PunchCard
                  item={item}
                />
              )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        }
        {filterTab == 2 && <Text>Bulletin</Text>}
        {filterTab == 3 && <Text>About</Text>}
      </Container>
    </SafeAreaView>
  );
};

export default SellerScreen;

const styles = StyleSheet.create({
  headerButton: {
    width: 85,
    height: 30,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  headerButtonText: {
    color: '#B97309',
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'ArialMT',
    letterSpacing: -0.5,
  }
});