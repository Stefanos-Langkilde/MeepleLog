import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const API_BASE_URL =
	process.env.EXPO_PUBLIC_API_BASE_URL || "https://example.com";

export const apiFetch = async (endpoint: string, options?: RequestInit) => {
	const response = await fetch(`${API_BASE_URL}${endpoint}`, {
		headers: {
			"Content-Type": "application/json",
			...options?.headers,
		},
		...options,
	});
	if (!response.ok) {
		const errorText = await response.text();
		let detail = errorText;
		try {
			detail = JSON.parse(errorText);
		} catch {
			// not JSON
		}
		throw new Error(
			`API error: ${response.status} ${response.statusText} - ${
				typeof detail === "string" ? detail : JSON.stringify(detail)
			}`,
		);
	}
	return response.json();
};

//fetch player game logs from api
export function useFetchNemesisPlayerGameLogs(
	userId: number | null | undefined,
) {
	const [gameLogs, setGameLogs] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await apiFetch(
					`/GameSession/NemesisGameSessions/${userId}`,
					{
						method: "GET",
					},
				);
				setGameLogs(data);
			} catch (error) {
				console.error("Failed to fetch player game logs", error);
			}
		};

		fetchData();
	}, [userId]);

	return gameLogs;
}

//fetch user info from api
export function useFetchUserInfo(userId: number) {
	const [userInfo, setUserInfo] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await apiFetch(`/Users/${userId}`, { method: "GET" });
				setUserInfo(data);
				await AsyncStorage.setItem("userInfo", JSON.stringify(data));
			} catch (error) {
				console.error("Failed to fetch user info", error);
			}
		};

		fetchData();
	}, [userId]);

	return userInfo;
}

//fetch boardgames from api
//For post req: apiFetch('/api/games', { method: 'POST', body: JSON.stringify(data) })
export function useFetchBoardGames() {
	const [boardgames, setBoardgames] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Check AsyncStorage first
				const cachedData = await AsyncStorage.getItem("boardgames");
				if (cachedData) {
					// console.log("Loading boardgames from cache:", cachedData);
					setBoardgames(JSON.parse(cachedData));
					return;
				}

				// If no cache, fetch from API
				const data = await apiFetch("/Boardgame");
				// console.log("Fetched boardgames from API:", data);
				setBoardgames(data);
				await AsyncStorage.setItem("boardgames", JSON.stringify(data));
			} catch (error) {
				console.error("Failed to fetch boardgames", error);
			}
		};

		fetchData();
	}, []);

	return boardgames;
}

export async function createGameSession(sessionData: any) {
	if (!sessionData) {
		throw new Error("Missing session data");
	}

	try {
		const response = await apiFetch("/GameSession/Nemesis/CreateWithPlayers", {
			method: "POST",
			body: JSON.stringify(sessionData),
		});
		console.log("Session saved:", response);
		return response;
	} catch (error) {
		console.error("Failed to save session:", error);
		throw error;
	}
}

type DeathType = {
	id: number;
	deathType: string;
};

export function useFetchDeathTypes(): DeathType[] {
	const [deathTypes, setDeathTypes] = useState<DeathType[]>([]);

	useEffect(() => {
		const fetchDeathInfo = async () => {
			try {
				// Check AsyncStorage first
				const cachedData = await AsyncStorage.getItem("deathTypes");
				if (cachedData) {
					setDeathTypes(JSON.parse(cachedData));
					return;
				}

				// If no cache, fetch from API
				const data = await apiFetch(`/Nemesis/deaths`, { method: "GET" });
				setDeathTypes(data);
				await AsyncStorage.setItem("deathTypes", JSON.stringify(data));
			} catch (error) {
				console.error("Error fetching death info:", error);
			}
		};

		fetchDeathInfo();
	}, []);

	return deathTypes;
}

type NemesisCharacter = {
	id: number;
	name: string;
};

export function useFetchNemesisCharacters(): NemesisCharacter[] {
	const [characters, setCharacters] = useState<NemesisCharacter[]>([]);

	useEffect(() => {
		const fetchCharacters = async () => {
			try {
				// Check AsyncStorage first
				const cachedData = await AsyncStorage.getItem("nemesisCharacters");
				if (cachedData) {
					setCharacters(JSON.parse(cachedData));
					return;
				}

				// If no cache, fetch from API
				const data = await apiFetch(`/Nemesis/characters`, { method: "GET" });
				setCharacters(data);
				await AsyncStorage.setItem("nemesisCharacters", JSON.stringify(data));
			} catch (error) {
				console.error("Error fetching nemesis characters:", error);
			}
		};

		fetchCharacters();
	}, []);

	return characters;
}
