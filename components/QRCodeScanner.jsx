import React from 'react';
import {
  Text, StyleSheet, View, Button,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { dbPromo } from '../config/firbaseConfig';

class QRCodeScanner extends React.Component {
  constructor(props) {
    super(props);
    // this.promo = undefined;
    this.state = {
      hasCameraPermission: null,
      scanned: false,
    };
  }

  async componentDidMount() {
    await this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const {
      status,
    } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  handleBarCodeScanned = ({ data }) => {
    this.setState({ scanned: true });
    this.getPromotionById(data).catch((err) => alert(err));
  };

  getPromotionById=async (uid) => {
    const promo = (await dbPromo.child(uid)
      .once('value')).val();
    if (promo != null) {
      alert(`Vous avez une promotion:\n - Code promotion: ${promo.code_promo}\n - Marque: ${promo.marque}
      - Description: ${promo.description}\n - Reduction: ${promo.reduction} ${promo.symbole}
      - Date expiration: ${promo.date_expiration}`);
    } else {
      alert('Oups..!! Aucune promotion correspond au qrcode scanné ');
    }
  }

  render() {
    const {
      hasCameraPermission,
      scanned,
    } = this.state;

    if (hasCameraPermission === null) {
      return (
        <Text>
          {' '}
          Requesting
          for camera permission
          {' '}
        </Text>
      );
    }
    if (hasCameraPermission === false) {
      return <Text> No access to camera </Text>;
    }
    return (
      <View style={
        {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }
      }
      >
        <BarCodeScanner
          onBarCodeScanned={
            scanned ? undefined : this.handleBarCodeScanned
          }
          style={
            StyleSheet.absoluteFillObject
          }
        />

        {
          scanned && (
            <Button
              title="Tap to Scan Again"
              onPress={() => this.setState({ scanned: false })}
            />
          )
        }
        <Text>Scan</Text>
      </View>
    );
  }
}

export default QRCodeScanner;
