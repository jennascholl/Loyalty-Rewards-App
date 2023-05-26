import React, {useContext, useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import app from '../firebase/firebaseConfig'; // Import the Firebase app
// import auth from '@react-native-firebase/auth';
import { getAuth } from "firebase/auth";
import { AuthContext } from './AuthProvider';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = getAuth(app).onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer independent={true}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;