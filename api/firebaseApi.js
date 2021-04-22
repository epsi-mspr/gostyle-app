import firebase from 'firebase';
import {Alert} from 'react-native';
import Firebase, { dbUsers } from '../config/firebaseConfig';

export default async function signIn(email, password) {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("Vous avez une erreur!!", err.message);
  }
}

export async function singUp(email, password, lastName, firstName) {
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
    }
  } catch (e) {
    Alert.alert("Vous avez une erreur!!", e.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('Vous avez une erreur!!', err.message);
  }
}
