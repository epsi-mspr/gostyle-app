import React from 'react';
import {
  View, Text, StyleSheet, Button,
} from 'react-native';
import Firebase from '../config/firbaseConfig';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Profile extends React.Component {
    handleLogout = () => {
      Firebase.auth().signOut().then((r) => r === null);
      this.props.navigation.navigate('Login');
    }

    render() {
      return (
        <View style={styles.container}>
          <Text>Vous êtes connectés :</Text>
          <Text>{Firebase.auth().currentUser.email}</Text>
          <Button title="Logout" onPress={this.handleLogout} />
        </View>
      );
    }
}

export default Profile;
