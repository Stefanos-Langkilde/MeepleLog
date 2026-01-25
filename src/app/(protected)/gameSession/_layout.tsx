import { AuthContext } from "@/utils/authContext";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";

export default function SlugLayout() {
	const authState = useContext(AuthContext);

	if (!authState.isReady) {
		return null;
	}

	if (!authState.isLoggedIn) {
		return <Redirect href="/login" />;
	}

	return (
		<Stack>
			<Stack.Screen
				name="[slug]"
				options={{
					headerShown: true,
					headerTitle: "Game Session",
					title: "Game Session",
				}}
			/>
		</Stack>
	);
}
