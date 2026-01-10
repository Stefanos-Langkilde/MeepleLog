import { AuthContext } from "@/utils/authContext";
import { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";


export default function SignUpScreen() {
    const authState = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <Text>Sign Up Screen</Text>
            <Button title="Sign Up" onPress={authState.logIn} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});