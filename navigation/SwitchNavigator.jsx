import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from '../api/Login';
import Signup from '../api/Signup';
import Profile from '../api/Profile';
import Firebase from '../config/firbaseConfig';

let SwitchNavigator;
console.log(Firebase.auth().currentUser);
if (Firebase.auth().currentUser) {
  SwitchNavigator = createSwitchNavigator(
    {
      Login: {
        screen: Login,
      },
      Signup: {
        screen: Signup,
      },
      Profile: {
        screen: Profile,
      },
    },
    {
      initialRouteName: 'Profile',
    },
  );
} else {
  SwitchNavigator = createSwitchNavigator(
    {
      Login: {
        screen: Login,
      },
      Signup: {
        screen: Signup,
      },
      Profile: {
        screen: Profile,
      },
    },
    {
      initialRouteName: 'Login',
    },
  );
}
export default createAppContainer(SwitchNavigator);
