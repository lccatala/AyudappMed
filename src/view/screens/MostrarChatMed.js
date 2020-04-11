import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Chat from '../components/Chat'

class MostrarChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Chat navigation={this.props.navigation} />
        );
    }
}

export default MostrarChat;
