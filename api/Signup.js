import React from 'react';
import {
  TextInput, StyleSheet, TouchableOpacity, Text, Button
} from 'react-native';
import * as PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import Firebase, { dbUsers } from '../config/firebaseConfig';
import Card from '../components/Card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center'
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#FFA611',
    borderColor: '#FFA611',
    borderWidth: 1,
    borderRadius: 5,
    width: 200
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  buttonSignup: {
    fontSize: 12
  }
});

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  handleCreate = async (firstName, lastName, email, password) => {
    const { navigation } = this.props;
    try {
      const res = (await Firebase.auth()
        .createUserWithEmailAndPassword(email, password)).user;
      if (res.uid) {
        const user = {
          uid: res.uid,
          firstName,
          lastName,
          email
        };
        await dbUsers.child(res.uid)
          .set(user);
        navigation.navigate('Account', { 'screen': 'Profile' });
      }
    } catch (e) {
      alert(e.toString());
    }
  };

  render() {
    const { navigation } = this.props;
    const {
      firstName,
      lastName,
      email,
      password
    } = this.state;
    return (
      <Card style={styles.container}>
        <TextInput
          style={styles.inputBox}
          onChangeText={(newFirstName) => this.setState({ firstName: newFirstName })}
          placeholder="First name"
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(newLastName) => this.setState({ lastName: newLastName })}
          placeholder="Last name"
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(newEmail) => this.setState({ email: newEmail })}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(newPassword) => this.setState({ password: newPassword })}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity
          testID="touchable-opacity"
          style={styles.button}
          onPress={() => this.handleCreate(firstName, lastName, email, password)}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <Button
          title="Annuler"
          onPress={() => navigation.navigate('Login')}
        />
      </Card>
    );
  }
}

Signup.propTypes = {
  navigation: PropTypes.instanceOf(React.navigator).isRequired
};

// eslint-disable-next-line func-names
export default function (props) {
  const navigation = useNavigation();

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Signup {...props} navigation={navigation} />;
}
