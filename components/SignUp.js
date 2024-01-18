import LinearGradient from 'react-native-linear-gradient';
import {ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useState} from 'react';

export default function SignUp() {

  const [username, setUserame] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View className='flex-1'>
      <ScrollView>
        <LinearGradient
          colors={['rgb(30 64 175)', 'rgb(23 37 84)']}
          useAngle={true} angle={45} angleCenter={{x: 0.2, y: 0.5}}
          className='flex-1 items-center justify-start w-full p-10'>
          <View className='flex justify-center items-center mb-10'>
            <Text className='text-white text-4xl mt-6' style={{fontFamily: 'ShantellSans-Bold'}}>MegaMind</Text>
            <Icon
              color='white'
              name='lightbulb'
              size={60}
            />
          </View>
          <View className='flex justify-start items-center rounded-xl bg-white w-full p-5'>
            <Text className='text-blue-950 text-4xl my-6' style={{fontFamily: 'ShantellSans-Bold'}}>Registration</Text>
            <View className='flex justify-start items-start w-full p-4'>
              <Text className='text-blue-950 text-lg'>E-mail</Text>
              <TextInput
                onChangeText={setEmail}
                className='rounded-md h-14 p-4 w-full shadow-sm shadow-blue-950'
                placeholder='example@yahoo.com'
              />
            </View>
            <View className='flex justify-start items-start w-full p-4'>
              <Text className='text-blue-950 text-lg'>Username</Text>
              <TextInput
                onChangeText={setUserame}
                className='rounded-md h-14 p-4 w-full shadow-sm shadow-blue-950'
                placeholder='example123'
              />
            </View>
            <View className='flex justify-start items-start w-full p-4'>
              <Text className='text-blue-950 text-lg'>First name</Text>
              <TextInput
                onChangeText={setFirstName}
                className='rounded-md h-14 p-4 w-full shadow-sm shadow-blue-950'
                placeholder='Ivo'
              />
            </View>
            <View className='flex justify-start items-start w-full p-4'>
              <Text className='text-blue-950 text-lg'>Last name</Text>
              <TextInput
                onChangeText={setLastName}
                className='rounded-md h-14 p-4 w-full shadow-sm shadow-blue-950'
                placeholder='Ivić'
              />
            </View>
            <View className='flex justify-start items-start w-full p-4'>
              <Text className='text-blue-950 text-lg'>Password</Text>
              <TextInput
                onChangeText={setPassword}
                className='rounded-md h-14 p-4 w-full shadow-sm shadow-blue-950'
                placeholder='****'
                secureTextEntry={true}
              />
            </View>
            <View className='flex justify-start items-start w-full p-4'>
              <Text className='text-blue-950 text-lg'>Favourite categories(3+)</Text>
              <TouchableOpacity className="bg-blue-600 w-full flex justify-center items-center p-2 rounded-md">
                <Text className="text-white text-lg">Choose...</Text>
              </TouchableOpacity>
            </View>
            <View className='flex flex-row justify-center items-center mb-6'>
              <TouchableOpacity className='flex justify-center items-center bg-gray-400 mt-6 px-5 py-3 rounded-md'>
                <Text className='text-white text-base font-semibold'>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}
