import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Footer from './Footer';
import { useIsFocused } from '@react-navigation/native'
import React, {useCallback, useEffect, useState} from "react";
import {changeUser, getAllCategories,} from "../stores/homeStore";

export default function SelectCategories({route, navigation}) {
    const { selected } = route.params;
    const [newSelected, setNewSelected] = useState([]);
    const [allCategories, setAllCategories] = useState(null);

    const isFocused = useIsFocused()

    useEffect(() => {
        if(isFocused){
            getAllCategories().then(res => {
                setAllCategories(res.categories);
                setNewSelected(selected);
            });
            console.log(navigation)
            console.log(route)
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
        if (newSelected.includes(categoryId)) {
            let idx = newSelected.indexOf(categoryId);
            setNewSelected(old => {old.splice(idx, 1);
                                        return old});
        } else {
            setNewSelected(old => {old.push(categoryId);
                                        return old;});
        }
    }

    return (
    <View className='flex-1'>
        <ScrollView>
            <View className='flex-1 justify-start items-stretch gap-5 m-5'>
                {allCategories && allCategories.map(cat => (
                    newSelected.includes(cat.id) ? (
                        <TouchableOpacity
                            className="flex flex-col justify-evenly items-center border-2 rounded-xl h-14 border-green-400"
                            onPress={() => handleSelectedCategories(cat.id)}>
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
                    onPress={() => {changeUser(4, {favouriteCategoryIds: newSelected});
                                    navigation.navigate('Home')}}>
                    <Text className='text-blue-950 text-lg font-bold '>
                        Confirm
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.6}
                    className='flex flex-col justify-evenly items-center bg-blue-400 rounded-xl h-14'
                    onPress={() => navigation.navigate('Home')}>
                    <Text className='text-blue-950 text-lg font-bold '>
                        Exit
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
        <Footer navigation={navigation} current="other"/>
    </View>
    );
}
