import React from "react";
import {
  View, Text, StyleSheet, Button
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as PropTypes from "prop-types";
import Firebase from "../config/firebaseConfig";
import Card from "../components/Card";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

class Profile extends React.Component {
  handleLogout = () => {
    const { navigation } = this.props;

    Firebase.auth()
      .signOut()
      .then((r) => r === null);
    navigation.navigate("Login");
  };

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
  navigation: PropTypes.instanceOf(React.navigator).isRequired
};

// eslint-disable-next-line func-names
export default function(props) {
  const navigation = useNavigation();

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Profile {...props} navigation={navigation} />;
}

