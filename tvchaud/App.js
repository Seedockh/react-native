import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/Home';
import ShowScreen from './src/screens/Show';


/********

Routing : reactnavigation.org
CSS in JS : styled-components package

**********/

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Show: { screen: ShowScreen },
});
    console.log("STARTING");
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
