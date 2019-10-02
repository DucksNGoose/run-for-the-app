import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Content, Container, Card, CardItem} from 'native-base'
import { FlatList } from 'react-native-gesture-handler';


export default class GalleryScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {isLoading: true}
  }

  componentWillMount(){
    fetch('https://run-ford-future-fiap.herokuapp.com/api/v1/images')
    .then(response => response.json())
    .then(data => {
      
      this.setState({isLoading: false, dataSource : data.data})

    })
  }

  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
      return(
      <ScrollView style={styles.container}>
        <View>
        <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => (
              <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                <TouchableOpacity
                  key={item.id}
                  style={{ flex: 1 }}
                  onPress={() => {}}>
                  <Image
                    style={styles.image}
                    source={{uri: item.base64_img,}}
                  />
                </TouchableOpacity>
              </View>
            )}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}/>
        </View>
      </ScrollView>
    )
  }
}

GalleryScreen.navigationOptions = {
  title: 'Gallery'
};

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: '100%',
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});