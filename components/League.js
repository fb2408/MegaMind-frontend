import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Footer from './Footer';
import Icon from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/FontAwesome5';

const persons = [
  {
    name: 'Ante',
    surname: 'Dražić',
    points: 544,
    image: 'image',
    up: 1,
  },
  {
    name: 'Mate',
    surname: 'Ivić',
    points: 621,
    image: 'image',
    up: -1,
  },
  {
    name: 'Marko',
    surname: 'Žura',
    points: 698,
    image: 'image',
    up: 0,
  },
  {
    name: 'Filip',
    surname: 'Bura',
    points: 500,
    image: 'image',
    up: 1,
  },
  {
    name: 'Zvonimir',
    surname: 'Ravlić',
    points: 499,
    image: 'image',
    up: 0,
  },
  {
    name: 'Luka',
    surname: 'Gjurić',
    points: 634,
    image: 'image',
    up: -1,
  },
  {
    name: 'Miki',
    surname: 'Rapaić',
    points: 250,
    image: 'image',
    up: -1,
  },
];

const quizDone = false;

export default function League({navigation}) {

  persons.sort((a, b) => b.points - a.points);

  const arrayCopy = [];
  let elem = persons[1];
  elem.order = 2;
  arrayCopy.push(elem);
  elem = persons[0];
  elem.order = 1;
  arrayCopy.push(elem);
  elem = persons[2];
  elem.order = 3;
  arrayCopy.push(elem);


  return (
    <View className='flex-1'>
      <ScrollView>
        <View className='m-5 flex-1 flex items-center'>
          <Text className='font-black text-3xl text-blue-950 mt-2 mb-6'>Leaderboard</Text>
          <Text className='font-bold text-lg text-blue-900 mb-6'>This week</Text>
          <View className='flex flex-row justify-between items-end w-full mb-6'>
            {arrayCopy.map((person, index) => {
              if (index === 1) {
                return (
                  <View className='flex justify-center items-center py-2 px-4 border-2 border-gray-300 rounded-3xl'
                        key={index}>
                    <Text className='font-black text-blue-950 text-2xl mb-2'>#{person.order}</Text>
                    <Image
                      className='rounded-full w-24 h-24'
                      source={require('../public/icons/people_icon.jpg')
                      }
                    />
                    <Text
                      className='text-lg font-bold text-blue-950 mt-4'>{person.name + ' ' + person.surname.substr(0, 1) + '.'}</Text>
                    <Text className='text-blue-800'>{person.points} points</Text>
                  </View>
                );
              }
              return (
                <View className='flex justify-center items-center py-2 px-3 border-2 border-gray-300 rounded-3xl'
                      key={index}>
                  <Text className='font-black text-blue-950 text-2xl mb-2'>#{person.order}</Text>
                  <Image
                    className='rounded-full w-16 h-16'
                    source={require('../public/icons/people_icon.jpg')
                    }
                  />
                  <Text
                    className='text-lg font-bold text-blue-950 mt-4'>{person.name + ' ' + person.surname.substr(0, 1) + '.'}</Text>
                  <Text className='text-blue-800'>{person.points} points</Text>
                </View>
              );
            })}
          </View>
          {persons.map((person, index) => {
            if (index > 2) {
              return (
                <View className='flex flex-row items-center w-full border-2 border-gray-300 rounded-xl mb-5 p-2'
                      key={index}>
                  <Text className='font-semibold text-blue-950 mr-4'>#{index + 1}</Text>
                  <View className='flex flex-row items-center flex-1 justify-between'>
                    <View className='flex flex-row items-center'>
                      <Image source={require('../public/icons/people_icon.jpg')}
                             className='w-10 h-10 rounded-full mr-2' />
                      <Text
                        className='font-semibold text-blue-950 text-base'>{person.name + ' ' + person.surname.substr(0, 1) + '.'}</Text>
                    </View>
                    <View className='flex flex-row items-center'>
                      {person.up === -1 ? (
                        <Icon
                          name='arrowdown'
                          size={20}
                          color='red'
                        />
                      ) : person.up === 0 ? (
                        <IconF
                          name='grip-lines'
                          size={20}
                          color='gray'
                        />
                      ) : (
                        <Icon
                          name='arrowup'
                          size={20}
                          color='green'
                        />
                      )}
                      <Text className='text-blue-800 mx-2'>{person.points} points</Text>
                    </View>
                  </View>
                </View>
              );
            }
          })}
          <Text className="font-bold text-xl text-blue-900 mb-4">Play this league's questions!</Text>
          <TouchableOpacity className="bg-blue-400 py-2 px-3 rounded-md">
            <Text className="text-lg text-white">Play!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer navigation={navigation} current="leagues"/>
    </View>
  );
}

