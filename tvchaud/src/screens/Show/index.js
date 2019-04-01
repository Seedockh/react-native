import React from 'react';
import { StyleSheet, ScrollView, Text, Container, Image } from 'react-native';

export default class ShowScreen extends React.Component {
  render() {
    let showData = this.props.navigation.state.params.showData;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>{showData.name}</Text>
        {showData.image===null &&
          <Image
            style={{width: 300, height: 300, marginLeft: 50, marginRight: 50}}
            source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png'}}
          />
        }
        {showData.image!==null &&
          <Image
            style={{width: 300, height: 300, marginLeft: 50, marginRight: 50}}
            source={{uri: showData.image.original}}
          />
        }
        {showData.summary!==null &&
          <Text style={styles.synopsis}>{showData.summary.replace(/<\/?.>/gm,'')}</Text>
        }
        {showData.summary===null &&
          <Text style={styles.synopsis}>No summary found.</Text>
        }

      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#030026',
    textAlign: "center",
  },
  title: {
    color: 'white',
    fontSize: 30,
    margin: 50,
  },
  text: {
    color: '#f2fcff',
    fontSize: 20,
    width: 200,
  },
  synopsis: {
    color: '#f2fcff',
    fontSize: 15,
    padding: 50,
  },
});
