import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://example.com';

export const apiFetch = async (endpoint: string, options?: RequestInit) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
    return response.json();
};

//fetch boardgames from api
//For post req: apiFetch('/api/games', { method: 'POST', body: JSON.stringify(data) })
export function useFetchBoardGames() {
    const [boardgames, setBoardgames] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiFetch('/Boardgame');
                console.log("Fetched boardgames:", data);
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
