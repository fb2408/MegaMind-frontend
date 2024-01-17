import {Text, View, StyleSheet, Pressable, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Progress from 'react-native-progress';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/Entypo';
import {getHomePageData} from "../stores/homeStore";
import Footer from './Footer'

export default function Home({navigation}) {
  const [homeData, setHomeData] = useState({});

  useEffect(()=>{
    getHomePageData(4).then(res => {
      setHomeData(res);
    });
  },[]);

  return (
    <View className='flex-1'>
      <ScrollView>
        <View className='flex-1 justify-start items-start m-5'>
          <Text className='text-lg text-blue-800'>Welcome back, {homeData.username && homeData.username}</Text>
          <Text className='font-black text-3xl text-blue-950'>Let's play!</Text>
          <View className='bg-blue-950 rounded-2xl p-5 w-full mt-7'>
            <View className='flex flex-row justify-between items-center'>
              <View className='flex flex-col justify-center items-center'>
                <Text className='text-white font-bold text-lg mb-3'>{homeData.daysInARow && homeData.daysInARow} days strike!</Text>
                <View className='flex justify-start items-center flex-row'>
                  <Icon
                    name='gem'
                    size={14}
                    color='white'
                  />
                  <Text className='text-white ml-1'>+10 daily points</Text>
                </View>
              </View>
              <View className='mr-4'>
                <Icon
                  name='gem'
                  size={28}
                  color='white'
                />
              </View>
            </View>
            <Progress.Bar progress={homeData.daysInARow ? homeData.daysInARow / 20 : 0.0} width={null} className='bg-white mt-2' />
          </View>
          <Text className='mt-6 text-blue-950 font-bold text-lg'>
              Daily quiz
          </Text>
          <View className='border-2 border-gray-300 rounded-2xl p-5 w-full mt-2'>
              <View className='flex flex-row justify-between items-center'>
                  <View className='flex flex-col items-center'>
                      <Text className='text-blue-950 font-bold text-xl mb-1'>
                          Compete globally
                      </Text>
                      <Text className='mb-4 text-blue-800'>+ 10k users</Text>
                      {!homeData.globalDone ? (
                          <Pressable className='bg-blue-400 py-2 px-3 rounded-md'>
                            <Text className='text-white'>Play now!</Text>
                          </Pressable>
                      ) : (
                          <View className='bg-gray-300 py-2 px-3 rounded-md'>
                            <Text className='text-white'>Come back tommorow</Text>
                          </View>
                      )}

                  </View>
                  <View className='mr-5'>
                      <IconM
                      name='brain'
                      size={44}
                      color='#172554'
                      />
                  </View>
              </View>
          </View>
          <Text className='mt-6 text-blue-950 font-bold text-lg mb-2'>
            Favourite categories
          </Text>
          <View className='flex flex-row justify-between w-full flex-wrap'>
            <TouchableOpacity
              className='flex flex-col justify-evenly items-center border-2 border-gray-300 rounded-xl w-40 h-32'>
              <Icon
                name='music'
                size={50}
                color='#172554'
              />
              <Text className='text-blue-950 text-lg font-bold'>
                Music
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='flex flex-col justify-evenly items-center border-2 border-gray-300 rounded-xl w-40 h-32'>
              <Icon
                name='trophy'
                size={50}
                color='#172554'
              />
              <Text className='text-blue-950 text-lg font-bold'>
                Sport
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='flex flex-col justify-evenly items-center border-2 border-gray-300 rounded-xl w-40 h-32 mt-7'>
              <Icon
                name='palette'
                size={50}
                color='#172554'
              />
              <Text className='text-blue-950 text-lg font-bold'>
                Art
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='flex flex-col justify-evenly items-center border-2 border-gray-300 rounded-xl w-40 h-32 mt-7'>
              <Icon
                name='plus'
                size={50}
                color='#172554'
              />
              <Text className='text-blue-950 text-lg font-bold '>
                Add new
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer navigation={navigation} current="home"/>
    </View>
  );
}
