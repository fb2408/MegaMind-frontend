import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Footer from './Footer';
import Icon from 'react-native-vector-icons/AntDesign';
import IconF from 'react-native-vector-icons/FontAwesome5';
import { getOneLeagueForUser} from "../stores/leagueStore";
import {useEffect, useState} from "react";
import Clipboard from '@react-native-clipboard/clipboard';
import { useIsFocused } from '@react-navigation/native'


export default function League({route, navigation}) {

  const { userId, leagueId, username } = route.params;
  const [leagueData, setLeagueData] = useState({});
  const [firstThree, setFirstThree] = useState(null);
  const isFocused = useIsFocused()
  const [currentUser, setCurrentUser] = useState({});
  const [userOnLeaderBoard, setUserOnLeaderBoard] = useState(true);

  useEffect(() => {
    if(isFocused){
      getOneLeagueForUser(userId, leagueId).then(res => {
        res.users.sort((a, b) => b.score - a.score);
        setLeagueData(res);
        setFirstThreeOrder(res.users);

        let leaderboardUsers = res.users.slice(0, 7);
        let onLeaderboard = false;
        leaderboardUsers.forEach(user => {if(user.username == username) onLeaderboard = true});
        setUserOnLeaderBoard(onLeaderboard);

        let curr;
        res.users.forEach(user => {
          if (user.username == username) curr = user;
        });
        setCurrentUser(curr);
      });
    }
  }, [isFocused]);

  function setFirstThreeOrder(users) {
    let arr = [];
    if (users.length > 1)  arr.push(users[1]);
    if (users.length > 0) arr.push(users[0]);
    if (users.length > 2) arr.push(users[2]);
    setFirstThree(arr);
  }


  return (
    <View className='flex-1'>
      <ScrollView>
        <View className='m-5 flex-1 flex items-center'>
          <Text className='text-3xl text-blue-950 mt-2 mb-6' style={{fontFamily: "ShantellSans-Bold"}}>Leaderboard</Text>
          <Text className='text-lg text-blue-900 mb-6' style={{fontFamily: "ShantellSans-Bold"}}>Today</Text>
          <View className='flex flex-row justify-around items-end w-full mb-6'>
            {firstThree && firstThree.map((person, index) => {
              if (index === 1) {
                return (
                  <View className={'flex justify-center items-center py-2 w-32 border-2 border-gray-300 rounded-3xl ' + (person.username == username ? 'border-green-300' : '')}
                        key={index}>
                    <Text className='text-blue-950 text-2xl mb-2' style={{fontFamily: "ShantellSans-Bold"}}>#{person.position}</Text>
                    <Image
                      className='rounded-full w-24 h-24'
                      source={require('../public/icons/head_3.png')
                      }
                    />
                    <Text
                      className='text-lg text-blue-950 mt-4' style={{fontFamily: "ShantellSans-Bold"}}>{person.firstname + ' ' + person.lastname.substr(0, 1) + '.'}</Text>
                    <Text className='text-blue-800' style={{fontFamily: "ShantellSans-Regular"}}>{person.score} points</Text>
                  </View>
                );
              }
              return (
                <View className={'flex justify-center items-center py-2 w-28 border-2 border-gray-300 rounded-3xl ' + (person.username == username ? 'border-green-300' : '')}
                      key={index}>
                  <Text className='text-blue-950 text-2xl mb-2' style={{fontFamily: "ShantellSans-Bold"}}>#{person.position}</Text>
                  <Image
                    className='rounded-full w-16 h-16'
                    source={require('../public/icons/head_3.png')
                    }
                  />
                  <Text
                    className='text-base text-blue-950 mt-4' style={{fontFamily: "ShantellSans-Bold"}}>{person.firstname + ' ' + person.lastname.substr(0, 1) + '.'}</Text>
                  <Text className='text-blue-800 ' style={{fontFamily: "ShantellSans-Regular"}}>{person.score} points</Text>
                </View>
              );
            })}
          </View>
          {leagueData.users && leagueData.users.slice(0, 6).map((person, index) => {
            if (index > 2) {
              return (
                <View className={'flex flex-row items-center w-full border-2 border-gray-300 rounded-xl mb-5 p-2 ' + (person.username == username ? 'border-green-300' : '')}
                      key={index}>
                  <Text className='text-blue-950 mr-4' style={{fontFamily: "ShantellSans-Regular"}}>#{person.position}</Text>
                  <View className='flex flex-row items-center flex-1 justify-between'>
                    <View className='flex flex-row items-center'>
                      <Image source={require('../public/icons/head_3.png')}
                             className='w-10 h-10 rounded-full mr-2' />
                      <Text
                        className='text-blue-950 text-base' style={{fontFamily: "ShantellSans-SemiBold"}}>{person.firstname + ' ' + person.lastname.substr(0, 1) + '.'}</Text>
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
                      <Text className='text-blue-800 mx-2' style={{fontFamily: "ShantellSans-Regular"}}>{person.score} points</Text>
                    </View>
                  </View>
                </View>
              );
            }
          })}
          {!userOnLeaderBoard && (
              <View className='flex flex-row items-center w-full border-2 border-gray-300 rounded-xl mb-5 p-2 border-green-300'>
                <Text className='text-blue-950 mr-4' style={{fontFamily: "ShantellSans-Bold"}}>#{currentUser && currentUser.position}</Text>
                <View className='flex flex-row items-center flex-1 justify-between'>
                  <View className='flex flex-row items-center'>
                    <Image source={require('../public/icons/head_3.png')}
                           className='w-10 h-10 rounded-full mr-2' />
                    <Text
                        className='text-blue-950 text-base' style={{fontFamily: "ShantellSans-SemiBold"}}>{currentUser ? currentUser.firstname ? currentUser.lastname ? (currentUser.firstname + ' ' + currentUser.lastname.substr(0, 1) + '.') : "" : "" : ""}</Text>
                  </View>
                  <View className='flex flex-row items-center'>
                    {(currentUser && currentUser.up === -1) ? (
                        <Icon
                            name='arrowdown'
                            size={20}
                            color='red'
                        />
                    ) : (currentUser && currentUser.up === 0) ? (
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
                    <Text className='text-blue-800 mx-2'>{currentUser && currentUser.score} points</Text>
                  </View>
                </View>
              </View>
          )}
          {!leagueData.quizDone ? (
              <View className='flex-col items-center justify-center'>
                <Text className="text-xl text-blue-900 mb-4" style={{fontFamily: "ShantellSans-Bold"}}>Play this league's questions!</Text>
                  <TouchableOpacity className="bg-blue-400 py-2 px-3 rounded-md">
                      <Text className="text-lg text-white"
                            style={{fontFamily: "ShantellSans-Bold"}}
                          onPress={() =>
                          navigation.navigate('QuizGame', {
                          userId: userId,
                          Id: leagueId,
                          userName: username,
                          isLeagueQuiz: true }
                          )}
                      >Play!</Text>
                  </TouchableOpacity>
              </View>
          ) : (
              <Text className="text-xl text-blue-900 mb-4" style={{fontFamily: "ShantellSans-Bold"}}>You already played daily quiz.</Text>
          )}

          {leagueId !== 1 && (
              <View className='p-10 items-center justify-center'>
                <Text className="text-xl text-blue-900 mb-4" style={{fontFamily: "ShantellSans-Bold"}}>Invite friends with code!</Text>
                <TouchableOpacity onPress={() => Clipboard.setString(leagueData.invitationCode)}>
                  <View>
                    <Text className='text-xl font-light text-blue-800' style={{fontFamily: "ShantellSans-Bold"}}>
                      {leagueData.invitationCode}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
          )}
        </View>
      </ScrollView>
      <Footer navigation={navigation} current="leagues" userId={userId} username={username}/>
    </View>
  );
}

