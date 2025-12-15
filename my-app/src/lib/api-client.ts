const BASE_URL = "https://api.chess.com/pub";

export const apiRequest = async <T>(endpoint: string): Promise<T> => {
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Chess.com requires a User-Agent with contact info
            'User-Agent': 'ChessWrapped/1.0 (contact: huynhmaithienan.2005@gmail.com)'
        },
        // Cache data to speed up subsequent loads for the same user
        next: { revalidate: 3600 }
    });

    if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }
    return res.json();
};