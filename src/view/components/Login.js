import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase';

class Login extends Component {
    static navigationOptions = {
        //headerTitle: 'AyudApp',
        headerTitleStyle: {
            textAlign: 'center', 
            flex: 1,
            color: '#F0F4F8'
        }
    };
    
    constructor(props) {
        super(props);
        this.state = {
            inputDNI: 'prueba'
        };
    }

    componentDidMount() {
                // Initialize Firebase
                const firebaseConfig = {
                    apiKey: "AIzaSyCsLjV9epHO5mTJpSaQ3IxBcG3w7rVE4_c",
                    authDomain: "proyectotaesfront.firebaseapp.com",
                    databaseURL: "https://proyectotaesfront.firebaseio.com",
                    projectId: "proyectotaesfront",
                    storageBucket: "proyectotaesfront.appspot.com",
                    messagingSenderId: "354575841219"
                };
        
                if (!firebase.apps.length) {
                    firebase.initializeApp(firebaseConfig);
                }
        }


    logarse = () => {
        var dni = this.state.inputDNI
        firebase.database().ref('Medicos').once('value').then((snapshot) => {
            var enc = false
            snapshot.forEach((element) => {
                if(enc == false){
                    if(dni == element.val().dni){
                        enc = true
                        this.props.navigation.navigate('MostrarListaChats',{navigation: this.props.navigation})
                    } else {
                        alert('Usuario/Contraseña desconocidos.')
                    }
                }
            });
        }).catch((err) => {
            alert('Error de Base de datos')
        })
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.LogoCont}>
                    <Image style={styles.logo} source={require('../../../assets/telephone.png')} />
                </View>
                <View style={styles.FormCont}>
                    <TextInput 
                        onChangeText={inputDNI => this.setState({inputDNI})}
                        style={styles.input} 
                        placeholderTextColor='rgba(0,0,0,0.7)' 
                        placeholder='DNI'
                        value='48681663R' />
                    <TextInput style={styles.input} value='48681663R' secureTextEntry placeholderTextColor='rgba(0,0,0,0.7)' placeholder='Contraseña' />
                </View>
                <TouchableOpacity onPress={() => {
                    this.logarse()
                }} style={styles.butcont}>
                    <Text style={styles.but}>Login</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    logo: {
        width: 200,
        height: 200
    },
    LogoCont: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    FormCont: {
        marginHorizontal: 20
    },
    input: {
        height: 40,
        width: 120,
        backgroundColor: 'rgba(255,255,255,0.0)',
        marginBottom: 20,
        paddingBottom: 20,
        alignSelf: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#000000'
    },
    butcont:{
        backgroundColor: '#4C63B6',
        paddingVertical: 20,
    },
    but: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
    }
})

export default Login;
