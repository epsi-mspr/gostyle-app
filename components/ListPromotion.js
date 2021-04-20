import React from "react";
import {
  View, Text, FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { dbPromo } from "../config/firebaseConfig";
import Card from "./Card";

class ListPromotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.getListPromo()
  }

  getListPromo = async () => {
    const { data } = this.state;
    await dbPromo.on("value", (snapshot) => {
      const promo = snapshot.val();
      const keys = Object.keys(promo);
      const values = Object.values(promo);
      for (let i = 0; i < keys.length; i += 1) {
        data.push({
          id: keys[i],
          code_promo: values[i].code_promo,
          marque: values[i].marque,
          description: values[i].description,
          reduction: values[i].reduction,
          symbole: values[i].symbole,
          date_expiration: values[i].date_expiration
        });
      }
      this.setState({ data });
    });
  };

  renderItem = ({ item }) => (

    <Card>
      <Text>
        {item.code_promo}
        {" "}
        -
        {item.reduction}
        {" "}
        {item.symbole}
      </Text>
    </Card>

  );

  render() {
    const { data } = this.state;
    if (data) {
      return (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={data}
          extraData={data}
          renderItem={this.renderItem}
        />
      );
    }
    return (
      <View>
        <Text>Le chargement des données...!</Text>
      </View>
    );
  }
}

// eslint-disable-next-line func-names
export default function(props) {
  const navigation = useNavigation();

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <ListPromotion {...props} navigation={navigation} />;
}
