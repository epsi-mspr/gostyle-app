import React from 'react';
import {Text, View } from 'react-native';
import { Screen, shouldUseActivityState } from 'react-native-screens';


function HomeScreen() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>Home! Scan QR code ici</Text>
      </View>
    );

}

export default HomeScreen
