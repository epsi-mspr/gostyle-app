import React from 'react';
import { View } from 'react-native';
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
