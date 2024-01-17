import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Footer from './Footer';

import React, {useEffect, useState} from "react";

export default function SelectCategories({route, navigation}) {
    const { selected } = route.params;

    return (
    <View className='flex-1'>
        <ScrollView>
            <View className='flex flex-column justify-start items-stretch gap-5 m-5'>
                <TouchableOpacity
                    className='flex flex-col justify-evenly items-center border-2 border-gray-300 rounded-xl h-14'
                    onPress={() => navigation.goBack()}>
                    <Text className='text-blue-950 text-lg font-bold '>
                        Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className='flex flex-col justify-evenly items-center border-2 border-gray-300 rounded-xl h-14'
                    onPress={() => navigation.goBack()}>
                    <Text className='text-blue-950 text-lg font-bold '>
                        Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className='flex flex-col justify-evenly items-center border-2 border-gray-300 rounded-xl h-14'
                    onPress={() => navigation.goBack()}>
                    <Text className='text-blue-950 text-lg font-bold '>
                        Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className='flex flex-col justify-evenly items-center border-2 border-gray-300 rounded-xl h-14'
                    onPress={() => navigation.goBack()}>
                    <Text className='text-blue-950 text-lg font-bold '>
                        Back
                    </Text>
                </TouchableOpacity>
            </View>
            <Footer navigation={navigation} current="other"/>
        </ScrollView>
    </View>
    );
}
