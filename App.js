import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from 'expo-font'
import AppLoading from "expo-app-loading";

import StartGame from "./screens/StartGame";
import GameScreen from "./screens/Game";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOver";

export default function App() {
  const [userNum, setUsernum] = useState();
  const [gameOver, setGameOver] = useState(true)

  const [fontsLoaded]  = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
  if(!fontsLoaded){
    return <AppLoading />
  }

  const handleStartGame = (pickedNum) => {
    setUsernum(pickedNum);
    setGameOver(false)
  };
  const handleGameOver = () => {
    setGameOver(true)
  }

  let screen = <StartGame onPickNum={handleStartGame} />;
  if (userNum) {
    screen = <GameScreen userNum={userNum} onGameOver={handleGameOver} />;
  }
  if(gameOver && userNum){
    screen = <GameOverScreen />
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
