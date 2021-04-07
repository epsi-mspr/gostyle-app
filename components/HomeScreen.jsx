import React from 'react';
import { View } from 'react-native';
import QRCodeScanner from './QRCodeScanner';

function HomeScreen() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <QRCodeScanner />
    </View>
  );
}

export default HomeScreen;
