import {ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Footer from './Footer';
import {getCategoriesForLeague, getLeaugesForUser} from '../stores/leagueStore';
import MultiSelect from 'react-native-multiple-select';

export default function Leagues({navigation}) {

  const [code, setCode] = useState('');
  const [leagueName, setLeagueName] = useState('');
  const [visibleJoin, setVisibleJoin] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [leagues, setLeagues] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);


  useEffect(()=>{
    getLeaugesForUser(4).then(res => {
      setLeagues(res);
    });
    getCategoriesForLeague().then(res => {
      setCategories(res.categories)
    });
  },[]);


  const onSelectedItemsChange = (selectedCategories) => {
    setSelectedCategories(selectedCategories)
    console.log(selectedCategories)
  }

  return (
    <View className='flex-1'>
      <ScrollView>
        <View className='flex-1 justify-start items-start m-5'>
          <Text className='font-black text-3xl text-blue-950 mb-4'>My leagues</Text>
          {leagues.leagues && leagues.leagues.map((league, index) => {
            return (
              <TouchableOpacity activeOpacity={0.4} className='border-2 border-gray-300 rounded-2xl p-5 w-full mt-4 flex justify-center items-center'
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
                                setVisibleJoin(!visibleJoin)
                                setVisibleCreate(false)
                              }}>
              <Text className='font-bold text-lg text-blue-950'>Join league</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6}
                              className='bg-blue-300 rounded-md w-2/5 flex items-center justify-center py-3'
                              onPress={() => {
                                setVisibleCreate(!visibleCreate)
                                setVisibleJoin(false)
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
                <TextInput onChangeText={setLeagueName} placeholder='League name'
                           className='border-2 border-blue-950 rounded-md h-10 p-2 mb-4' />

                <MultiSelect
                  hideTags
                  items={categories}
                  uniqueKey="id"
                  onSelectedItemsChange={onSelectedItemsChange}
                  selectedItems={selectedCategories}
                  selectText="Pick Categories"
                  searchInputPlaceholderText="Search Categories..."
                  onChangeInput={ (text)=> console.log(text)}
                  altFontFamily="ProximaNova-Light"
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#CCC"
                  tagTextColor="#CCC"
                  selectedItemTextColor="#CCC"
                  selectedItemIconColor="#CCC"
                  itemTextColor="#000"
                  displayKey="name"
                  searchInputStyle={{ color: '#CCC' }}
                  submitButtonColor="#CCC"
                  submitButtonText="Submit"
                  styleDropdownMenuSubsection={{borderRadius: 2}}
                />
                {
                  selectedCategories && selectedCategories.map((cat, index) => {
                    return(
                      <View>
                        <Text>{categories[cat - 1].name}</Text>
                      </View>
                    )
                  })
                }
              </View> : <></>
          }
        </View>
      </ScrollView>
      <Footer navigation={navigation} current="leagues"/>
    </View>
  );
}
