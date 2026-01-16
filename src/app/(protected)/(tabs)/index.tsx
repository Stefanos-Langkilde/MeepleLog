import { useFetchBoardGames } from "@/utils/utils";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const boardgames = useFetchBoardGames();
  console.log("Boardgames:", boardgames);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Board Games</Text>
      <FlatList<{ name?: string; title?: string }>
        data={boardgames}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.gameText}>{item.name || item.title || JSON.stringify(item)}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
  },
  gameText: {
    fontSize: 20,
    marginVertical: 5,
  },
});
