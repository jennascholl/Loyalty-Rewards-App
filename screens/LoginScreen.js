import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login} = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F1F1F0' }}>
      <View style={{
        flex: 1,
        zIndex: 0,
      }}>
        <View style={{
          height: '80%',
          width: '100%',
          marginTop: -50,
          backgroundColor: '#B97309',
          borderColor: '#B97309',
          borderBottomLeftRadius: 80,
          position: 'absolute',
          paddingTop: 200,          
          paddingHorizontal: 30,
          }}>
          <Text style={{ fontWeight: 600, fontSize: 32, color: "#fff" }}>Welcome</Text>
          <Text style={{ fontWeight: 300, fontSize: 20, color: "#fff"}}>Sign In with an email and password to get started</Text>
        </View>
      </View>
      <View style={{flex: 1, marginTop: -100, paddingHorizontal: 20 }}>
        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="SIGN IN"
          onPress={() => login(email, password)}
        />

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.navButtonText}>
            Don't have an acount? Sign up here
          </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Arial-BoldMT',
    fontSize: 28,
    marginBottom: 10,
    color: '#B97309',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '200',
    color: '#000',
    fontFamily: 'ArialMT',
  },
});