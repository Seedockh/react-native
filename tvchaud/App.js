import React from 'react';
import { StyleSheet, Text, FlatList, View, TextInput } from 'react-native';
const axios = require('axios');

/********

Routing : reactnavigation.org
CSS in JS : styled-components package

**********/


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showsList: {},
      dataReady: false,
      text: 'Search a show...',
    }
  }

  componentDidMount() {
    this.state.dataReady ? this.state.showsList : this.getShows();
  }

  getShows(text="") {
    let url = text==="" ? 'shows' : `search/shows?q=${text}`;
    axios.get(`http://api.tvmaze.com/${url}`).then((res)=>{
      this.setState({showsList: res.data})
      console.log(this.state.showsList);
    }).catch((err)=>{
      console.log(err);
    }).then(()=>{
      const ready = this.state.showsList.length > 0 ? true : false;
      this.setState({dataReady:ready})
    });
  }

  render() {
    let { showsList, dataReady } = this.state;
    console.log(showsList);
    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
                   onClick={this.setState({text:''})}
                   onChangeText={(text)=>{
                     this.setState({ dataReady:false, text:text, showsList:this.getShows(text) })
                   }}
                   value={this.state.text} />
        {dataReady &&
          <FlatList
              data={showsList}
              renderItem={({item})=>
                <View style={styles.container}>
                  <Text style={styles.text} key={item.id}>{item.name}</Text>
                </View>
              }
          />
        }
        {!dataReady &&
          <Text style={styles.loader}>Loading...</Text>
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
    width: 200,
  },
  loader: {
    color: 'green',
    fontSize: 20,
    marginTop: 100,
    marginLeft: 100,
    width: 200,
  },
  input: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
  }
});
