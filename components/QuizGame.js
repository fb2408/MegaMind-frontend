import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

export default function QuizGame({navigation, route, props}) {
  const {userId, Id, userName, isLeagueQuiz} = route.params;

  console.log(userId);
  console.log('isLeagueQuiz' + isLeagueQuiz);
  let leagueId;
  let categoryId;
  if (isLeagueQuiz) {
    leagueId = Id;
  } else {
    categoryId = Id;
  }

  const [showExplanationAndMessage, setShowExplanationAndMessage] =
    useState(false);
  const [messagge, setMessagge] = useState('');
  const [nextButtonVisible, setNextButtonVisible] = useState(false);

  //return body
  const [answers, setAnswers] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState({});
  const [questions, setQuestions] = useState([]);
  const [currentCategoryId, setCurrentCategoryId] = useState(0);
  const [currentQuestionInCategory, setCurrentQuestionInCategory] = useState(0);
  let [questionShuffle, setQuestionShuffle] = useState([]);
  let [isCorrect, setIsCorrect] = useState(false);

  const [numOfQuestionsInCategory, setNumOfQuestionsInCategory] = useState(0);
  const [currentCategoryIcon, setCurrentCategoryIcon] = useState('book-open');
  const categoryIcons = [
    {categoryName: 'History', iconName: 'book-open'},
    {categoryName: 'Music', iconName: 'music'},
    {categoryName: 'Sport', iconName: 'trophy'},
    {categoryName: 'Art', iconName: 'palette'},
    {categoryName: 'Geography', iconName: 'globe-americas'},
    {categoryName: 'Movies', iconName: 'film'},
    {categoryName: 'Science', iconName: 'bacteria'},
    {categoryName: 'Food', iconName: 'drumstick-bite'},
    {categoryName: 'Technology', iconName: 'robot'},
    {categoryName: 'Pop', iconName: 'tv'},
  ];

  var url = isLeagueQuiz
    ? 'https://mega-mind-backend-2fe25339801f.herokuapp.com/questions/' +
      JSON.stringify(leagueId) +
      '/user/' +
      JSON.stringify(userId)
    : 'https://mega-mind-backend-2fe25339801f.herokuapp.com/questions/user/' +
      JSON.stringify(userId) +
      '/category/' +
      JSON.stringify(categoryId);

  const getQuestionsFromApi = async () => {
    console.log(url);
    return await fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json.questions);
        setQuestions(json.questions);
        setCurrentQuestion(json.questions[0]);
        console.log('appi callled');
        let array = shuffle([
          json.questions[0].wrongAnswer2,
          json.questions[0].wrongAnswer1,
          json.questions[0].correctAnswer,
          json.questions[0].wrongAnswer3,
        ]);
        console.log(json.questions);
        setQuestionShuffle(array);
        let currCategoryName = '';
        categoryIcons.forEach(icon => {
          if (
            String(icon.categoryName) === String(json.questions[0].categoryName)
          ) {
            currCategoryName = icon.iconName;
          }
        });
        setCurrentCategoryIcon(currCategoryName);
        let categories = json.questions
          .map(question => question.categoryName)
          .filter(onlyUnique);
        setNumOfQuestionsInCategory(json.questions.length / categories.length);
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  };
  useEffect(() => {
    getQuestionsFromApi();
  }, []);

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function forwardDataOnBackend() {
    console.log('answers');
  }

  const onPress = async questionShuffleId => {
    const previousQuestionId = currentQuestion.questionId;
    if (
      String(questionShuffle[parseInt(questionShuffleId)]) ===
      String(currentQuestion.correctAnswer)
    ) {
      console.log('correct');
      let newElement = {
        questionId: previousQuestionId,
        correct: true,
      };
      console.log(newElement);
      setIsCorrect(true);
      setAnswers(prevArr => [...prevArr, newElement]);
      setMessagge('CORRECT ANSWER, WELL DONE!');
    } else {
      console.log('wrong');
      let newElement = {
        questionId: previousQuestionId,
        correct: false,
      };
      console.log(newElement);
      setIsCorrect(false);
      setAnswers(prevArr => [...prevArr, newElement]);
      setMessagge(
        'WRONG ANSWER :( Correct answer is: ' + currentQuestion.correctAnswer,
      );
    }

    setShowExplanationAndMessage(true);
    setNextButtonVisible(true);
    // fadeIn();
  };

  function updateQuestion() {
    const previousCategoryId = currentCategoryId;
    const previousQuestionInCategory = currentQuestionInCategory;
    if (
      previousCategoryId * numOfQuestionsInCategory +
        previousQuestionInCategory ===
      questions.length - 1
    ) {
      console.log('last question');
      forwardDataOnBackend();
    } else {
      if (currentQuestionInCategory < numOfQuestionsInCategory - 1) {
        setCurrentQuestionInCategory(currentQuestionInCategory + 1);
      } else {
        setCurrentCategoryId(currentCategoryId + 1);
        setCurrentQuestionInCategory(0);
      }
      let newQuestion = {};
      if (previousQuestionInCategory < numOfQuestionsInCategory - 1) {
        newQuestion = questions.at(
          parseInt(previousCategoryId) * parseInt(numOfQuestionsInCategory) +
            (parseInt(previousQuestionInCategory) + 1),
        );
      } else {
        newQuestion = questions.at(
          (parseInt(previousCategoryId) + 1) *
            parseInt(numOfQuestionsInCategory),
        );
        let currCategoryName = '';
        categoryIcons.forEach(icon => {
          if (String(icon.categoryName) === String(newQuestion.categoryName)) {
            currCategoryName = icon.iconName;
          }
        });
        setCurrentCategoryIcon(currCategoryName);
      }
      console.log('after changing question ');
      console.log(newQuestion);
      currentQuestion.questionText = newQuestion.questionText;
      currentQuestion.categoryName = newQuestion.categoryName;
      currentQuestion.correctAnswer = newQuestion.correctAnswer;
      currentQuestion.wrongAnswer1 = newQuestion.wrongAnswer1;
      currentQuestion.wrongAnswer2 = newQuestion.wrongAnswer2;
      currentQuestion.wrongAnswer3 = newQuestion.wrongAnswer3;
      currentQuestion.explanation = newQuestion.explanation;
      currentQuestion.questionId = newQuestion.questionId;

      const currShuffle = shuffle([
        newQuestion.correctAnswer,
        newQuestion.wrongAnswer1,
        newQuestion.wrongAnswer2,
        newQuestion.wrongAnswer3,
      ]);

      let positionAnswerCorrect = 0;
      for (let i = 0; i < currShuffle.length; i++) {
        if (String(currShuffle[i]) === String(newQuestion.correctAnswer)) {
          positionAnswerCorrect = i;
        }
      }

      questionShuffle[0] = currShuffle[0];
      questionShuffle[1] = currShuffle[1];
      questionShuffle[2] = currShuffle[2];
      questionShuffle[3] = currShuffle[3];

      setShowExplanationAndMessage(false);
      setNextButtonVisible(false);
      // fadeOut();
    }
  }

  // let fadeAnim = useRef(new Animated.Value(0)).current;

  // const fadeIn = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 5000,
  //     useNativeDriver: true,
  //   }).start();
  // };
  //
  // const fadeOut = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 0,
  //     duration: 3000,
  //     useNativeDriver: true,
  //   }).start();
  // };

  return (
    <View className=" h-screen ">
      <LinearGradient
        colors={['rgb(30 64 175)', 'rgb(23 37 84)']}
        useAngle={true}
        angle={45}
        angleCenter={{x: 0.2, y: 0.5}}
        className="flex items-center flex-1 justify-start height-screen w-full">
        <View className="flex-col items-center ">
          <Text className="mt-10  text-2xl text-white" style={{fontFamily: "ShantellSans-Bold"}}>
            {currentQuestion.categoryName}
          </Text>
          <View className="mt-5">
            <Icon
              className="bg-blue-900"
              name={String(currentCategoryIcon)}
              size={150}
              // color="#172554"
            />
          </View>

          <View
            style={{
              backgroundColor: '#172554',
              shadowColor: '#fff',
              shadowOffset: {
                width: 0,
                height: 9,
              },
              shadowOpacity: 0.48,
              shadowRadius: 11.95,

              elevation: 18,
            }}
            className=" mt-7 rounded-xl items-center width-screen  ml-5 mr-5  animate-pulse">
            <Text className=" text-l text-white text-center p-5" style={{fontFamily: "ShantellSans-Bold"}}>
              {currentQuestion.questionText}
            </Text>
          </View>

          {showExplanationAndMessage && (
            <View className="mt-10 bg-blue-400 flex-col rounded-xl items-center width-screen  ml-5 mr-5 h-50 animate-pulse">
              <View
                style={[
                  // styles.shadow,
                  {
                    borderWidth: 3,
                    // borderColor: 'rgba(255, 0, 0, 1)',
                    borderColor: !isCorrect ? '#D70040' : '#63E6BE',
                    width: '100%',
                    // color: !isCorrect
                    //   ? 'rgba(255, 0, 0, 0.5)'
                    //   : 'rgba(60, 179, 113, 0.5)',
                  },
                ]}
                className=" mt-5  bg-white items-center rounded-xl  ml-3 mr-3">
                <Text
                  style={{
                    color: !isCorrect ? '#D70040' : '#63E6BE',
                    fontFamily: "ShantellSans-Bold"
                  }}
                  className="text-center p-2">
                  {messagge}
                </Text>
              </View>
              <View className=" mt-1 p-3">
                <Text className="text-white text-center" style={{fontFamily: "ShantellSans-Regular"}}>
                  {currentQuestion.explanation}
                </Text>
              </View>
            </View>
          )}
          {!showExplanationAndMessage && (
            <View className="flex flex-row justify-evenly w-full flex-wrap mt-10">
              <TouchableOpacity
                style={styles.shadow}
                disabled={showExplanationAndMessage}
                className="flex flex-col justify-evenly items-center rounded-xl w-40 h-28  bg-white"
                onPress={e => {
                  onPress(0);
                }}>
                <Text style={{fontFamily: "ShantellSans-Bold"}}>{questionShuffle.at(0)}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.shadow}
                disabled={showExplanationAndMessage}
                className="flex flex-col font-bold justify-evenly items-center  rounded-xl w-40 h-28  bg-white "
                onPress={() => {
                  onPress(1);
                }}>
                <Text style={{fontFamily: "ShantellSans-Bold"}}>{questionShuffle[1]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.shadow}
                disabled={showExplanationAndMessage}
                className="flex flex-col justify-evenly font-bold items-center  rounded-xl w-40 h-28 mt-7 bg-white"
                onPress={() => {
                  onPress(2);
                }}>
                <Text style={{fontFamily: "ShantellSans-Bold"}}>{questionShuffle[2]}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.shadow}
                disabled={showExplanationAndMessage}
                className="flex flex-col justify-evenly font-bold items-center rounded-xl w-40 h-28 mt-7  bg-white"
                onPress={() => {
                  onPress(3);
                }}>
                <Text style={{fontFamily: "ShantellSans-Bold"}}>{questionShuffle[3]}</Text>
              </TouchableOpacity>
            </View>
          )}
          {nextButtonVisible && (
            <TouchableOpacity
              style={{
                backgroundColor: '#172554',
              }}
              className=" mt-10  left rounded-s  w-24 h-7"
              onPress={() => {
                if (
                  currentCategoryId * numOfQuestionsInCategory +
                    currentQuestionInCategory ===
                  questions.length - 1
                ) {
                  navigation.navigate('QuizComplete', {
                    answersToBack: answers,
                    userId: userId,
                    Id: Id,
                    userName: userName,
                    isLeagueQuiz: isLeagueQuiz,
                  });
                } else {
                  updateQuestion();
                }
              }}>
              <Text className="text-white text-center p-1 object-right" style={{fontFamily: "ShantellSans-Bold"}}>
                {'Next ->'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
});
