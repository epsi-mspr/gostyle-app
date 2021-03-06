import React from 'react';
import {
  TextInput, StyleSheet, TouchableOpacity, Text, Button, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as PropTypes from 'prop-types';
import Firebase, { dbUsers } from '../../config/firebaseConfig';
import Card from '../Card';
import signIn from '../../api/firebaseApi';

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
    backgroundColor: '#F6820D',
    borderColor: '#F6820D',
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
  },
  logoImage: {
    borderColor: '#FFF',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170
  }
});

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  LoginController = async () => {
    const {
      email,
      password
    } = this.state;

    await signIn(email, password);
  };

  getUserCurrent = async (uid) => {
    await dbUsers.child(uid)
      .once('value');
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    Firebase.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          this.getUserCurrent(user.uid);
          navigation.navigate('Account', { screen: 'Profile' });
        }
      });
  };

  render() {

    const { navigation } = this.props;
    return (
      <Card style={styles.container}>
        <Image style={styles.logoImage}
               source={require('../../assets/logo-gostyle.png')}
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
          onPress={() => this.LoginController()}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Button
          title="Vous n'avez pas de compte? Clicker ici"
          onPress={() => {
            navigation.navigate('Account', { screen: 'Signup' });
          }}
        />
      </Card>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.instanceOf(React.navigator).isRequired
};

// eslint-disable-next-line func-names
export default function (props) {
  const navigation = useNavigation();

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Login {...props} navigation={navigation} />;
}
