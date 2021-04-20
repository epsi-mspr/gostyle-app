import React from 'react';
import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Login from '../account/Login';
import Profile from '../account/Profile';
import Signup from '../account/Signup';
import Firebase from '../../config/firebaseConfig';

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
