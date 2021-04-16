import React from 'react';
import {
  View, Text, StyleSheet, Button,
} from 'react-native';
import * as PropTypes from 'prop-types';
import Firebase from '../config/firbaseConfig';
import Card from '../components/Card';

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
    const { navigation } = this.props;

    Firebase.auth().signOut().then((r) => r === null);
    navigation.navigate('Login');
  }

  render() {
    return (
      <Card>
        <View style={styles.container}>
          <Text>Vous êtes connectés :</Text>
          <Text>{Firebase.auth().currentUser.email}</Text>
          <Button title="Logout" onPress={this.handleLogout} />
        </View>
      </Card>
    );
  }
}
Profile.propTypes = {
  navigation: PropTypes.instanceOf(React.navigator).isRequired,
};

export default Profile;
