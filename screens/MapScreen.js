import React, { useState, useEffect, useRef, useMemo } from 'react';
import {Text, TouchableOpacity, StyleSheet, View, FlatList} from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { doc, getDoc, getDocs, collection, orderBy, query, where, collectionGroup } from "firebase/firestore"; 
import { db } from '../firebase/firebaseConfig';
import { mapStyle } from "../styles/mapStyle";

import * as Location from 'expo-location';
const MapScreen = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: 39.8283,
    longitude: -98.5795 ,
    latitudeDelta: 30.0,
    longitudeDelta: 50.0,
  });
  const [sellerData, setSellerData] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userInteraction, setUserInteraction] = useState(false);
  const [myLocation, setMyLocation] = useState(null);
  const [locationIcon, setLocationIcon] = useState("location-outline");
  const mapRef = useRef(null);

  const zoomToLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
  
      let location = await Location.getCurrentPositionAsync({});
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setMyLocation(newRegion);
      setRegion(newRegion);
      mapRef.current.animateToRegion(newRegion, 1000);

    } catch (error) {
      console.log('Error zooming to location: ', error);
    }
  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  }

  const handleRegionChangeComplete = updatedRegion => {
    if (userInteraction) {
      setRegion(updatedRegion);
      //locationIcon();
    }
  };
 
  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const sellerSnapshot = await getDocs(collection(db, 'sellers'));
        const sellerData = sellerSnapshot.docs.map((doc) => {
          const seller = doc.data();
          seller.id = doc.id; // Assign the document ID to the id property
          return seller;
        });
        setSellerData(sellerData);
      } catch (error) {
        console.log('Error fetching locations: ', error);
      }
    };
    fetchSellerData();
  }, []);

  useEffect(() => {
    const fetchIcon = async () => {
      if (myLocation?.latitude === region?.latitude &&
        myLocation?.longitude === region?.longitude)
        setLocationIcon('navigate');
      else
        setLocationIcon('navigate-outline');
    };
    fetchIcon();
  }, [region]);

  const handleMarkerPress = (pin) => {
    navigation.navigate('SellerPage', { sellerData: pin });
  };

  const renderMap = useMemo(
    () => (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        ref={mapRef}
        initialRegion={region}
        onRegionChangeComplete={handleRegionChangeComplete}
        onTouchStart={() => setUserInteraction(true)}
        onTouchEnd={() => setUserInteraction(false)}
        customMapStyle={mapStyle}
        onPress={(event) => {
          const coordinate = event.nativeEvent.coordinate;
          const tappedMarker = sellerData.find(
            (seller) =>
              seller.location.latitude === coordinate.latitude &&
              seller.location.longitude === coordinate.longitude
          );
          if (tappedMarker) {
            handleMarkerPress(tappedMarker);
          }
        }}
      >
        {sellerData.map((seller, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: seller.location.latitude,
              longitude: seller.location.longitude,
            }}
            style={{ flex: 1, alignContent: 'flex-end' }}
          >
            <Text style={{ fontSize: 16, color: '#000', textAlign: 'center', width: 100}}>{seller.name}</Text>
            <Ionicons name="location" color="#B97309" size={40} style={{ alignSelf: 'center' }} />
          </Marker>
        ))}
      </MapView>
    ),
    [sellerData] 
  );

  return (
    <View style={styles.container}>
      {renderMap}
      <TouchableOpacity
        onPress={zoomToLocation}
        style={{ backgroundColor: '#fff', borderRadius: 10, margin: 20, marginTop: 50 }}
      >
        <Ionicons name={locationIcon} color="#B97309" size={30} style={{ padding: 5, alignSelf: 'center' }} />
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "right",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});