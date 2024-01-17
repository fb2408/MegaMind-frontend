import {Text, View, StyleSheet, Image} from 'react-native';
import Footer from './Footer';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect, useState} from 'react';
import {getHomePageData} from '../stores/homeStore';
import IconAnt from 'react-native-vector-icons/AntDesign'
import IconFont5 from 'react-native-vector-icons/FontAwesome5'
import IconFont6 from 'react-native-vector-icons/FontAwesome6'

export default function Profile({navigation}) {

  const [data, setData] = useState({});

  function fetchData(id) {
    fetch('https://mega-mind-backend-2fe25339801f.herokuapp.com/user/' + id + '/profile')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData(4);
  }, []);

  return (
    <View className='flex-1'>
      <View className='flex-1 justify-start items-center'>
        <LinearGradient
          colors={['rgb(30 64 175)', 'rgb(23 37 84)']}
          useAngle={true} angle={45} angleCenter={{x: 0.2, y: 0.5}}
          className='flex items-center justify-start h-1/4 w-full'>
          <Text className='text-white font-black text-4xl mt-6'>Profile</Text>
        </LinearGradient>

        <View className='flex w-full p-5 bg-white rounded-3xl items-center absolute top-32 bottom-0'>
          <Text className='text-blue-950 font-bold text-xl mt-12 mb-2'>Marko Žura</Text>
          <Text className='text-blue-800 mb-5'>@{data.userName}</Text>
          <View className='flex flex-row w-full justify-between flex-wrap'>

            <View className="border-2 border-gray-200 rounded-xl flex items-center px-3 py-5" style={styles.container}>
              <IconFont6
                name="ranking-star"
                size={36}
                color="#A0522D"
              />
              <Text className="text-blue-950 font-bold text-xl mt-2 mb-1">#{data.globalLeagueRank}</Text>
              <Text className="text-blue-800">World rank</Text>
            </View>

            <View className="border-2 border-gray-200 rounded-xl flex items-center px-3 py-5" style={styles.container}>
              <IconAnt
                name="star"
                size={36}
                color="#FFDB58"
                />
              <Text className="text-blue-950 font-bold text-xl mt-2 mb-1">#{data.level}</Text>
              <Text className="text-blue-800">Level</Text>
            </View>

            <View className="border-2 border-gray-200 rounded-xl flex items-center px-3 py-5" style={styles.container}>
              <IconFont5
                name="gem"
                size={36}
                color="purple"
              />
              <Text className="text-blue-950 font-bold text-xl mt-2 mb-1">#{data.userXp}</Text>
              <Text className="text-blue-800">Experience</Text>
            </View>

            <View className="border-2 border-gray-200 rounded-xl flex items-center px-3 py-5 mt-3" style={styles.container}>
              <IconFont5
                name="gamepad"
                size={36}
                color="#FFDEAD"
              />
              <Text className="text-blue-950 font-bold text-xl mt-2 mb-1">#{data.answeredQuestions}</Text>
              <Text className="text-blue-800">Answered</Text>
            </View>

            <View className="border-2 border-gray-200 rounded-xl flex items-center px-3 py-5 mt-3" style={styles.container}>
              <IconFont5
                name="check-square"
                size={36}
                color="green"
              />
              <Text className="text-blue-950 font-bold text-xl mt-2 mb-1">#{Math.round((data.answeredCorrect / data.answeredQuestions) * 100)}%</Text>
              <Text className="text-blue-800">Correct</Text>
            </View>

            <View className="border-2 border-gray-200 rounded-xl flex items-center px-3 py-5 mt-3" style={styles.container}>
              <IconAnt
                name="closesquareo"
                size={36}
                color="red"
              />
              <Text className="text-blue-950 font-bold text-xl mt-2 mb-1">#{Math.round(((data.answeredQuestions - data.answeredCorrect) / data.answeredQuestions) * 100)}%</Text>
              <Text className="text-blue-800">Incorrect</Text>
            </View>

          </View>
        </View>
        <View className="absolute top-20 bg-white p-1 rounded-full">
          <Image
            source={require('../public/icons/people_icon.jpg')}
            className="w-24 h-24 rounded-full"
                 />
        </View>
      </View>
      <Footer navigation={navigation} current='profile' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "31%"
  }
});


