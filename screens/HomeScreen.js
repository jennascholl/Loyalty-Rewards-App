import React, { useState, useContext, useEffect } from "react";
import { Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, View, TouchableOpacity, FlatList, StyleSheet, Keyboard } from "react-native";
import { AuthContext } from '../navigation/AuthProvider';
import { authentication, db } from '../firebase/firebaseConfig';
import { doc, getDoc, getDocs, collection, orderBy, query, where, collectionGroup, setLogLevel } from "firebase/firestore"; 
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, icons, images, SIZES } from "../constants";
import { PunchCard } from "../components/PunchCard";
import CustomSwitch from "../components/home/CustomSwitch";
import {
  Container,
} from '../styles/FeedStyles';

const HomeScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTab, setFilterTab] = useState(1);
  const [cardData, setCardData] = useState([]);
  const [following, setFollowing] = useState([]);
  const [inProgressCards, setInProgressCards] = useState([]);
  const { user } = useContext(AuthContext);

  const onSelectSwitch = value => {
    setFilterTab(value);
  };

  const fetchData = async (searchTerm) => {
    try {
      const sellersSnapshot = await getDocs(collection(db, 'sellers'));
      const cardData = [];
  
      for (const sellerDoc of sellersSnapshot.docs) {
        let cardsQuery = collection(sellerDoc.ref, 'cards');
        
        if (searchTerm) {
          cardsQuery = query(cardsQuery, where('shortDescr', '>=', searchTerm, '&&', 'shortDescr', '<=', searchTerm + '\uf8ff'));
            // where('shortDescr', '>=', searchTerm));
        }
        
        const cardsSnapshot = await getDocs(cardsQuery);
        const sellerCardData = cardsSnapshot.docs.map((doc) => {
          const cardItem = doc.data();
          cardItem.id = doc.id; // Assign the document ID to the id property
          return cardItem;
        });
        cardData.push(...sellerCardData);
      }
      cardData.sort((a,b) => a.expiration - b.expiration);
      setCardData(cardData);
    } catch (error) {
      console.log('Error fetching data: ', error);
    }
  };

  fetchFollowing = async () => {
    const docRef = doc(db, 'users', user.uid);
    const documentSnapshot = await getDoc(docRef);
    const follows = documentSnapshot.data().follows;
    const filteredCardData = cardData.filter((item) => follows.includes(item.sellerId));
    setFollowing(filteredCardData);
  };

  fetchInProgress = async () => {
    try {
      const docRef = doc(db, 'users', user.uid);
      const documentSnapshot = await getDoc(docRef);
      const inProgress = documentSnapshot.data().inProgress;
      const inProgressIds = inProgress?.map((card) => card.cardId);
      const sellersSnapshot = await getDocs(collection(db, 'sellers'));
      const newCardData = [];

      for (const sellerDoc of sellersSnapshot.docs) {
        const cardsSnapshot = await getDocs(collection(sellerDoc.ref, 'cards'));
        const sellerCardData = cardsSnapshot.docs.map((doc) => {
          const cardItem = doc.data();
          cardItem.id = doc.id; // Assign the document ID to the id property
          return cardItem;
        });
        newCardData.push(...sellerCardData);
      }
      const filteredCardData = newCardData.filter((item) => inProgressIds?.includes(item.id));
      setInProgressCards(filteredCardData);

    } catch (error) {
      console.log('Error fetching cards in progress: ', error);
    }
  };

  useEffect(() => {  
    fetchData();
  }, [filterTab]);

  useEffect(() => {
    fetchFollowing();
    fetchInProgress();
  }, [cardData]);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F1F1F0' }}>
      <View
          style={{
            flex: 1,
            paddingBottom: SIZES.medium,
            zIndex: 0,
          }}
        >
          <View style={{
            height: '35%',
            flex: 1,
            width: '100%',
            backgroundColor: '#B97309',
            borderColor: '#B97309',
            borderBottomLeftRadius: 80,
            position: 'absolute',
            paddingTop: 10,            
          }}>
            <CustomSwitch style={{flex:1, width: '90%'}}
                selectionMode={1}
                option1="For Me"
                option2="Following"
                option3="In Progress"
                onSelectSwitch={onSelectSwitch}
            />
        </View>
      </View>
      <Container style={{marginTop:40, position:'absolute', width:'100%', paddingBottom: 100,}}>
        {filterTab == 1 &&
          <FlatList style={{width:'100%'}}
            data={cardData}
            renderItem={({ item }) => (
              <PunchCard
                item={item}
                navigation={navigation}
                />
              )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          /> 
        }
        {filterTab == 2 &&
          <FlatList style={{ width: '100%' }}
            data={following}
            renderItem={({ item }) => (
              <PunchCard
                item={item}
                navigation={navigation}
                />
              )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />}
        {filterTab == 3 &&
          <FlatList style={{ width: '100%' }}
            data={inProgressCards}
            renderItem={({ item }) => (
              <PunchCard
                item={item}
                navigation={navigation}
                />
              )}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />}
      </Container>
      <KeyboardAvoidingView style={{ height: 100, justifyContent: "flex-end"}}
        enabled
        behavior={"padding"}
        keyboardVerticalOffset={100}        
      >
        <View style={styles.searchContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.searchWrapper}>
              <TextInput
                style={styles.searchInput}
                value={searchTerm}
                onChangeText={(text) => {
                  setSearchTerm(text);
                  fetchData(text);
                }}
                placeholder='Search for deals'
                textColor='#000'>      
              </TextInput>
              <Ionicons name={'search-outline'} size={20} color={'#767675'} style={{marginVertical: 5, marginHorizontal: 10}}></Ionicons>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: '#fff',
    height: 75,
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  searchWrapper: {
    flex: 1,
    margin: 20,
    backgroundColor: "#fff",
    // justifyContent: "center",
    flexDirection: "row",
    //alignItems: "left",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#E0E1DD',
    // height: "60%",
    // width: "90%",
  },
  searchInput: {
    flex: 1,
    fontFamily: 'ArialMT',
    color: '#000',
    paddingHorizontal: 10,
    width: '90%', 
  },
});