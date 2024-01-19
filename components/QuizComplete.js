import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

export default function QuizComplete({navigation, route}) {
  const categoryIcons = [
    {categoryName: 'History', iconName: 'book-open'},
    {categoryName: 'Music', iconName: 'music'},
    {categoryName: 'Sport', iconName: 'trophy'},
    {categoryName: 'Art', iconName: 'palette'},
    {categoryName: 'Geography', iconName: 'globe-americas'},
    {categoryName: 'Movies', iconName: 'film'},
    {categoryName: 'Science', iconName: 'bacteria'},
    {categoryName: 'Food', iconName: 'drumstick-bite'},
    {categoryName: 'Technology', iconName: 'robot'},
    {categoryName: 'Pop-culture', iconName: 'tv'},
  ];

  const [categories, setResult] = useState([]);
  const [score, setScore] = useState(0);
  const {userId, Id, answersToBack, userName, isLeagueQuiz} = route.params;
  const [allCorrect, setAllCorrect] = useState(false);
  let leagueId;
  let categoryId;
  if (isLeagueQuiz) {
    leagueId = Id;
  } else {
    categoryId = Id;
  }

  const calculateIconName = categoryName => {
    let name = categoryIcons
      .filter(icon => icon.categoryName === categoryName)
      .map(icon => icon.iconName)[0];
    console.log(name);
    return name;
  };

  var url = isLeagueQuiz
    ? 'https://mega-mind-backend-2fe25339801f.herokuapp.com/questions/' +
      JSON.stringify(leagueId) +
      '/user/' +
      JSON.stringify(userId)
    : 'https://mega-mind-backend-2fe25339801f.herokuapp.com/questions/category/' +
      JSON.stringify(categoryId) +
      '/user/' +
      JSON.stringify(userId);

  console.log('url' + url);

  const callScoreApi = async () => {
    return await fetch(url, {
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      method: 'POST',
      body: JSON.stringify({
        answers: answersToBack,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log('json' + json);
        console.log(answersToBack);
        console.log('categories' + json.categories);
        setResult(json.categories);
        setScore(json.score);
        console.log('all corrrect' + json.allCorrect);
        setAllCorrect(Boolean(json.allCorrect));
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    callScoreApi();
  }, []);

  return (
    <View className="flex-1">
      <LinearGradient
        colors={['rgb(30 64 175)', 'rgb(23 37 84)']}
        useAngle={true}
        angle={45}
        angleCenter={{x: 0.2, y: 0.5}}
        className="flex-col items-center flex-1 height-screen justify-start height-screen w-full">
        <View className="mt-10 text-center">
          <Text className=" text-2xl text-center text-white">
            {'Congratulations ' + userName}
          </Text>
          <Text className="text-white text-center">
            {'Successfully solved your quiz!'}
          </Text>
        </View>
        <View style={{height: '5%'}} />
        <View clasName="mt-5">
          <Icon
            className="p-5"
            size={120}
            name="lightbulb"
            style={{
              color: '#fff',
              shadowColor: '#fff',
              shadowOffset: {
                width: 0,
                height: 9,
              },
              shadowOpacity: 0.48,
              shadowRadius: 11.95,

              elevation: 18,
            }}
          />
        </View>
        <Text
          style={{color: '#63E6BE'}}
          className="mt-5 text-2xl text-center font-bold">
          {'Your score is ' + score}
        </Text>
        <View
          style={{
            backgroundColor: '#172554',
            width: '90%',
            height: '50%',
            shadowColor: '#fff',
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.48,
            shadowRadius: 11.95,

            elevation: 18,
          }}
          className="mt-5 rounded-xl  flex-col items-center opacity-75 ">
          <ScrollView className="flex-col  w-full center-items">
            {allCorrect && (
              <View
                style={{backgroundColor: '#63E6BE'}}
                className=" rounded-xl p-5 mt-3 ml-3  mr-3">
                <Text className="text-white text-base text-center font-bold">
                  {'All answers are correct. You earned bonus 20 points'}
                </Text>
              </View>
            )}
            {categories &&
              categories.map(category => (
                <View
                  key={category.categoryName}
                  style={{
                    backgroundColor: '#172554',
                  }}
                  className=" rounded-xl p-5 mt-3 ml-3  mr-3">
                  <View className="flex-row items-center w-full">
                    <Icon
                      className="ml-10"
                      color={'#63E6BE'}
                      name={calculateIconName(category.categoryName)}
                      size={60}
                    />
                    <View className="ml-7">
                      <Text
                        style={{
                          color: '#63E6BE',
                          opacity: 1,
                        }}
                        className="text-white opacity-1 font-bold">
                        {String(category.categoryName).toUpperCase()}
                      </Text>
                      <Text className="text-white">
                        {category.points + ' obtained points'}
                      </Text>
                      <Text className="text-white">
                        {String(
                          (parseFloat(category.numberOfCorrect) /
                            parseFloat(category.numberOfQuestions)) *
                            parseFloat(100),
                        ).split('.')[0] + '% correct answers'}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
          </ScrollView>
        </View>
        <Pressable
          style={{backgroundColor: '#172554'}}
          className=" mt-5 bg-white items-center rounded-xl w-24 h-10"
          onPress={() => {
            if (isLeagueQuiz) {
              navigation.navigate('League', {
                leagueId: leagueId,
                userId: userId,
                username: userName,
              });
            } else {
              navigation.navigate('Home', {
                userId: userId,
                username: userName,
              });
            }
          }}>
          <Text className="text-white p-1 text-lg text-center">
            {'Next ->'}
          </Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  opacity: {},
});
