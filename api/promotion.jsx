import React from 'react'
import { View, Text, StyleSheet,FlatList,ScrollView } from 'react-native'
import  {dbPromo} from '../config/firbaseConfig';




class ListPromotion extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.getListPromo();
  }


  getListPromo = async () => {

    await dbPromo.on('value', (snapshot)=>{
      let promo = snapshot.val();

      for(var key in promo) {
        this.state.data.push({
          id :key,
          libelle : promo[key]['libelle'],
          date_debut : promo[key]['date_debut'],
          date_expiration: promo[key]['date_expiration']
        });
        this.state.refreshing=true;
      }

      console.log(snapshot.val());
      this.setState({data:this.state.data})
    });

  }

  _renderItem = ({ item }) => (
    <ScrollView>
      <View>
        <Text style={styles.id}>{item.id} - {item.libelle}</Text>
      </View>
    </ScrollView>
  )

  render() {
    if (this.state.data){
      return (
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={this.state.data}
          extraData={this.state}
          renderItem={this._renderItem} />
      )
    }else{
      return (
        <View>
          <Text>Le chargement des données...!</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default ListPromotion;


