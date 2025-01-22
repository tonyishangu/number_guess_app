import { View, StyleSheet, Alert } from "react-native";
import TitleComponent from "../components/ui/Title";
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBound = 1;
let maxBound = 100;

function GameScreen({ userNum, onGameOver }) {
  const intialGuess = generateRandomBetween(1, 100, userNum);
  const [currGuess, setCurrGuess] = useState(intialGuess);

  useEffect(()=>{
    if(currGuess === userNum){
      onGameOver()
    }
  }, [currGuess, userNum, onGameOver])
  const handleNextGuess = (direction) => {
    if (
      (direction === 'lower' && currGuess < userNum) ||
      (direction === 'greater' && currGuess > userNum)
    ) {
      Alert.alert("Don't lie!!!", 'You know this is wrong....',
        [{ text: 'Sorry', style: 'cancel'}]
      )
      return;
    }
    if (direction === "lower") {
      maxBound = currGuess;
    } else {
      minBound = currGuess + 1;
    }
    const newRndNum = generateRandomBetween(minBound, maxBound, currGuess);
    setCurrGuess(newRndNum);
  };

  return (
    <View style={styles.screen}>
      <TitleComponent>Oponent's Guess</TitleComponent>
      <NumberContainer>{currGuess}</NumberContainer>
      <Card>
        <InstructionText>Higher or Lower</InstructionText>
        <View>
          <PrimaryButton onPress={handleNextGuess.bind(this, "lower")}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={handleNextGuess.bind(this, "greater")}>
            +
          </PrimaryButton>
        </View>
      </Card>
      <View>{/* LOG ROUNDS */}</View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});
