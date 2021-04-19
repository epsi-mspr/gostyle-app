import React from 'react';
import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from '../api/Login';
import Profile from '../api/Profile';
import Signup from '../api/Signup';
import Firebase from '../config/firebaseConfig';

function AccountScreen() {
  const SwitchNavigator = createAppContainer(createSwitchNavigator(
    {
      Login,
      Profile,
      Signup
    },
    { initialRouteName: Firebase.auth().currentUser ? 'Profile' : 'Login' }
  ));

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}
    >
      <SwitchNavigator />
    </View>
  );
}

export default AccountScreen;
