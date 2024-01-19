import React from 'react';
import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Leagues from './components/Leagues';
import League from './components/League';
import Profile from './components/Profile';
import SelectCategories from './components/SelectCategories';
import QuizGame from './components/QuizGame';
import Login from './components/Login';
import SignUp from './components/SignUp';
import QuizComplete from './components/QuizComplete';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{animationEnabled: false}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen
          name="Leagues"
          component={Leagues}
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen
          name="League"
          component={League}
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen
          name="SelectCategories"
          component={SelectCategories}
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen
          name="QuizGame"
          component={QuizGame}
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen
          name="QuizComplete"
          component={QuizComplete}
          options={{headerShown: false, animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false, animation: 'none'}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false, animation: 'none'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
