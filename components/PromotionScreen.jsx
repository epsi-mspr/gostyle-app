import React from 'react';
import { Text, View,Button } from 'react-native';
import getListPromotion from '../api/promotion'
import ListPromotion from '../api/promotion';

function PromotionScreen() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >

      <Text>La liste des promotions:</Text>

      <ListPromotion/>

    </View>
  );
}

export default PromotionScreen;
