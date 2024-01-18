import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Footer from './Footer';
import { useIsFocused } from '@react-navigation/native'
import React, {useCallback, useEffect, useState} from "react";
import {changeUser, getAllCategories,} from "../stores/homeStore";

export default function SelectCategories({route, navigation}) {
    const { selected, userId, username } = route.params;
    const [newSelected, setNewSelected] = useState([]);
    const [allCategories, setAllCategories] = useState(null);

    const [selectedHistory, setSelectedHistory] = useState(false);
    const [selectedSport, setSelectedSport] = useState(false);
    const [selectedMovies, setSelectedMovies] = useState(false);
    const [selectedGeography, setSelectedGeography] = useState(false);
    const [selectedMusic, setSelectedMusic] = useState(false);

    const isFocused = useIsFocused()

    useEffect(() => {
        if(isFocused){
            getAllCategories().then(res => {
                setAllCategories(res.categories);
                setNewSelected(selected);
            });
        }
    }, [isFocused])

/*    useEffect(() => {
        getAllCategories().then(res => {
            setAllCategories(res.categories);
            setNewSelected(selected);
        });
        console.log(navigation)
        console.log(route)
    }, []);*/


    function handleSelectedCategories(categoryId) {
        let temp = [...newSelected];
        if (newSelected && newSelected.includes(categoryId)) {
            let idx = newSelected.indexOf(categoryId);
            temp.splice(idx, 1);
            setNewSelected(temp);
        } else {
            temp.push(categoryId);
            setNewSelected(temp);
        }
    }

    return (
    <View className='flex-1'>
        <ScrollView>
            <View className='flex-1 justify-start items-stretch gap-5 m-5'>
                {allCategories && allCategories.map(cat => (
                    newSelected && newSelected.includes(cat.id) ? (
                        <TouchableOpacity
                            className="flex flex-col justify-evenly items-center border-2 rounded-xl h-14 border-green-400"
                            onPress={() => handleSelectedCategories(cat.id)}
                            key={cat.id}
                        >
                            <Text className='text-blue-950 text-lg font-bold '>
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                        ): (
                        <TouchableOpacity
                            className="flex flex-col justify-evenly items-center border-2 border-gray-600 rounded-xl h-14 "
                            onPress={() => handleSelectedCategories(cat.id)}>
                            <Text className='text-blue-950 text-lg font-bold '>
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                        )
                ))}
                <TouchableOpacity
                    activeOpacity={0.6}
                    className='flex flex-col justify-evenly items-center bg-green-300 rounded-xl h-14'
                    onPress={() => {changeUser(userId, {favouriteCategoryIds: newSelected});
                                    navigation.navigate('Home', {userId: userId, username: username})}}>
                    <Text className='text-blue-950 text-lg font-bold '>
                        Confirm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    className='flex flex-col justify-evenly items-center bg-blue-400 rounded-xl h-14'
                    onPress={() => navigation.navigate('Home', {userId: userId, username: username})}>
                    <Text className='text-blue-950 text-lg font-bold '>
                        Exit
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        <Footer navigation={navigation} current="other" userId={userId} username={username}/>
    </View>
    );
}
