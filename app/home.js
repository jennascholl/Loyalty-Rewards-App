import React, { useState } from "react";
import { Text, SafeAreaView, ScrollView, View, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import CustomSwitch from "../components/home/CustomSwitch";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [gamesTab, setGamesTab] = useState(1);
  const onSelectSwitch = value => {
    setGamesTab(value);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: '#B97309' },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
          ),
          headerTitle: "Home",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`)
              }
            }}
          />
          <View style={{
            marginVertical: 20,
            backgroundColor: '#B97309'
          }}>
            <CustomSwitch
              selectionMode={1}
              option1="For Me"
              option2="Following"
              option3="In Progress"
              onSelectSwitch={onSelectSwitch}
            />
          </View>

          {gamesTab == 1 && <Text>Recommended</Text>}
          {gamesTab == 2 && <Text>Following</Text>}
          {gamesTab == 3 && <Text>In Progress</Text>}

          {/* <Popularjobs /> */}
          {/* <Nearbyjobs /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
