import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import StartGame from "./screens/StartGame";
import GameScreen from "./screens/Game";
import Colors from "./constants/colors";

export default function App() {
  const [userNum, setUsernum] = useState();

  const handleStartGame = (pickedNum) => {
    setUsernum(pickedNum);
  };
  let screen = <StartGame onPickNum={handleStartGame} />;
  if (userNum) {
    screen = <GameScreen userNum={userNum} />;
  }
  return (
    <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.appContainer}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.appContainer}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.appContainer}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.25,
  },
});
