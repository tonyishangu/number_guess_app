import { Text, View, StyleSheet } from "react-native";
import TitleComponent from "../components/ui/Title";
import { useState } from "react";
import NumberContainer from "../components/game/NumberContainer";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max-min)) + min

  if(rndNum === exclude){
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
} 

function GameScreen({ userNum }) {
  const intialGuess = generateRandomBetween(1, 100, userNum)
  const [currGuess, setCurrGuess] = useState(intialGuess)
  return (
    <View style={styles.screen}>
      <TitleComponent>Oponent's Guess</TitleComponent>
      <NumberContainer>{currGuess}</NumberContainer>
      <View>
        <Text>Higher or Lower</Text>
        {/* + */}
        {/* - */}
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
