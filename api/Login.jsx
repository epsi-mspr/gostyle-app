import React from 'react';
import {
  View, TextInput, StyleSheet, TouchableOpacity, Text, Button,
} from 'react-native';
import * as PropTypes from 'prop-types';
import Firebase, { dbUsers } from '../config/firbaseConfig';
import Card from '../components/Card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center',
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
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonSignup: {
    fontSize: 12,
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  LoginController = async (email, password) => {
    const { navigation } = this.props;
    await Firebase.auth().signOut();
    try {
      await Firebase.auth().signInWithEmailAndPassword(email, password);
      Firebase.auth().onAuthStateChanged((user) => {
        this.getUserCurrent(user.uid);
        navigation.navigate('Profile');
      });
    } catch (error) {
      alert(error.toString());
    }
  }

  getUserCurrent=async (uid) => {
    await dbUsers.child(uid)
      .once('value');
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.getUserCurrent(user.uid);
        navigation.navigate('Profile');
      }
    });
  };

  render() {
    const { navigation } = this.props;
    const {
      email,
      password,
    } = this.state;
    return (
      <Card>
        <View style={styles.container}>
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
            style={styles.button}
            onPress={() => this.LoginController(email, password)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Button
            title="Vous n'avez pas de compte? Clicker ici"
            onPress={() => navigation.navigate('Signup')}
          />
        </View>
      </Card>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.instanceOf(React.navigator).isRequired,
};

export default Login;
