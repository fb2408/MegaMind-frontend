import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Leagues from './components/Leagues';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{animationEnabled: false}}>
        <Stack.Screen
        name='Home'
        component={Home}
        options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen
          name='Leagues'
          component={Leagues}
          options={{headerShown: false, animation: 'none'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
