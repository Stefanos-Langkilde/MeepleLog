import React, { useState } from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";

interface PlayerCardProps {
	playerNumber: number;
}

const SessionPlayerCard: React.FC<PlayerCardProps> = ({ playerNumber }) => {
	const [personalMissionSuccess, setPersonalMissionSuccess] = useState(false);
	const [playerDeath, setPlayerDeath] = useState(false);
	const [playerId, setPlayerId] = useState("");
	const [username, setUsername] = useState("");
	const [character, setCharacter] = useState("");

	const togglePersonalMissionSwitch = () => {
		setPersonalMissionSuccess(!personalMissionSuccess);
	};

	const togglePlayerDeathSwitch = () => {
		setPlayerDeath(!playerDeath);
	};

	//dropdown states here
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{ label: "Apple", value: "apple" },
		{ label: "Banana", value: "banana" },
	]);

	return (
		<View style={styles.playerCardContainer}>
			<Text style={{ fontWeight: "bold" }}>Player {playerNumber}</Text>
			<View style={styles.playerIdInputContainer}>
				<Text>ID:</Text>
				<TextInput
					style={{
						borderWidth: 1,
						borderColor: "#ccc",
						padding: 5,
						borderRadius: 5,
						width: "30%",
					}}
					inputMode="numeric"
					placeholder={`Player ${playerNumber} ID`}
					value={playerId}
					onChangeText={setPlayerId}
				/>
			</View>
			<View style={styles.playerNameInputContainer}>
				<Text>Username:</Text>
				<TextInput
					style={{
						borderWidth: 1,
						borderColor: "#ccc",
						padding: 5,
						borderRadius: 5,
						width: "60%",
					}}
					placeholder={`Player ${playerNumber} username`}
					value={username}
					onChangeText={setUsername}
				/>
			</View>
			<View style={styles.playerCharacterInputContainer}>
				<Text>Character:</Text>
				<TextInput
					style={{
						borderWidth: 1,
						borderColor: "#ccc",
						padding: 5,
						borderRadius: 5,
						width: "50%",
					}}
					placeholder={`Player ${playerNumber} character`}
					value={character}
					onChangeText={setCharacter}
				/>
			</View>
			<View style={styles.personalMissionContainer}>
				<Text>Personal Mission: </Text>
				<Text>{personalMissionSuccess ? "Success" : "Failure"}</Text>
				<Switch
					trackColor={{
						false: "#767577",
						true: "#53b63f",
					}}
					thumbColor={personalMissionSuccess ? "#f4f3f4" : "#f4f3f4"}
					ios_backgroundColor="#3e3e3e"
					onValueChange={togglePersonalMissionSwitch}
					value={personalMissionSuccess}
				/>
			</View>
			<View style={styles.playerFateContainer}>
				<Text>Fate:</Text>
				<Text>{playerDeath ? "Deceased" : "Survived"}</Text>
				<Switch
					trackColor={{
						false: "#53b63f",
						true: "#ff4d4d",
					}}
					thumbColor={playerDeath ? "#f4f3f4" : "#f4f3f4"}
					ios_backgroundColor="#3e3e3e"
					onValueChange={togglePlayerDeathSwitch}
					value={playerDeath}
				/>
			</View>
			{playerDeath && (
				<View style={styles.playerDiedContainer}>
					<Text>Cause of Death:</Text>
					{/* Add input for cause of death if needed */}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	playerCardContainer: {
		width: "100%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 15,
		padding: 10,
		flexDirection: "column",
		gap: 10,
	},
	playerIdInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},
	playerNameInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},
	playerCharacterInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},
	personalMissionContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 30,
	},
	playerFateContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: 30,
	},
	playerDiedContainer: {
		flexDirection: "column",
		alignItems: "center",
		gap: 5,
	},
});

export default SessionPlayerCard;
