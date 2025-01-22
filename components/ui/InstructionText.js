import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function InstructionText({ children, style }) {
  return <Text style={[styles.instructions, style]}>{children}</Text>;
}

export default InstructionText;

const styles = StyleSheet.create({
  instructions: {
    color: Colors.accent500,
    fontSize: 24,
  },
});
