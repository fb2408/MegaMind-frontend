import React from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';

export default function App() {
  return (
    <View className='flex-1'>
      <ScrollView>
      <Home />
      </ScrollView>
      <Footer />
    </View>
  );
}
