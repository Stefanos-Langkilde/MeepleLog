import { AuthContext } from "@/utils/authContext";
import { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Profile() {
  const authState = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>Profile Page</Text>
      <Button title="Log Out" onPress={() => authState.logOut()} />
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