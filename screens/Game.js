import { View, StyleSheet, Alert, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TitleComponent from "../components/ui/Title";
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

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
  const [guessRounds, setGuessRounds] = useState([intialGuess]);

  useEffect(() => {
    if (currGuess === userNum) {
      onGameOver(guessRounds.length);
    }
  }, [currGuess, userNum, onGameOver]);
  useEffect(() => {
    minBound = 1;
    maxBound = 100;
  }, []);
  const handleNextGuess = (direction) => {
    if (
      (direction === "lower" && currGuess < userNum) ||
      (direction === "greater" && currGuess > userNum)
    ) {
      Alert.alert("Don't lie!!!", "You know this is wrong....", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBound = currGuess;
    } else {
      minBound = currGuess + 1;
    }
    const newRndNum = generateRandomBetween(minBound, maxBound, currGuess);
    setCurrGuess(newRndNum);
    setGuessRounds((prevGuessRounds) => [newRndNum, ...prevGuessRounds]);
  };

  const guessRoundLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <TitleComponent>Oponent's Guess</TitleComponent>
      <NumberContainer>{currGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.InstructionStyle}>
          Higher or Lower
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={handleNextGuess.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={handleNextGuess.bind(this, "greater")}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
      {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
      <FlatList
        data={guessRounds}
        renderItem={(itemData) => (
          <GuessLogItem
            roundNumber={guessRoundLength - itemData.index}
            guess={itemData.item}
          />
        )}
        keyExtractor={(item) => item}
      />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center'
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  InstructionStyle: {
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
    padding: 16
  }
});
