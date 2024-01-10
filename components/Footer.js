import {TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import IconAnt from 'react-native-vector-icons/AntDesign'
import IconFontisto from 'react-native-vector-icons/Fontisto'

export default function Footer() {
  return(
    <View className="flex-row justify-around items-center h-12 shadow-sm shadow-blue-950">
      <TouchableOpacity>
        <Icon
          name="home"
          size={28}
          color="#172554"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <IconAnt
          name="profile"
          size={28}
          color="#172554"
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <IconFontisto
        name="person"
        size={28}
        color="#172554"
        />
      </TouchableOpacity>
    </View>
  )
}
