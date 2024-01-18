import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function QuizGame({navigation, route, props}) {
  const {userId, leagueId} = route.params;

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

  var url =
    'https://mega-mind-backend-2fe25339801f.herokuapp.com/questions/' +
    JSON.stringify(leagueId) +
    '/user/' +
    JSON.stringify(userId);

  const getQuestionsFromApi = async () => {
    return await fetch(url)
      .then(response => response.json())
      .then(json => {
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

  const categories = questions
    .map(question => question.categoryName)
    .filter(onlyUnique);
  const numOfQuestionsInCategory = questions.length / categories.length;

  function forwardDataOnBackend() {
    console.log(answers);
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
        boolean: true,
      };
      console.log(newElement);
      setAnswers(prevArr => [...prevArr, newElement]);
      setMessagge('CORRECT ANSWER, WELL DONE!');
    } else {
      console.log('wrong');
      let newElement = {
        questionId: previousQuestionId,
        boolean: false,
      };
      console.log(newElement);
      setAnswers(prevArr => [...prevArr, newElement]);
      setMessagge(
        'WRONG ANSWER :( Correct answer is: ' + currentQuestion.correctAnswer,
      );
    }

    setShowExplanationAndMessage(true);
    setNextButtonVisible(true);
    fadeIn();
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
      fadeOut();
    }
  }

  let fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className=" h-screen bg-blue-900">
      <View className="flex-col items-center ">
        <Text className="mt-10  text-2xl text-white font-bold">
          {currentQuestion.categoryName}
        </Text>
        <View className="mt-5">
          <Icon name="palette" size={150} color="#172554" />
        </View>

        <View
          style={{
            backgroundColor: '#172554',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 9,
            },
            shadowOpacity: 0.48,
            shadowRadius: 11.95,

            elevation: 18,
          }}
          className=" mt-7 rounded-xl items-center width-screen  ml-5 mr-5  animate-pulse">
          <Text className=" text-l text-white text-center font-bold p-5">
            {currentQuestion.questionText}
          </Text>
        </View>

        {showExplanationAndMessage && (
          <Animated.View
            style={[
              {
                opacity: fadeAnim,
              },
            ]}
            className="mt-5 bg-blue-400 flex-col rounded-xl items-center width-screen  ml-5 mr-5 h-32 animate-pulse">
            <View
              style={[styles.shadow, {width: '100%'}]}
              className=" mt-2 bg-white items-center rounded-xl h-10 ml-3 mr-3">
              <Text className="font-bold text-center p-2">{messagge}</Text>
            </View>
            <View className=" mt-1 p-3">
              <Text className="text-white text-center">
                {currentQuestion.explanation}
              </Text>
            </View>
          </Animated.View>
        )}
        <View className="flex flex-row justify-evenly w-full flex-wrap mt-5">
          <TouchableOpacity
            style={styles.shadow}
            disabled={showExplanationAndMessage}
            className="flex flex-col justify-evenly items-center rounded-xl w-40 h-28  bg-white"
            onPress={e => {
              onPress(0);
            }}>
            <Text>{questionShuffle.at(0)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shadow}
            disabled={showExplanationAndMessage}
            className="flex flex-col font-bold justify-evenly items-center  rounded-xl w-40 h-28  bg-white "
            onPress={() => {
              onPress(1);
            }}>
            <Text>{questionShuffle[1]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shadow}
            disabled={showExplanationAndMessage}
            className="flex flex-col justify-evenly font-bold items-center  rounded-xl w-40 h-28 mt-7 bg-white"
            onPress={() => {
              onPress(2);
            }}>
            <Text>{questionShuffle[2]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shadow}
            disabled={showExplanationAndMessage}
            className="flex flex-col justify-evenly font-bold items-center rounded-xl w-40 h-28 mt-7  bg-white"
            onPress={() => {
              onPress(3);
            }}>
            <Text>{questionShuffle[3]}</Text>
          </TouchableOpacity>
        </View>
        {nextButtonVisible && (
          <TouchableOpacity
            style={{
              backgroundColor: '#172554',
            }}
            className=" mt-10  left rounded-s  w-24 h-7"
            onPress={() => updateQuestion()}>
            <Text className="text-white text-center p-1 object-right">
              {'Next ->'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
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
