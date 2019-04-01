import React from 'react';
import { StyleSheet, Image, Text, FlatList, View,
         TextInput, Button, TouchableOpacity } from 'react-native';
const axios = require('axios');

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showsList: {},
      dataReady: false,
      text: '',
    }
  }

  componentDidMount() {
    this.state.dataReady ? this.state.showsList : this.getShows();
  }

  getShows(text="") {
    console.log("--- GETTING SHOWS ---");
    this.setState({dataReady:false});
    let url = text==="" ? 'shows' : `search/shows?q='${text}'`;
    axios.get(`http://api.tvmaze.com/${url}`).then((res)=>{
      res.data = text==="" ? res.data : res.data.map((r)=>r.show);
      this.setState({showsList: res.data})
    }).catch((err)=>{
      console.log(err);
    }).then(()=>{
      const ready = this.state.showsList.length > 0 ? true : false;
      this.setState({dataReady:ready})
    });
  }

  render() {
    let { showsList, dataReady, text } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>TVChaud</Text>
        <TextInput style={styles.input}
                   onChangeText={(text)=>{
                     this.setState({ text:text })
                     this.getShows(text);
                   }}
                   value={this.state.text} />
        {dataReady &&
          <>
            <Text style={styles.found}>{showsList.length} show(s) found.</Text>
            <FlatList
                data={showsList}
                renderItem={({item,index})=>
                  <TouchableOpacity onPress={()=>this.props.navigation.navigate('Show',{showData:item})}>
                    <View style={styles.listContainer}>
                    {item.image!==null &&
                      <Image
                        style={{width: 50, height: 50, marginRight: 20}}
                        source={{uri: item.image.medium}}
                      />
                    }
                    {item.image===null &&
                      <Image
                        style={{width: 50, height: 50, marginRight: 20}}
                        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'}}
                      />
                    }
                      <Text style={styles.text}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                }
                keyExtractor={(item)=>item.id.toString()}
            />
          </>
        }
        {!dataReady &&
          <>
          {showsList.length===0 &&
            <Text style={styles.nofound}>0 show found.</Text>
          }
          {showsList.length>0 &&
            <Text style={styles.loader}>Loading...</Text>
          }
          </>
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
    padding: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },
  listContainer: {
    flexDirection: 'row',
    backgroundColor: '#030026',
    padding: 20,
    marginBottom: -1,
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 2,
  },
  title: {
    color: '#ffc8b5',
    fontSize: 40,
    marginBottom: 10,
  },
  text: {
    color: '#f2fcff',
    fontSize: 20,
    width: 200,
  },
  found: {
    color: '#f2fcff',
    fontSize: 12,
    marginLeft: 200,
    marginTop: -10,
    marginBottom: 10,
    width: 200,
  },
  loader: {
    color: 'green',
    fontSize: 20,
    marginTop: 100,
    marginLeft: 100,
    width: 200,
  },
  nofound: {
    color: 'white',
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
    marginBottom: 20,
  }
});
