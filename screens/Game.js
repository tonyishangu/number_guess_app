import { Text, View, StyleSheet, Alert } from "react-native";
import TitleComponent from "../components/ui/Title";
import { useState } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";

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

function GameScreen({ userNum }) {
  const intialGuess = generateRandomBetween(minBound, maxBound, userNum);
  const [currGuess, setCurrGuess] = useState(intialGuess);

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
      <View>
        <Text>Higher or Lower</Text>
        <View>
          <PrimaryButton onPress={handleNextGuess.bind(this, "lower")}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={handleNextGuess.bind(this, "greater")}>
            +
          </PrimaryButton>
        </View>
      </View>
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
