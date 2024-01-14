import {TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconAnt from 'react-native-vector-icons/AntDesign'
import IconFontisto from 'react-native-vector-icons/Fontisto'

export default function Footer() {
  return(
    <View className="flex-row justify-around items-center h-12 bg-blue-950">
      <TouchableOpacity>
        <Icon
          name="home"
          size={28}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <IconAnt
          name="profile"
          size={28}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <IconFontisto
        name="person"
        size={28}
        color="white"
        />
      </TouchableOpacity>
    </View>
  )
}
