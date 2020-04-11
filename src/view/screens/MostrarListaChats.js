import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import SocketIO from 'react-native-socket.io-client'
import { Card, ListItem, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import call from 'react-native-phone-call'
//import Icon from 'react-native-vector-icons/FontAwesome';


class MostrarListaChats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [
        {
          img: 'https://firebasestorage.googleapis.com/v0/b/proyectotaesfront.appspot.com/o/iconos%2Ftelephone.png?alt=media&token=5760d4d8-cb34-4eff-ad6a-41a926b01815',
          title: 'Contusión',
          subtitle: 'Cabeza',
          ubi: {latitude: 37.78825, longitude: -122.4324},
          argsTelefono: {number: '656233998', prompt: false}
        },
      ]
    };
    this.socket = SocketIO('https://boiling-citadel-30517.herokuapp.com/');
    this.socket.on('newEmergencia', (message) => {this.onReceivedMessage(message)});
    this.notificame = this.notificame.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
  }

  componentDidMount(){

  }

  /*
  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#FFFFFF' }}
      />
    );
  };*/

  onReceivedMessage = (message) => {
    var mensaje = JSON.parse(message)
    this.setState(prevState => ({
      chats: [...prevState.chats,         {
        img: 'https://firebasestorage.googleapis.com/v0/b/proyectotaesfront.appspot.com/o/iconos%2Ftelephone.png?alt=media&token=5760d4d8-cb34-4eff-ad6a-41a926b01815',
          title: mensaje.titulo,
          subtitle: mensaje.donde,
          ubi: {latitude: parseFloat(mensaje.lat), longitude: parseFloat(mensaje.lon)},
          argsTelefono: {number: mensaje.telefono, prompt: false}
      }]
    }))
}

notificame(){
  this.socket.emit('message','tu puta madree');
}

  render() {
    return (
      <ScrollView style={styles.scrol}>
        <View style={styles.container}>
          <Card title="INCIDENCIAS" containerStyle={{marginBottom: 10}} titleStyle={{color: '#334E68'}}>
            {
              this.state.chats.map((u, i) => {
                return (
                  <View key={i} style={styles.user}>
                    <Card
                      title={u.title}
                      image={{ uri: u.img }}
                      imageStyle={ styles.imagen }
                      titleStyle={{color: '#334E68'}}>
                      <Text style={{marginBottom: 10, marginLeft:15, color: '#334E68'}}>
                        {u.subtitle}
                      </Text>
                      <View style={styles.grupoBotones}>
                        <View><Button title="Ver Incidencia" type="outline" buttonStyle={ styles.buttonIncidencias } titleStyle={{color: '#334E68', fontSize:15}}
                              onPress={() => {this.props.navigation.navigate('MostrarChatMed',{navigation: this.props.navigation})}}/></View>
                        <View><Button title="Ver Mapa" type="outline" buttonStyle={ styles.buttonIncidencias } titleStyle={{color: '#334E68', fontSize:15}}
                              onPress={() => { this.props.navigation.navigate('MostrarLocalizacion', {localiz_lat: u.ubi.latitude, localiz_long: u.ubi.longitude}) }}/></View>
                        <View><Button title="Llamar" type="outline" buttonStyle={ styles.buttonIncidencias } titleStyle={{color: '#334E68', fontSize:15}}
                              onPress={() => call(u.argsTelefono).catch(console.error)}/></View>
                      </View>
                    </Card>
                  </View>
                );
              })
            }
          </Card>
        </View>
      </ScrollView>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  imagen: {
    borderRadius: 100,
    height: 50,
    width: 50,
    margin: 5,
    alignSelf: 'center'
  },
  grupoBotones: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titulo: {
    marginTop: 5,
    fontSize: 20,
  },
  scrol: {
    flex: 1,
    backgroundColor: '#F0F4F8'
  },
  buttonIncidencias: {
    marginBottom: 2, 
    marginTop: 2,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#334E68'
  }
})

export default MostrarListaChats;
