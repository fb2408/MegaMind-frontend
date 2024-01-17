import {ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Footer from './Footer';
import {getLeaugesForUser} from "../stores/leagueStore";

export default function Leagues({navigation}) {

  const [code, setCode] = useState('');
  const [visible, setVisible] = useState(false);
  const [leagues, setLeagues] = useState({});

  useEffect(()=>{
    getLeaugesForUser(4).then(res => {
      setLeagues(res);
    });
  },[]);

  return (
    <View className='flex-1'>
      <ScrollView>
        <View className='flex-1 justify-start items-start m-5'>
          <Text className='font-black text-3xl text-blue-950 mb-4'>My leagues</Text>
          {leagues.leagues && leagues.leagues.map((league, index) => {
            return (
              <TouchableHighlight className='border-2 border-gray-300 rounded-2xl p-5 w-full mt-4 flex justify-center items-center'
                    onPress={() => navigation.navigate('League', {leagueId: league.leagueId, userId: 4})}
                    key={league.leagueId}>
                <Text className='font-bold text-lg text-blue-950'>{league.leagueName}</Text>
              </TouchableHighlight>
            );
          })}
          <View className='flex-row justify-around items-center my-8 w-full'>
            <TouchableOpacity activeOpacity={0.6}
                              className='bg-blue-300 rounded-md w-2/5 flex items-center justify-center py-3'
                              onPress={() => setVisible(!visible)}>
              <Text className='font-bold text-lg text-blue-950'>Join league</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}
                              className='bg-blue-300 rounded-md w-2/5 flex items-center justify-center py-3'>
              <Text className='font-bold text-lg text-blue-950'>Create league</Text>
            </TouchableOpacity>
          </View>
          {
            visible ?
              <View className='w-full border-2 border-gray-300 rounded-2xl p-3'>
                <Text className='text-blue-950 font-bold text-base mb-2'>Provide a code</Text>
                <TextInput onChangeText={setCode} placeholder='code'
                           className='border-2 border-blue-950 rounded-md h-10 p-2' />
              </View> : <></>
          }
        </View>
      </ScrollView>
      <Footer navigation={navigation} current="leagues"/>
    </View>
  );
}
