import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Progress from 'react-native-progress';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import {getHomePageData} from '../stores/homeStore';
import Footer from './Footer';
import SelectCategories from './SelectCategories';
import DatePicker from 'react-native-date-picker';
import { useIsFocused } from '@react-navigation/native'

export default function Home({navigation, route}) {
  const [homeData, setHomeData] = useState({});
  const {userId, username} = route.params

  const categoryIcons = {
    History: 'book-open',
    Music: 'music',
    Sport: 'trophy',
    Art: 'palette',
    Geography: 'globe-americas',
    Movies: 'film',
    Science: 'bacteria',
    Food: 'drumstick-bite',
    Technology: 'robot',
    Pop: 'tv'
  };
  const isFocused = useIsFocused()

  useEffect(() => {
    if(isFocused){
      getHomePageData(userId).then(res => {
        setHomeData(res);
      });
    }
  }, [isFocused])

  return (
    <View className="flex-1">
      <ScrollView>
        <View className="flex-1 justify-start items-start m-5">
          <Text className="text-base text-blue-800 mb-4" style={{fontFamily: "ShantellSans-Regular"}}>
            Welcome back, {homeData.username}
          </Text>
          <Text className="text-4xl text-blue-950" style={{fontFamily: "ShantellSans-Bold"}}>Let's play!</Text>
          <View className="bg-blue-950 rounded-2xl p-5 w-full mt-7">
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-col justify-center items-center">
                <Text className="text-white font-bold text-lg mb-3">
                  {homeData.daysInARow} days strike!
                </Text>
                <View className="flex justify-start items-center flex-row">
                  <Icon name="gem" size={14} color="white" />
                  <Text className="text-white ml-1">+100 daily points</Text>
                </View>
              </View>
              <View className="mr-4">
                <Icon name="gem" size={28} color="white" />
              </View>
            </View>
            <Progress.Bar
              progress={homeData.daysInARow ? homeData.daysInARow / 20 : 0.0}
              width={null}
              className="bg-white mt-2"
            />
          </View>
          <Text className="mt-6 text-blue-950 font-bold text-lg">
            Daily quiz
          </Text>
          <View className="border-2 border-gray-300 rounded-2xl p-5 w-full mt-2">
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-col items-center">
                <Text className="text-blue-950 font-bold text-xl mb-1">
                  Compete globally
                </Text>
                <Text className="mb-4 text-blue-800">+ 10k users</Text>
                {!homeData.globalDone ? (
                  <Pressable className="bg-blue-400 py-2 px-3 rounded-md">
                    <Text
                      className="text-white"
                      onPress={() =>
                        navigation.navigate('QuizGame', {
                          userId: userId,
                          Id: 1,
                          userName: username,
                          isLeagueQuiz: true
                        })
                      }
                    >
                      Play now!
                    </Text>
                  </Pressable>
                ) : (
                  <View className="bg-gray-300 py-2 px-3 rounded-md">
                    <Text className="text-white">Come back tommorow</Text>
                  </View>
                )}
              </View>
              <View className="mr-5">
                <IconM name="brain" size={44} color="#172554" />
              </View>
            </View>
          </View>
          <Text className="mt-6 text-blue-950 font-bold text-lg mb-2">
            Favourite categories
          </Text>
          <View className="flex flex-row justify-evenly w-full items-center flex-wrap">
            {homeData.favouriteCategories &&
              homeData.favouriteCategories.map(cat => (
                <TouchableOpacity
                  disabled={cat.dailyDone}
                  style={{opacity: cat.dailyDone ? 0.4 : 1}}
                  onPress={() =>
                      navigation.navigate('QuizGame', {
                        userId: userId,
                        Id: cat.categoryId,
                        isLeagueQuiz: false,
                        userName: username
                      })}
                  className="flex flex-col justify-evenly items-center border-2 border-gray-300 rounded-xl w-40 h-32 mt-3"
                  key={cat.categoryId}>
                  <Icon
                    name={categoryIcons[cat.categoryName]}
                    size={50}
                    color="#172554"
                  />
                  <Text className="text-blue-950 text-lg font-bold">
                    {cat.categoryName}
                  </Text>
                </TouchableOpacity>
              ))}
            <TouchableOpacity
              className="flex flex-col justify-evenly items-center border-2 border-gray-300 rounded-xl w-40 h-32 mt-7"
              onPress={() =>
                navigation.navigate('SelectCategories', {
                  selected: homeData.favouriteCategories ? homeData.favouriteCategories.map(
                    cat => cat.categoryId) : [],
                  userId: userId,
                  username: username
                })
              }>
              <Icon name="pen" size={50} color="#172554" />
              <Text className="text-blue-950 text-lg font-bold ">Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer navigation={navigation} current="home" userId={userId} username={username}/>
    </View>
  );
}
