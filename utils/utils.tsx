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
		throw new Error(`API error: ${response.status}`);
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

export async function createGameSession(
	boardgameId: number,
	gameSuccessor: boolean,
	notes: string,
) {
	try {
		const response = await apiFetch("/GameSession/NemesisGameSession", {
			method: "POST",
			body: JSON.stringify({ boardgameId, gameSuccessor, notes }),
		});
		return response;
	} catch (error) {
		console.error("Failed to create game session", error);
		throw error;
	}
}
