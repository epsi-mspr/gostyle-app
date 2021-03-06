import React from 'react';
import {Text, View } from 'react-native';
import { Screen, shouldUseActivityState } from 'react-native-screens';

function PromotionScreen() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>La liste des Promotions ici!</Text>
      </View>
    );
}

export default PromotionScreen
