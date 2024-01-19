import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useState} from 'react';
import {loginPost, questionsPost} from '../stores/loginStore';

export default function Login({navigation}) {


  const [username, setUserame] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitLogin = () => {
    const data = {
      username: username,
      password: password
    }
    loginPost(data).then(res => {
      if(res.userId !== undefined) {
        setPassword('');
        navigation.navigate('Home', {userId: res.userId, username: res.username});
      } else {
        console.log(res)
        setErrorMessage("Wrong username or password");
      }
    })
  }

  return (
    <View className='flex-1'>
      <LinearGradient
        colors={['rgb(30 64 175)', 'rgb(23 37 84)']}
        useAngle={true} angle={45} angleCenter={{x: 0.2, y: 0.5}}
        className='flex-1 items-center justify-start w-full p-10'>
        <View className="flex justify-center items-center mb-10">
          <Text className='text-white text-4xl mt-6' style={{fontFamily: 'ShantellSans-Bold'}}>MegaMind</Text>
          <Icon
            color="white"
            name='lightbulb'
            size={60}
          />
        </View>
        <View className="flex justify-start items-center rounded-xl bg-white w-full p-5">
          <Text className='text-blue-950 text-4xl my-6' style={{fontFamily: 'ShantellSans-Bold'}}>Login</Text>
          {errorMessage ? <Text className="text-xl text-red-700" style={{fontFamily: "ShantellSans-Bold"}}>{errorMessage}</Text> : <></>}
          <View className="flex justify-start items-start w-full p-4">
            <Text className="text-blue-950 text-lg" style={{fontFamily: "ShantellSans-SemiBold"}}>Username</Text>
            <TextInput
              style={{fontFamily: "ShantellSans-Regular"}}
              onChangeText={setUserame}
              className="rounded-md h-14 p-4 my-2 w-full shadow-sm shadow-blue-950"
              placeholder="example123"
            />
          </View>
          <View className="flex justify-start items-start w-full p-4">
            <Text className="text-blue-950 text-lg" style={{fontFamily: "ShantellSans-SemiBold"}}>Password</Text>
            <TextInput
              style={{fontFamily: "ShantellSans-Regular"}}
              onChangeText={setPassword}
              className="rounded-md h-14 p-4 my-2 w-full shadow-sm shadow-blue-950"
              placeholder="****"
              secureTextEntry={true}
            />
          </View>
          <View className="flex flex-row justify-center items-center mb-6">
            <TouchableOpacity
              onPress={() => submitLogin()}
              className="flex justify-center items-center bg-blue-400 mt-6 px-5 py-3 rounded-md">
              <Text className="text-white text-base" style={{fontFamily: "ShantellSans-SemiBold"}}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setErrorMessage('')
                navigation.navigate('SignUp')
              }}
              className="flex justify-center items-center bg-gray-400 mt-6 ml-5 px-5 py-3 rounded-md">
              <Text className="text-white text-base" style={{fontFamily: "ShantellSans-SemiBold"}}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}
