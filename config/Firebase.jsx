import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfiguration = {
  apiKey: 'AIzaSyBMqdXixuSenMGHwbGdo2yGkOKd-VvxS1w',
  authDomain: 'gostyle-f72c5.firebaseapp.com',
  databaseURL: 'https://gostyle-f72c5-default-rtdb.firebaseio.com',
  projectId: 'gostyle-f72c5',
  storageBucket: 'gostyle-f72c5.appspot.com',
  messagingSenderId: '802683048007',
  appId: '1:802683048007:web:e02d3eb4d1fce4933f2162',
  measurementId: 'G-5SQWQE13N3',
};

const Firebase = firebase.initializeApp(firebaseConfiguration);

export default Firebase;

export const dbUsers = firebase.database()
  .ref('users');
export const dbPromo = firebase.database()
  .ref('promotions');
