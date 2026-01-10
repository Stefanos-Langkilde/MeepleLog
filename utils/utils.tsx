
//fetch boardgames from api
export const fetchBoardGames = async () => {
    try {
        const response = await fetch("https://example.com/api/boardgames", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        const JsonValue = JSON.stringify(data.boardGames);
        return JsonValue;
    } catch (error) {
        console.error("Failed to fetch board games", error);
    }
}
