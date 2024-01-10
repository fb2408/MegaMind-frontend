import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'


export default function Header() {
  return (
    <View className="h-12">
      <View className="flex-row justify-start items-center h-full ml-4">
        <Text className="text-black font-bold text-xl mr-1">Quizz</Text>
        <Icon
          name="quiz"
          size={28}
          color="black"
        />
      </View>
    </View>
  )
}
