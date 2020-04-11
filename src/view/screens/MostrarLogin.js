import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Login from '../components/Login'

class MostrarLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Login navigation={this.props.navigation} />
    );
  }
}

export default MostrarLogin;
