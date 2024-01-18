import {
  Button,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Footer from './Footer';
import {createLeaguePost, getCategoriesForLeague, getLeaugesForUser} from '../stores/leagueStore';
import MultiSelect from 'react-native-multiple-select';
import DatePicker from 'react-native-date-picker';

export default function Leagues({navigation}) {

  const [code, setCode] = useState('');
  const [leagueName, setLeagueName] = useState('');
  const [visibleJoin, setVisibleJoin] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [leagues, setLeagues] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [leagueLength, setLeagueLength] = useState(0);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [dailyCategories, setDailyCategories] = useState(0);
  const [questionsPerCategory, setQuestionsPerCategory] = useState(0);


  useEffect(() => {
    getLeaugesForUser(4).then(res => {
      setLeagues(res);
    });
    getCategoriesForLeague().then(res => {
      setCategories(res.categories);
    });
  }, []);


  const onSelectedItemsChange = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
    console.log(selectedCategories);
  };

  const createLeague = () => {
    const data = {
      leagueName: leagueName,
      leagueAdmin: 4,
      seasonLength: leagueLength,
      startDate: date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate(),
      dailyCategories: dailyCategories,
      questionsPerCategory: questionsPerCategory,
      leagueCategories: selectedCategories,
    };
    createLeaguePost(data).then(res => {
      console.log(res);
      setVisibleCreate(false);
      setSelectedCategories([]);
      getLeaugesForUser(4).then(res => {
        setLeagues(res);
      });
    });
  };

  return (
    <View className='flex-1'>
      <ScrollView>
        <View className='flex-1 justify-start items-start m-5'>
          <Text className='font-black text-3xl text-blue-950 mb-4'>My leagues</Text>
          {leagues.leagues && leagues.leagues.map((league, index) => {
            return (
              <TouchableOpacity activeOpacity={0.4}
                                className='border-2 border-gray-300 rounded-2xl p-5 w-full mt-4 flex justify-center items-center'
                                onPress={() => navigation.navigate('League', {leagueId: league.leagueId, userId: 4})}
                                key={league.leagueId}>
                <Text className='font-bold text-lg text-blue-950'>{league.leagueName}</Text>
              </TouchableOpacity>
            );
          })}
          <View className='flex-row justify-around items-center my-8 w-full'>
            <TouchableOpacity activeOpacity={0.6}
                              className='bg-blue-300 rounded-md w-2/5 flex items-center justify-center py-3'
                              onPress={() => {
                                setVisibleJoin(!visibleJoin);
                                setVisibleCreate(false);
                              }}>
              <Text className='font-bold text-lg text-blue-950'>Join league</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}
                              className='bg-blue-300 rounded-md w-2/5 flex items-center justify-center py-3'
                              onPress={() => {
                                setVisibleCreate(!visibleCreate);
                                setVisibleJoin(false);
                                setDate(new Date());
                              }}>
              <Text className='font-bold text-lg text-blue-950'>Create league</Text>
            </TouchableOpacity>
          </View>
          {
            visibleJoin ?
              <View className='w-full border-2 border-gray-300 rounded-2xl p-3'>
                <Text className='text-blue-950 font-bold text-lg mb-2'>Provide a code</Text>
                <TextInput onChangeText={setCode} placeholder='Code'
                           className='border-2 border-blue-950 rounded-md h-10 p-2' />
              </View> : <></>
          }
          {
            visibleCreate ?
              <View className='w-full border-2 border-gray-300 rounded-2xl p-3'>
                <Text className='text-blue-950 font-bold text-lg mb-2'>Create a new league</Text>
                <Text className='text-blue-800 mb-1 font-semibold'>Name</Text>
                <TextInput onChangeText={setLeagueName} placeholder='League name'
                           className='border-2 border-blue-950 rounded-md h-10 p-2 mb-2' />
                <Text className='text-blue-800 mb-1 font-semibold'>Length</Text>
                <TextInput onChangeText={setLeagueLength} placeholder='(days)'
                           keyboardType='numeric'
                           className='border-2 border-blue-950 rounded-md h-10 p-2 mb-2'
                />
                <Text className='text-blue-800 mb-1 font-semibold'>Start date</Text>
                <TouchableOpacity
                  className='bg-blue-300 rounded-md w-full flex items-center justify-center py-2'
                  activeOpacity={0.6} onPress={() => setOpen(true)}>
                  <Text className='font-bold text-base text-blue-950'>Pick a date</Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  open={open}
                  date={date}
                  onConfirm={(date) => {
                    setOpen(false);
                    setDate(date);
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
                <Text className='text-blue-800 mb-1 font-semibold mt-2'>Categories</Text>
                <SafeAreaView>
                  <MultiSelect
                    hideTags
                    items={categories}
                    uniqueKey='id'
                    onSelectedItemsChange={onSelectedItemsChange}
                    selectedItems={selectedCategories}
                    selectText='Pick Categories'
                    searchInputPlaceholderText='Search Categories...'
                    onChangeInput={(text) => console.log(text)}
                    altFontFamily='ProximaNova-Light'
                    tagRemoveIconColor='#CCC'
                    tagBorderColor='#CCC'
                    tagTextColor='#CCC'
                    selectedItemTextColor='#CCC'
                    selectedItemIconColor='#CCC'
                    itemTextColor='#000'
                    displayKey='name'
                    searchInputStyle={{color: '#CCC'}}
                    submitButtonColor='#CCC'
                    submitButtonText='Save'
                    styleDropdownMenuSubsection={{borderRadius: 2}}
                    fixedHeight={true}
                  />
                </SafeAreaView>
                <Text className='text-blue-800 mb-1 font-semibold mt-2'>Daily categories</Text>
                <TextInput onChangeText={setDailyCategories} placeholder='2'
                           keyboardType='numeric'
                           className='border-2 border-blue-950 rounded-md h-10 p-2 mb-2'
                />
                <Text className='text-blue-800 mb-1 font-semibold'>Questions per category</Text>
                <TextInput onChangeText={setQuestionsPerCategory} placeholder='5'
                           keyboardType='numeric'
                           className='border-2 border-blue-950 rounded-md h-10 p-2 mb-2'
                />
                <TouchableOpacity
                  className='bg-green-300 rounded-md w-full flex items-center justify-center py-2 my-3'
                  activeOpacity={0.6} onPress={() => createLeague()}>
                  <Text className='font-bold text-base text-blue-950'>Create</Text>
                </TouchableOpacity>
              </View> : <></>
          }
        </View>
      </ScrollView>
      <Footer navigation={navigation} current='leagues' />
    </View>
  );
}
