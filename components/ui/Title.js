import { Text, StyleSheet } from "react-native"
import Colors from "../../constants/colors"

function TitleComponent ({children}) {
    return (
        <Text style={styles.title}>{children}</Text>
    )
}

export default TitleComponent

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        // fontWeight: "bold",
        color: 'white',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'white',
        padding: 12,
        marginTop: 30
      },
})