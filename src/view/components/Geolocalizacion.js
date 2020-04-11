import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions } from 'react-native';
import { MapView } from 'expo';

export default class Geolocalizacion extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      region: {
        latitude: this.props.navigation.getParam('localiz_lat'),
        longitude: this.props.navigation.getParam('localiz_long'),
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      //nameDesastre: this.props.navigation.getParam('name')
    }
  }
 
  render() {
    //const { navigation } = this.props;
    //const photo = this.state.image //navigation.getParam('imageParam', null);
    return (
      <View>
        <MapView
          style={ styles.map }
          region={this.state.region}
          //onRegionChange={this.onRegionChange}  
        >
          <MapView.Marker draggable
            coordinate={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude
            }}
          />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //marginTop: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    //marginTop: 20,
    flex: 0,
    height: Dimensions.get('window').height,///2,
    width: Dimensions.get('window').width
  },
  local: {
    alignSelf: 'center',
    color: '#336633',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  nameDisaster: {
    alignSelf: 'center',
    color: '#336633',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
  },
  long: {
    marginTop: 10,
    fontSize:15,
    textAlign: 'left'
  },
  buttonLocate: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#336633',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 25,
    paddingLeft: 25,
    marginTop: 10,
    width: 300
  }
})