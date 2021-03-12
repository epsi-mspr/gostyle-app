import React from 'react';
import {
  View, TextInput, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import Firebase, { dbUsers } from '../config/firbaseConfig';
import Profile from './Profile';

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
        this.props.navigation.navigate('Profile');
        /* await db.collection('users')
                  .doc(user.uid)
                  .set(user)
              console.log(JSON.stringify(user)) */
      }
    } catch (e) {
      alert(e.toString());
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputBox}
          onChangeText={(name) => this.setState({ name })}
          placeholder="Full Name"
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(email) => this.setState({ email })}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(password) => this.setState({ password })}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.handleCreate(this.state.email, this.state.password, this.state.name)}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Signup;
