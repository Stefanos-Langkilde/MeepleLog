import { AuthContext } from "@/utils/authContext";
import { Link } from "expo-router";
import { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
    const authContext = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
            <Button onPress={() => authContext.logIn()} title="Log In" />
            <Text>If you do not have an account, please <Link style={styles.linkText} href="/signUp">register here.</Link></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    linkText: { color: "blue", textDecorationLine: "underline" },
});