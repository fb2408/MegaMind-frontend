import LinearGradient from 'react-native-linear-gradient';
import {Alert, Modal, ScrollView, Text, TextInput, TouchableOpacity, View, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {getHomePageData} from '../stores/homeStore';
import {getCategoriesForLeague} from '../stores/leagueStore';
import {registerPost} from '../stores/loginStore';

export default function SignUp({navigation}) {

  const [username, setUserame] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const isFocused = useIsFocused()

  useEffect(() => {
    if(isFocused){
      getCategoriesForLeague().then(res => {
        setCategories(res.categories);
      });
    }
  }, [isFocused])

  const handlePress = (categoryId) => {
      if(selectedCategories.includes(categoryId)) {
        const newCategories = selectedCategories.filter((id) => id !== categoryId);
        setSelectedCategories(newCategories)
      } else {
        setSelectedCategories((prevCategories) => [...prevCategories, categoryId]);
      }
  }

  const submitRegistration = () => {
    const data = {
      mail: email,
      userName: username,
      firstname: firstName,
      lastname: lastName,
      password: password,
      favouriteCategoryIds: selectedCategories
    }

    registerPost(data).then(res => {
      console.log(res)
      navigation.navigate('Home', {userId: res.id})
    })
  }

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
              <Text className='text-blue-950 text-lg'>Favourite categories</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-blue-600 w-full flex justify-center items-center p-2 rounded-md mt-2">
                <Text className="text-white text-lg">Choose...</Text>
              </TouchableOpacity>
            </View>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text className="mb-2 text-red-700 font-semibold text-lg">Minimum 3!</Text>
                  {categories && categories.map((category, index) => {
                    return(
                      <Pressable
                        style={{backgroundColor: selectedCategories.includes(category.id) ? "gray" : "rgb(23 37 84)"}}
                        key={index}
                        onPress={() => handlePress(category.id)}
                        className="w-48 h-12 rounded-xl mb-2 flex justify-center items-center ">
                        <Text className="text-white">{category.name}</Text>
                      </Pressable>
                    )
                  })}
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            <View className='flex flex-row justify-center items-center mb-6'>
              <TouchableOpacity
                onPress={() => submitRegistration()}
                className='flex justify-center items-center bg-gray-400 mt-6 px-5 py-3 rounded-md'>
                <Text className='text-white text-base font-semibold'>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
