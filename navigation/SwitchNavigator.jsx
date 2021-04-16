import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from '../api/Login';
import Profile from '../api/Profile';
import Signup from '../api/Signup';
import Firebase from '../config/firbaseConfig';

let SwitchNavigator;
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
