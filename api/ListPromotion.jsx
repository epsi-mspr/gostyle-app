import React from 'react';
import {
  View, Text, FlatList, ScrollView,
} from 'react-native';
import { dbPromo } from '../config/firbaseConfig';
import Card from '../components/Card';

class ListPromotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getListPromo().then((res) => {
      console.log(res);
    });
  }

  getListPromo = async () => {
    const { data } = this.state;
    await dbPromo.on('value', (snapshot) => {
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
          date_expiration: values[i].date_expiration,
        });
      }
      this.setState({ data });
    });
  }

  renderItem = ({ item }) => (

    <Card>
      <Text>
        {item.code_promo}
        {' '}
        -
        {item.reduction}
        {' '}
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

export default ListPromotion;
