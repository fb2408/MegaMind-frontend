import {TouchableOpacity, View, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';
import IconFontisto from 'react-native-vector-icons/Fontisto';

export default function Footer({navigation, current}) {

  const colorMapping = {
    home: { home: '#FFDB58', leagues: 'white', person: 'white' },
    leagues: { home: 'white', leagues: '#FFDB58', person: 'white' },
    profile: { home: 'white', leagues: 'white', person: '#FFDB58' },
    other: {home: 'white', leagues: 'white', person: 'white'}
  };

  const getIconColor = (iconName) => colorMapping[current][iconName] || 'white';

  return (
    <View className='flex-row justify-around items-center h-12 bg-blue-950'>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={28} color={getIconColor('home')} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Leagues')}>
        <IconAnt name="profile" size={28} color={getIconColor('leagues')} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Profile')}>
        <IconFontisto name="person" size={28} color={getIconColor('person')} />
      </Pressable>
    </View>
  );
}
