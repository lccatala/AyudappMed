import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Geolocalizacion from '../components/Geolocalizacion';

export default class Localizacion extends React.Component {
 
  /*static navigationOptions = {
    headerTitle: 'Localizacion',
  };*/

  render() {
    return (
        <View style={styles.container}>
            <Geolocalizacion navigation={this.props.navigation}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});