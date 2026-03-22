import { apiFetch } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Switch, Text, TextInput, View } from "react-native";
import NemesisDeathDropdown from "./NemesisDeathDropdown";

interface PlayerCardProps {
	playerNumber: number;
}

const NemesisPlayerCard: React.FC<PlayerCardProps> = ({ playerNumber }) => {
	const [personalMissionSuccess, setPersonalMissionSuccess] = useState(false);
	const [playerDeath, setPlayerDeath] = useState(false);
	const [playerId, setPlayerId] = useState("");
	const [confirmedPlayerId, setConfirmedPlayerId] = useState("");
	const [username, setUsername] = useState("");
	const [character, setCharacter] = useState("");

	const togglePersonalMissionSwitch = () => {
		setPersonalMissionSuccess(!personalMissionSuccess);
	};

	const togglePlayerDeathSwitch = () => {
		setPlayerDeath(!playerDeath);
	};

	const handleConfirmPlayerId = () => {
		setConfirmedPlayerId(playerId);
	};

	//fetch user info from api in utils and set username state to the username of the user with the id of playerId
	useEffect(() => {
		const fetchUserInfo = async () => {
			if (confirmedPlayerId) {
				try {
					const data = await apiFetch(`/Users/${confirmedPlayerId}`, {
						method: "GET",
					});
					setUsername(data[0].username);
				} catch (error) {
					Alert.alert("User not found", "Failed to fetch user info");
					setPlayerId("");
					setUsername("");
					console.error("Failed to fetch user info", error);
				}
			}
		};

		fetchUserInfo();
	}, [confirmedPlayerId]);

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
					onSubmitEditing={handleConfirmPlayerId}
					returnKeyType="done"
				/>
			</View>
			<View style={styles.playerNameInputContainer}>
				<Text>Username:</Text>
				{username && <Text style={{ marginLeft: 10 }}>{username}</Text>}
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
					<NemesisDeathDropdown />
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
	confirmButton: {
		backgroundColor: "#007bff",
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	confirmButtonText: {
		color: "#fff",
		fontWeight: "bold",
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

export default NemesisPlayerCard;
