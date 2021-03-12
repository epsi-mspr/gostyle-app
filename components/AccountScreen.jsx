import React from 'react';
import { Text, View } from 'react-native';
import Login from '../api/Login';
import SwitchNavigator from '../navigation/SwitchNavigator';

function AccountScreen() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <SwitchNavigator />
    </View>
  );
}

export default AccountScreen;
