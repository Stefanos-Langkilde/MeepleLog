import NemesisPlayerCard from "@/src/components/NemesisPlayerCard";
import { useFetchBoardGames } from "@/utils/utils";
import { useState } from "react";
import {
	FlatList,
	Modal,
	ScrollView,
	StyleSheet,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
	const boardgames = useFetchBoardGames();
	const [selectedGame, setSelectedGame] = useState<any>(null);
	const [modalVisible, setModalVisible] = useState(false);

	//check for session id
	const [sessionId, setSessionId] = useState<number | null>(null);

	const [missionSuccess, setMissionSuccess] = useState(false);

	//switches go here
	const toggleMissionSwitch = () => {
		setMissionSuccess(!missionSuccess);
	};

	//switches end here -----------

	const openModal = (game: any) => {
		setPlayerCount(game.minPlayers);
		setSelectedGame(game);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
		setSelectedGame(null);
	};

	//When starting session, create new fetch
	const saveSession = () => {
		// Implement session start logic here
		setSessionId(1);
	};

	//player count logic here, can be incremented/decremented with buttons
	const [playerCount, setPlayerCount] = useState(1);

	const incrementPlayerCount = () => {
		if (selectedGame && playerCount < selectedGame.maxPlayers) {
			setPlayerCount(playerCount + 1);
		}
	};

	// Decrement player count but always ensure it doesn't go below 0
	//and start with at least 1 player when session starts
	const decrementPlayerCount = () => {
		if (selectedGame && playerCount > selectedGame.minPlayers) {
			setPlayerCount(playerCount - 1);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.titleText}>Choose a Game:</Text>
			<View style={styles.listContainer}>
				<FlatList<{ name?: string }>
					data={boardgames}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={styles.listItems}
							onPress={() => {
								// Handle navigation to game session
								openModal(item);
							}}
						>
							<Text style={styles.listItemText}>{item.name}</Text>
						</TouchableOpacity>
					)}
				/>
			</View>
			{selectedGame && (
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={closeModal}
				>
					<View style={styles.modalContainer}>
						<View style={styles.modalBox}>
							<Text style={styles.modalTitle}>{selectedGame.name}</Text>
							<ScrollView
								style={{
									width: "100%",
									maxHeight: "90%",
								}}
							>
								<View style={styles.modalContent}>
									<View
										style={{
											marginTop: 5,
											flexDirection: "row",
											alignItems: "center",
											gap: 15,
										}}
									>
										<Text>Min Players: {selectedGame.minPlayers}</Text>
										<Text>Max Players: {selectedGame.maxPlayers}</Text>
									</View>

									<View
										style={{
											marginTop: 5,
											flexDirection: "row",
											justifyContent: "space-evenly",
											alignItems: "center",
											gap: 10,
										}}
									>
										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
											}}
										>
											<Text>Mission Success: </Text>
											<TextInput
												value={missionSuccess ? "Yes" : "No"}
												editable={false}
											/>
										</View>
										<Switch
											trackColor={{ false: "#767577", true: "#81b0ff" }}
											onValueChange={toggleMissionSwitch}
											value={missionSuccess}
										/>
									</View>
									<View
										style={{
											marginTop: 5,
											flexDirection: "row",
											alignItems: "center",
											gap: 10,
										}}
									>
										<Text>Notes:</Text>
										<TextInput
											style={{
												width: "50%",
												borderWidth: 1,
												borderColor: "#ccc",
												padding: 5,
												borderRadius: 5,
											}}
											placeholder="Insert notes..."
										></TextInput>
									</View>
									<Text
										style={{
											marginTop: 15,
											fontStyle: "italic",
										}}
									>
										Add players.
									</Text>
									<View
										style={{
											height: 1,
											backgroundColor: "#ccc",
											width: "100%",
											marginTop: 10,
										}}
									/>
									<View
										style={{
											width: "100%",
											alignItems: "center",
											flexDirection: "column",
											justifyContent: "center",
											gap: 20,
											marginTop: 10,
										}}
									>
										<View
											style={{
												flexDirection: "row",
												alignItems: "center",
												gap: 10,
											}}
										>
											<Text>Player Count: {playerCount}</Text>
											<TouchableOpacity
												onPress={decrementPlayerCount}
												style={{
													alignItems: "center",
													justifyContent: "center",
													padding: 5,
													backgroundColor: "#ff4d4d",
													borderRadius: 15,
													width: 30,
												}}
											>
												<Text style={{ color: "white", fontSize: 16 }}>-</Text>
											</TouchableOpacity>
											<TouchableOpacity
												onPress={incrementPlayerCount}
												style={{
													alignItems: "center",
													justifyContent: "center",
													padding: 5,
													backgroundColor: "#28a745ff",
													borderRadius: 25,
													width: 30,
												}}
											>
												<Text style={{ color: "white", fontSize: 16 }}>+</Text>
											</TouchableOpacity>
										</View>

										{/* add players below */}
										{/*add player information form here*/}
										{playerCount && (
											<View
												style={{
													width: "100%",
													alignItems: "center",
													gap: 5,
												}}
											>
												{Array.from({ length: playerCount }, (_, i) => (
													<View
														key={i}
														style={{
															width: "100%",
															padding: 10,
														}}
													>
														<NemesisPlayerCard playerNumber={i + 1} />
													</View>
												))}
											</View>
										)}
										<View
											style={{
												width: "80%",
												alignItems: "center",
												flexDirection: "row",
												gap: 20,
											}}
										>
											<View>
												<TouchableOpacity
													style={styles.sessionSaveButton}
													onPress={saveSession}
												>
													<Text style={styles.sessionSaveButtonText}>
														Save Session
													</Text>
												</TouchableOpacity>
											</View>
											<View>
												<TouchableOpacity
													style={styles.closeButton}
													onPress={closeModal}
												>
													<Text style={styles.closeButtonText}>Close</Text>
												</TouchableOpacity>
											</View>
										</View>
									</View>
								</View>
							</ScrollView>
						</View>
					</View>
				</Modal>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		alignItems: "center",
		backgroundColor: "#f2f2f2",
	},
	listContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	titleText: {
		fontSize: 24,
	},
	listItems: {
		width: 300,
		marginVertical: 5,
		padding: 5,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		backgroundColor: "#f0f0f0",
	},
	listItemText: {
		textAlign: "center",
		fontSize: 18,
	},
	// Modal styles
	modalContainer: {
		flex: 1,
		width: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalBox: {
		backgroundColor: "#f9f9f9",
		borderRadius: 10,
		padding: 20,
		width: "90%",
		alignItems: "center",
	},
	modalContent: {
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
	},
	modalTitle: {
		fontSize: 24,
		marginBottom: 10,
	},
	closeButton: {
		marginTop: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: "#1119b3ff",
		borderRadius: 5,
	},
	closeButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	sessionSaveButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},
	sessionSaveButton: {
		marginTop: 20,
		paddingVertical: 10,
		paddingHorizontal: 20,
		backgroundColor: "#28a745ff",
		borderRadius: 5,
	},
});
