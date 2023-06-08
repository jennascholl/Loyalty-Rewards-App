import React, { useState, useContext, useEffect } from "react";
import { Text, SafeAreaView, ScrollView, View, TouchableOpacity, FlatList } from "react-native";
import { AuthContext } from '../navigation/AuthProvider';
import { authentication, db } from '../firebase/firebaseConfig';
import { doc, getDocs, collection, documentId, query, where, collectionGroup, setLogLevel } from "firebase/firestore"; 

import { COLORS, icons, images, SIZES } from "../constants";
import { PunchCard } from "../components/PunchCard";
// import {
//   Nearbyjobs,
//   Popularjobs,
//   ScreenHeaderBtn,
//   Welcome,
// } from "../components";
import CustomSwitch from "../components/home/CustomSwitch";
import {
  Container,
} from '../styles/FeedStyles';

const HomeScreen = () => {
  // const router = useRouter();
  // const [searchTerm, setSearchTerm] = useState("");
  const [filterTab, setFilterTab] = useState(1);
  const [cardData, setCardData] = useState([]);

  const onSelectSwitch = value => {
    setFilterTab(value);
  };

  useEffect(() => {
    const getCards = async () => {
      try {
        const sellersSnapshot = await getDocs(collection(db, 'sellers'));
        const cardData = [];

        for (const sellerDoc of sellersSnapshot.docs) {
          const cardsSnapshot = await getDocs(collection(sellerDoc.ref, 'cards'));
          const sellerCardData = cardsSnapshot.docs.map((doc) => {
            const cardItem = doc.data();
            cardItem.id = doc.id; // Assign the document ID to the id property
            return cardItem;
          });
          cardData.push(...sellerCardData);
        }
        setCardData(cardData);

      } catch (error) {
        console.log('Error fetching cards: ', error);
      }
    };
  
    getCards();
  }, []);

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
            height: '25%',
            flex: 1,
            width: '100%',
            backgroundColor: '#B97309',
            borderColor: '#;B97309',
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
      <Container style={{marginTop:40, position:'absolute', width:'100%'}}>
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
        {filterTab == 2 && <Text>Following</Text>}
        {filterTab == 3 && <Text>In Progress</Text>}
      </Container>
    </SafeAreaView>
  );
};

export default HomeScreen;