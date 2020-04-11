import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, Text, KeyboardAvoidingView, Platform, ImageBackground, StyleSheet } from 'react-native';
import SocketIO from 'react-native-socket.io-client'
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class MyChat extends React.Component {
    constructor(props) {
        super(props);
        this.ids = 1
        this.state = {};
        if (this.socket == null) {
            this.socket = new SocketIO('https://boiling-citadel-30517.herokuapp.com/');
            this.socket.on('chat', (message) => { this.onReceivedMessage(message) });
            this.socket.on('enviaDatos', (message) => { this.onDatosRecibidos(message) })
            this.onReceivedMessage = this.onReceivedMessage.bind(this);
            this.onDatosRecibidos = this.onDatosRecibidos.bind(this);
        }

    }

    onSend = (messages = []) => {
        this.ids++

        respuestaChat = [
            {
                _id: Math.round(Math.random() * 1000000),
                text: messages[0].text,
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'Doctor',
                    avatar: 'https://firebasestorage.googleapis.com/v0/b/proyectotaesfront.appspot.com/o/iconos%2Fdoctor.png?alt=media&token=49f25e75-68cd-4ab6-829c-26eb8c2f0c40',
                },
                sent: true,
                received: true,
            },
        ]

        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, respuestaChat),
        }));

        this.socket.emit('chat', messages[0].text)
    }


    onDatosRecibidos(datos){
        console.log(datos.text)
        var aux2 = [ datos ]
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, aux2),
        }));
    }

    onReceivedMessage(mens) {
        this.ids++;
        var aux = [
            {
                _id: this.ids,
                text: mens,
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "Persona",
                    avatar: "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1"
                },
                sent: true,
                received: true,
            }
        ]
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, aux),
        }));
    }

    componentDidMount() {
        this.setState({
            messages: [
            ]
        });
        this.socket.emit('medicoReady', 'Ola que ase')
    }

    render() {
        return (
            <ImageBackground style={styles.backgroundImage}>
                <GiftedChat
                    isAnimated={true}
                    messages={this.state.messages}
                    onSend={(messages) => this.onSend(messages)}
                    renderCustomView={this.renderCustomView}
                    renderSend={this.renderSend}
                    onAddMessage={this.onAddMessage}
                    showUserAvatar={true}
                    showAvatarForEveryMessage={true}

                    user={{
                        _id: 1,
                        name: 'Doctor',
                        avatar: 'https://firebasestorage.googleapis.com/v0/b/proyectotaesfront.appspot.com/o/iconos%2Fdoctor.png?alt=media&token=49f25e75-68cd-4ab6-829c-26eb8c2f0c40',
                    }}
                    parsePatterns={linkStyle => [
                        {
                            pattern: /#(\w+)/,
                            style: { ...linkStyle, color: 'lightgreen' },
                            onPress: props => alert(`press on ${props}`),
                        },
                    ]}
                />
                {Platform.OS === 'android' ? <KeyboardSpacer /> : null}
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
});