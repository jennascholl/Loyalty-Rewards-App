import React, {createContext, useState, useEffect} from 'react';
import { authentication, db, signOut } from '../firebase/firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getDocs } from "firebase/firestore"; 
// import { collection, getDocs, doc, setDoc, set, Timestamp } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        users,
        login: async (email, password) => {
          try {
            await signInWithEmailAndPassword(authentication, email, password);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await createUserWithEmailAndPassword(authentication, email, password)
            .then(() => {
              //Once the user creation has happened successfully, we can add the currentUser into firestore
              //with the appropriate details.
              const userRef = doc(collection(db, "users"), authentication.currentUser.uid);
              setDoc(userRef, {
                email: email,
                bookmarks: {},
                follows: {},
              })
              //ensure we catch any errors at this stage to advise us if something does go wrong
              .catch(error => {
                  console.log('Something went wrong with added user to firestore: ', error);
              })
            })
            //we need to catch the whole sign up process if it fails too.
            .catch(error => {
                console.log('Something went wrong with sign up: ', error);
            });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await signOut(authentication);
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};