import React, {useContext, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  FlatList
} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';
import { PunchCard } from "../components/PunchCard";
import {
  Container,
} from '../styles/FeedStyles';
import { COLORS, icons, images, SIZES } from "../constants";
import { doc, getDoc, getDocs, collection, query, where, collectionGroup, setLogLevel } from "firebase/firestore";
import { authentication, db } from '../firebase/firebaseConfig';

const BookmarkScreen = () => {
  const [cardData, setCardData] = useState([]);
  const [bookmarkData, setBookmarkData] = useState([]);
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchBookmarkData = async () => {
      try {
        const docRef = doc(db, 'users', user.uid);
        const documentSnapshot = await getDoc(docRef);
        const bookmarks = documentSnapshot.data().bookmarks;
        setBookmarkData(bookmarks);
      } catch (error) {
        console.log('Error fetching bookmarks: ', error);
      }
    };

    const fetchCardData = async () => {
      try {
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

        const filteredCardData = newCardData.filter((item) => bookmarkData.includes(item.id));
        setCardData(filteredCardData);
      } catch (error) {
        console.log('Error fetching cards: ', error);
      }
    };

    fetchBookmarkData();
    fetchCardData();
  }, [bookmarkData, user.uid]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F1F1F0' }}>
      <View style={{
        height: '25%',
        flex: 1,
        width: '100%',
        backgroundColor: '#B97309',
        borderColor: '#;B97309',
        borderBottomLeftRadius: 80,
        position: 'absolute',
        paddingTop: 10,            
         }}>
      </View>
      <Container style={{ marginTop: 20, position: 'absolute', width: '100%' }}>
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
      </Container>
    </SafeAreaView>
  );
};

export default BookmarkScreen;