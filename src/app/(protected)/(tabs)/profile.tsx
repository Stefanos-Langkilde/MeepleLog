import { AuthContext } from "@/utils/authContext";
import { useFetchUserInfo } from "@/utils/utils";
import { useContext } from "react";
import {
	Alert,
	Button,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function Profile() {
	const authState = useContext(AuthContext);
	const userInfo = useFetchUserInfo(authState.userId!);

	if (!userInfo) {
		return (
			<View style={styles.container}>
				<Text style={styles.titleText}>Loading...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.titleText}>Your information:</Text>
			<View style={styles.playerInfoContainer}>
				<Text style={styles.textSize}>Your user ID is: {userInfo[0]?.id}</Text>
				<Text style={styles.textSize}>
					Your username is: {userInfo[0]?.username}
				</Text>
				<Text style={styles.textSize}>Your Email is: {userInfo[0]?.email}</Text>
				<Text style={styles.textSize}>
					Joined: {new Date(userInfo[0]?.createdAt).toLocaleDateString()}
				</Text>
				{userInfo[0]?.updatedAt && (
					<Text style={styles.textSize}>
						Last Updated:{" "}
						{new Date(userInfo[0]?.updatedAt).toLocaleDateString()}
					</Text>
				)}
				<Button title="Log Out" onPress={() => authState.logOut()} />
			</View>
			<View style={styles.deleteButtonContainer}>
				<Text style={styles.textSize}>Permanently delete your account?</Text>
				<TouchableOpacity
					style={styles.deleteButton}
					onPress={() =>
						Alert.alert(
							"Delete Account",
							"Are you sure you want to permanently delete your account? This cannot be undone.",
							[
								{ text: "Cancel", style: "cancel" },
								{
									text: "Delete",
									style: "destructive",
									onPress: () => {
										// Handle account deletion here
										authState.deleteAccount();
									},
								},
							],
						)
					}
				>
					<Text style={styles.deleteButtonText}>Delete Account</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		padding: 3,
		alignItems: "center",
		justifyContent: "flex-start",
		borderRadius: 8,
		backgroundColor: "#f2f2f2",
		height: "100%",
	},
	titleText: {
		fontSize: 24,
	},
	textSize: {
		fontSize: 18,
	},
	playerInfoContainer: {
		marginTop: 20,
		gap: 10,
	},
	deleteButtonContainer: {
		flexDirection: "column",
		alignItems: "center",
		marginTop: 30,
	},
	deleteButton: {
		backgroundColor: "#ff4444",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		marginTop: 16,
	},
	deleteButtonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
	},
});
