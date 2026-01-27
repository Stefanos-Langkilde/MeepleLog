import { AuthContext } from "@/utils/authContext";
import { useFetchNemesisPlayerGameLogs } from "@/utils/utils";
import { useContext, useState } from "react";
import {
	FlatList,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

function PlayerGames({ gameLogs }: { gameLogs?: any[] }) {
	const [selectedGame, setSelectedGame] = useState<any>(null);
	const [modalVisible, setModalVisible] = useState(false);

	const openModal = (game: any) => {
		setSelectedGame(game);
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
		setSelectedGame(null);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.headerText}>History</Text>
			<FlatList
				data={gameLogs}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.listItem}
						onPress={() => openModal(item)}
					>
						<View style={styles.listSubItem}>
							<Text>Boardgame id: {item.boardgameId}</Text>
							<Text>Date: {new Date(item.createdAt).toLocaleDateString()}</Text>
						</View>
						<View style={styles.listSubItem}>
							<Text>Players: {item.nemesisPlayersStats?.length || 0}</Text>
							<Text>Mission Success: {item.success ? "Yes" : "No"}</Text>
						</View>
					</TouchableOpacity>
				)}
				ListEmptyComponent={<Text>No game logs available.</Text>}
			/>

			{selectedGame && (
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={closeModal}
				>
					<View style={styles.modalContainer}>
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>Game Details</Text>
							<View style={styles.modalOverview}>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
									}}
								>
									<Text style={styles.modalText}>
										Game ID: {selectedGame.id}
									</Text>
									<Text style={styles.modalText}>
										Date:{" "}
										{new Date(selectedGame.createdAt).toLocaleDateString()}
									</Text>
								</View>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-between",
									}}
								>
									<Text style={styles.modalText}>
										Players: {selectedGame.nemesisPlayersStats?.length || 0}
									</Text>
									<Text style={styles.modalText}>
										Mission Success: {selectedGame.success ? "Yes" : "No"}
									</Text>
								</View>
							</View>
							<FlatList
								data={selectedGame.nemesisPlayersStats}
								style={{ width: "100%" }}
								keyExtractor={(item, index) => index.toString()}
								renderItem={({ item }) => (
									<View style={styles.modalPlayer}>
										<Text style={styles.modalText}>
											Player: {item.playerUsername}
										</Text>
										<Text style={styles.modalText}>
											Character Name: {item.characterName}
										</Text>
										<Text style={styles.modalText}>
											Personal Mission Success:{" "}
											{item.personalMissionSuccess ? "Yes" : "No"}
										</Text>
										<Text style={styles.modalText}>
											Died: {item.playerDied ? "Yes" : "No"}
										</Text>
										<Text style={styles.modalText}>
											Fate: {item.nemesisDeathName}
										</Text>
									</View>
								)}
							/>
							<TouchableOpacity style={styles.closeButton} onPress={closeModal}>
								<Text style={styles.closeButtonText}>Close</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			)}
		</View>
	);
}

export default function PlayerGamesScreen() {
	const authContext = useContext(AuthContext);
	const userId = authContext.userId;
	const gameLogs = useFetchNemesisPlayerGameLogs(userId);

	return <PlayerGames gameLogs={gameLogs} />;
}

const styles = StyleSheet.create({
	container: {
		padding: 3,
		justifyContent: "center",
		alignItems: "center",
	},
	headerText: {
		fontSize: 24,
	},
	listItem: {
		flexDirection: "column",
		marginVertical: 5,
		padding: 5,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 5,
		width: 300,
	},
	listSubItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		fontSize: 14,
		color: "#555",
	},
	modalContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 20,
		width: "80%",
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 5,
	},
	modalOverview: {
		marginBottom: 5,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		paddingBottom: 5,
		width: "100%",
	},
	modalPlayer: {
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		paddingBottom: 5,
	},
	modalText: {
		fontSize: 16,
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
});
