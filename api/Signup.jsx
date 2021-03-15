import React from 'react';
import {
  View, TextInput, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import * as PropTypes from 'prop-types';
import Firebase, { dbUsers } from '../config/Firebase';

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
    backgroundColor: '#FFA611',
    borderColor: '#FFA611',
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

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  handleCreate = async (email, password, name) => {
    const { navigation } = this.props;
    try {
      const res = (await Firebase.auth()
        .createUserWithEmailAndPassword(email, password)).user;
      if (res.uid) {
        const user = {
          uid: res.uid,
          email,
          name,

        };
        await dbUsers.child(res.uid)
          .set(user);
        navigation.navigate('Profile');
      }
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    const {
      name,
      email,
      password,
    } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          onChangeText={(newName) => this.setState({ name: newName })}
          placeholder="Full Name"
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
          style={styles.button}
          onPress={() => this.handleCreate(email, password, name)}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Signup.propTypes = {
  navigation: PropTypes.instanceOf(React.navigator).isRequired,
};

export default Signup;
