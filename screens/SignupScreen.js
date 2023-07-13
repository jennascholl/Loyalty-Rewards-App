import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Platform, StyleSheet, SafeAreaView} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext} from '../navigation/AuthProvider';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {register} = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F1F1F0' }}>
      <View style={{
        flex: 1,
        zIndex: 0,
      }}>
        <View style={{
          height: '48%',
          width: '100%',
          // marginTop: -50,
          backgroundColor: '#B97309',
          borderColor: '#B97309',
          borderBottomLeftRadius: 80,
          position: 'absolute',
          paddingTop: 80,          
            paddingHorizontal: 30,
          }}>
          <Text style={{ fontWeight: 600, fontSize: 32, color: "#fff" }}>Create Account</Text>
          <Text style={{ fontWeight: 300, fontSize: 20, color: "#fff"}}>Sign Up with an email and password to get started</Text>
        </View>
      </View>
      <View style={{flex: 1, marginTop: -200, paddingHorizontal: 20 }}>
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

        <FormInput
          labelValue={confirmPassword}
          onChangeText={(userPassword) => setConfirmPassword(userPassword)}
          placeholderText="Confirm Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="SIGN UP"
          onPress={() => register(email, password)}
        />

        <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            By registering, you confirm that you accept our{' '}
          </Text>
          <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
            <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
              Terms of service
            </Text>
          </TouchableOpacity>
          <Text style={styles.color_textPrivate}> and </Text>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Privacy Policy
          </Text>
          </View>
        </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontFamily: 'Arial-BoldMT',
    fontSize: 28,
    marginBottom: 10,
    color: '#B97309',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '200',
    color: '#000',
    fontFamily: 'ArialMT',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'ArialMT',
    color: 'grey',
  },
});