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
    await dbPromo.on('value', (snapshot) => {
      const promo = snapshot.val();
      for (const key in promo) {
        this.state.data.push({
          id: key,
          marque: promo[key].marque,
          description: promo[key].description,
          reduction: promo[key].reduction,
          symbole: promo[key].symbole,
          date_expiration: promo[key].date_expiration,
        });
        console.log(promo);
      }
      console.log(Object.entries(promo));
      this.setState({
        data: this.state.data,
      });
    });
  }

  renderItem = ({ item }) => (
    <ScrollView>
      <Card>
        <Text>
          {item.marque}
          {' '}
          -
          {item.reduction}
          {' '}
          {item.symbole}
        </Text>
      </Card>
    </ScrollView>
  );

  render() {
    if (this.state.data) {
      return (
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={this.state.data}
          extraData={this.state.data}
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
