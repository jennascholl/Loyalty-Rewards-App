import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

// import ProgressiveImage from './ProgressiveImage';

import { AuthContext } from '../navigation/AuthProvider';
import { authentication, db } from '../firebase/firebaseConfig';

// import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { documentSnapshot, onSnapshot, doc, getDoc, collection, query, where, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const PunchCard = ({ item, onPress }) => {
  const { user } = useContext(AuthContext);
  const [flipped, setFlipped] = useState(false);
  const [sellerData, setSellerData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [bookmarkData, setBookmarkData] = useState([]);

  const getSeller = async () => {
    const docRef = doc(db, 'sellers', item.sellerId);
    try {
      const documentSnapshot = await getDoc(docRef);
      setSellerData(documentSnapshot.data());
    } catch (error) {
      console.error('Error getting seller:', error);
    }
  };

  const getUser = async () => {
    const docRef = doc(db, 'users', user.uid);
    try {
      const documentSnapshot = await getDoc(docRef);
      setUserData(documentSnapshot.data());
      setBookmarkData(documentSnapshot.data().bookmarks);
    } catch (error) {
      console.log('Error fetching user: ', error);
    }
  };

  useEffect(() => {
    getSeller();
    getUser();
  }, []); // Run the effect only once after the initial render

  var bookmarkIcon = useMemo(() => {
    return bookmarkData.includes(item.id) ? 'md-bookmark' : 'md-bookmark-outline';
  }, [bookmarkData, item.id]);

  const punches = useMemo(() => {
    const punchesArray = [];
    for (let i = 1; i <= 10; i++) {
      punchesArray.push(
        <View key={i}>
          {i <= item.current && (
            <Ionicons name={'md-radio-button-on'} size={30} color={'#B97309'} />
          )}
          {i > item.current && (
            <Ionicons name={'md-ellipse'} size={30} color={'#fff'} />
          )}
        </View>
      );
    }
    return punchesArray;
  }, [item.current]);

  const updateBookmark = async () => {
    const docRef = doc(db, 'users', user.uid);
    if (bookmarkData.includes(item.id))
      await updateDoc(docRef, { bookmarks: arrayRemove(item.id) });
    else
      await updateDoc(docRef, { bookmarks: arrayUnion(item.id) });   
    getUser();
  }

  return (
    <Card key={item.id}>
      {flipped == false &&
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <UserInfo>
              <UserImg
                source={{
                  uri: sellerData
                    ? sellerData.userImg ||
                    'https://i0.wp.com/www.anitawatkins.com/wp-content/uploads/2016/02/Generic-Profile-1600x1600.png?ssl=1'
                    : 'https://i0.wp.com/www.anitawatkins.com/wp-content/uploads/2016/02/Generic-Profile-1600x1600.png?ssl=1',
                }}
              />
              <UserInfoText>
                {sellerData ? (
                  <TouchableOpacity onPress={onPress}>
                    <UserName>{sellerData.name}</UserName>
                  </TouchableOpacity>
                ) : (
                  <Text>Loading seller data...</Text>
                )}
                <PostTime>{item.shortDescr}</PostTime>
              </UserInfoText>
            </UserInfo>
            <Interaction style={{ marginTop: 10 }} onPress={updateBookmark}>
              <Ionicons name={bookmarkIcon} size={30} color={'#B97309'} />
            </Interaction>
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            {punches}
          </View>
        </View>}
      {flipped == true &&
        <View style={{ flex: 1, paddingVertical: 15 }}>
          <PostText style={{ width: '90%', fontSize: 16 }}>{item.longDescr}</PostText>
        </View>}
      <View style={styles.buttonContainer}>
        {flipped == false && <Text style={{ color: '#fff' }}>Expires {item.expiration.toDate().toLocaleDateString()}</Text>}
        {flipped == true && <Text style={{ color: '#fff', fontSize: 36, marginBottom: -10 }}>{item.code}</Text>}
        <TouchableOpacity style={styles.button} onPress={() => { setFlipped(!flipped) }}>
          <Text style={styles.buttonText}>Flip </Text>
          <Ionicons name={'md-reload-outline'} size={20} color={'#B97309'} style={{ transform: [{ rotateY: '180deg' }] }}></Ionicons>
        </TouchableOpacity>
      </View>
    </Card>

  );

  //   return (
  //     <Card key={item.id}>
  //       <UserInfo>
  //         {/* <UserImg
  //           source={{
  //             uri: userData
  //               ? userData.userImg ||
  //                 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg'
  //               : 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
  //           }}
  //         /> */}
  //         <UserInfoText>
  //           <TouchableOpacity onPress={onPress}>
  //             <UserName>
  //               {sellerData ? userData.fname || 'Test Seller' : 'Test'}
  //             </UserName>
  //           </TouchableOpacity>
  //           {/* <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime> */}
  //         </UserInfoText>
  //       </UserInfo>
  //       <PostText>{item.shortDescr}</PostText>
  {/* {item.postImg != null ? <PostImg source={{uri: item.postImg}} /> : <Divider />} */ }
  {/* {item.postImg != null ? (
        <ProgressiveImage
          defaultImageSource={require('../assets/default-img.jpg')}
          source={{uri: item.postImg}}
          style={{width: '100%', height: 250}}
          resizeMode="cover"
        />
      ) : (
        <Divider />
      )} */}

  //       <InteractionWrapper>
  //         <Interaction active={item.bookmarked}>
  //           <Ionicons name={likeIcon} size={25} color={likeIconColor} />
  //           {/* <InteractionText active={item.bookmarked}>{likeText}</InteractionText> */}
  //         </Interaction>
  //         {/* <Interaction>
  //           <Ionicons name="md-chatbubble-outline" size={25} />
  //           <InteractionText>{commentText}</InteractionText>
  //         </Interaction> */}
  //         {/* {user.uid == item.userId ? (
  //           <Interaction onPress={() => onDelete(item.id)}>
  //             <Ionicons name="md-trash-bin" size={25} />
  //           </Interaction>
  //         ) : null} */}
  //       </InteractionWrapper>
  //     </Card>
  //   );
};

export { PunchCard };

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 15,
    height: 30,
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
  },
  button: {
    width: 75,
    height: 30,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    // alignSelf: 'flex-end', 
    // right: 0,
  },
  buttonText: {
    color: '#B97309',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'ArialMT',
  },

});