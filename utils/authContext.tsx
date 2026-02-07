import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

type AuthState = {
	deleteAccount(): unknown;
	isLoggedIn: boolean;
	isReady: boolean;
	logIn: () => void;
	logOut: () => void;
	userId: number | null;
};

const authStorageKey = "isLoggedIn";

export const AuthContext = createContext<AuthState>({
	isLoggedIn: false,
	isReady: false,
	logIn: () => {},
	logOut: () => {},
	userId: null,
	deleteAccount: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
	const [isReady, setIsReady] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const router = useRouter();
	const [userId, setUserId] = useState<number | null>(null);

	const storeAuthState = async (newState: { isLoggedIn: boolean }) => {
		try {
			const JsonValue = JSON.stringify(newState);
			await AsyncStorage.setItem(authStorageKey, JsonValue);
		} catch (error) {
			console.error("Failed to store auth state", error);
		}
	};

	const storeUserInfo = async (newUserId: number) => {
		try {
			await AsyncStorage.setItem("userId", JSON.stringify(newUserId));
		} catch (error) {
			console.error("Failed to store user info", error);
		}
	};

	const logIn = () => {
		const defaultUserId = 1; // TODO: Replace with actual userId from login
		setIsLoggedIn(true);
		setUserId(defaultUserId);
		storeAuthState({ isLoggedIn: true });
		storeUserInfo(defaultUserId);
		router.replace("/");
	};
	const logOut = () => {
		setIsLoggedIn(false);
		storeAuthState({ isLoggedIn: false });
		router.replace("/login");
	};

	useEffect(() => {
		const getAuthFromStorage = async () => {
			try {
				const value = await AsyncStorage.getItem(authStorageKey);
				if (value !== null) {
					const auth = JSON.parse(value);
					setIsLoggedIn(auth.isLoggedIn);
				}
				// Restore userId from storage
				const storedUserId = await AsyncStorage.getItem("userId");
				if (storedUserId) {
					setUserId(JSON.parse(storedUserId));
				}
			} catch (error) {
				console.error("Failed to retrieve auth state", error);
			}
			setIsReady(true);
		};

		getAuthFromStorage();
	}, []);

	//delete account function
	const deleteAccount = async () => {
		try {
			// Here you would typically make an API call to delete the account on the server
			// For this example, we'll just clear the local storage and log out
			await AsyncStorage.removeItem(authStorageKey);
			await AsyncStorage.removeItem("userId");
			setIsLoggedIn(false);
			setUserId(null);
			router.replace("/login");
		} catch (error) {
			console.error("Failed to delete account", error);
		}
	};

	useEffect(() => {
		if (isReady) {
			SplashScreen.hideAsync();
		}
	}, [isReady]);

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				isReady,
				logIn,
				logOut,
				userId,
				deleteAccount,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
