import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";

function GameSession({ slug, boardgame }: { slug: string; boardgame: any }) {
	const [missionSuccess, setMissionSuccess] = useState(false);
	const toggleSwitch = () =>
		setMissionSuccess((previousState) => !previousState);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{slug}</Text>
			<View style={styles.sectionStyle}>
				<View style={styles.sectionOne}>
					<View style={styles.subSectionOne}>
						<Text>Min Players: {boardgame?.minPlayers}</Text>
						<Text>Max Players: {boardgame?.maxPlayers}</Text>
					</View>
					<View style={styles.subSectionTwo}>
						<Text>Mission Success:</Text>
						<Text>{missionSuccess ? "Success" : "Failure"}</Text>
						<Switch
							trackColor={{ false: "#767577", true: "#81b0ff" }}
							onValueChange={toggleSwitch}
							value={missionSuccess}
						/>
					</View>
					<View style={styles.subSectionThree}>
						<Text>Game Notes:</Text>
						<TextInput
							multiline
							numberOfLines={5}
							style={{
								borderWidth: 1,
								borderColor: "#ccc",
								padding: 10,
								width: "80%",
								borderRadius: 10,
							}}
						/>
					</View>
				</View>
				<View>
					<Text>Game session details and controls go here.</Text>
				</View>
			</View>
		</View>
	);
}

export default function GameSessionScreen() {
	const { slug, data } = useLocalSearchParams();
	const boardgame = data ? JSON.parse(String(data)) : null;

	return <GameSession slug={String(slug)} boardgame={boardgame} />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "#fff",
		padding: 3,
	},
	title: {
		fontSize: 24,
		marginBottom: 10,
		fontWeight: "bold",
	},
	sectionStyle: {
		gap: 40,
	},
	sectionOne: {
		flexDirection: "column",
		justifyContent: "center",
	},
	subSectionOne: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		gap: 20,
	},
	subSectionTwo: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		gap: 20,
	},
	subSectionThree: {
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "center",
		gap: 10,
	},
});
