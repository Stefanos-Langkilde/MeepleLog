import { useFetchBoardGames } from "@/utils/utils";
import { Link } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Index() {
	const boardgames = useFetchBoardGames();
	// console.log("Boardgames:", boardgames);

	return (
		<View style={styles.container}>
			<Text style={styles.titleText}>Choose a Game:</Text>
			<FlatList<{ name?: string }>
				data={boardgames}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<Link
						style={styles.listItems}
						href={{
							pathname: "../gameSession/[slug]",
							params: { slug: item.name, data: JSON.stringify(item) },
						}}
					>
						{item.name}
					</Link>
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
	titleText: {
		fontSize: 30,
	},
	listItems: {
		fontSize: 20,
		marginVertical: 5,

		borderColor: "black",
		borderWidth: 1,
		padding: 5,
		width: 300,
		textAlign: "center",
		backgroundColor: "#f0f0f0",
		borderRadius: 10,
	},
});
