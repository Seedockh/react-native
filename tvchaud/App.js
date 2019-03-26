import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
const axios = require('axios');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showsList: {},
      dataReady: false,
    }
  }

  async componentDidMount() {
    await axios.get('http://api.tvmaze.com/search/shows?q=game').then(async (res)=>{
      await this.setState({showsList: res.data})
    }).catch((err)=>{
      console.log(err);
    }).then(async ()=>{
      const ready = this.state.showsList.length > 0 ? true : false;
      await this.setState({dataReady:ready})
      console.log("componentDidMount : fetched !");
    });
  }

  render() {
    let { showsList, dataReady } = this.state;
    console.log("Rendering...");
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Shows List :</Text>
        {dataReady &&
          <FlatList
              data={showsList}
              renderItem={({show})=>
                <View style={styles.container} key={show.id}>
                  <Text style={styles.text}>{show}</Text>
                </View>
              }
          />
        }
        {!dataReady &&
          <Text style={styles.text}>Loading...</Text>
        }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#030026',
    padding: 50,
  },
  title: {
    color: 'red',
    fontSize: 30,
  },
  text: {
    color: '#f2fcff',
    fontSize: 20,
    width: 100,
  }
});
