import React from 'react';
import {
  View, Text, StyleSheet, FlatList, ScrollView,
} from 'react-native';
import { dbPromo } from '../config/Firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class PromotionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getPromotions()
      .then((err) => err);
  }

  getPromotions = async () => {
    const { data } = this.state;

    await dbPromo.on('value', (snapshot) => {
      const promo = snapshot.val();
      const keys = Object.keys(promo);
      const values = Object.values(promo);
      for (let i = 0; i < keys.length; i += 1) {
        data.push({
          id: keys[i],
          libelle: values[i].libelle,
          date_debut: values[i].date_debut,
          date_expiration: values[i].date_expiration,
        });
      }
      console.log(Object.keys(promo));
      this.setState({ data });
    });
  };

  renderItem = ({ item }) => (
    <ScrollView>
      <View>
        <Text style={styles.id}>
          {item.id}
          {' '}
          -
          {' '}
          {item.libelle}
        </Text>
      </View>
    </ScrollView>
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
        <Text>Chargement des données...</Text>
      </View>
    );
  }
}

export default PromotionList;
