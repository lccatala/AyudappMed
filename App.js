import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MostrarLogin from "./src/view/screens/MostrarLogin";
import MostrarListaChats from "./src/view/screens/MostrarListaChats";
import MostrarChatMed from './src/view/screens/MostrarChatMed';
import MostrarLocalizacion from "./src/view/screens/MostrarLocalizacion";
import { createStackNavigator, createAppContainer, StackViewTransitionConfigs } from 'react-navigation';
import { fromRight } from 'react-navigation-transitions';

console.disableYellowBox = true;

const App = createStackNavigator(
  {
    MostrarLogin: {screen: MostrarLogin},
    MostrarListaChats: {screen: MostrarListaChats},
    MostrarChatMed: {screen: MostrarChatMed},
    MostrarLocalizacion: {screen: MostrarLocalizacion},
  },
  {
    initialRouteName: 'MostrarLogin',
    transitionConfig: () => fromRight(/* Duration time = 300 default*/ 300),
    defaultNavigationOptions: {
      headerTitle: 'AyudAppMed',
      headerTitleStyle: {
        color: '#F0F4F8',
      },
      headerStyle: {
        backgroundColor: '#4C63B6'
      },
      headerBackTitle: null,
      headerTintColor: '#F0F4F8',
    /*
      headerStyle: {
        justifyContent: 'center'
      }*/
    }
  });

  const AppContainer = createAppContainer(App);

  export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
