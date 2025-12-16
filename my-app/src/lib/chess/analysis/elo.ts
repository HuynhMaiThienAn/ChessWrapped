import { ChessGame } from '@/types';

export function analyzeElo(games: ChessGame[], username: string) {
    const monthlyStats: Record<string, { date: string; monthIndex: number; Blitz?: number; Rapid?: number; Bullet?: number }> = {};

    // Track stats from EVERY game
    const peaks = { Blitz: 0, Rapid: 0, Bullet: 0 };
    const lows = { Blitz: Infinity, Rapid: Infinity, Bullet: Infinity };
    const starts = { Blitz: 0, Rapid: 0, Bullet: 0 };
    const ends = { Blitz: 0, Rapid: 0, Bullet: 0 };
    const foundStart = { Blitz: false, Rapid: false, Bullet: false };

    const normalize = (mode: string) => mode.charAt(0).toUpperCase() + mode.slice(1);

    // Sort
    const sortedGames = [...games].sort((a, b) => a.end_time - b.end_time);

    sortedGames.forEach(game => {
        if (!game.rated) return;

        // 🛡️ SAFETY CHECK
        if (!game.white || !game.black || !game.white.username || !game.black.username) {
            return;
        }

        const mode = normalize(game.time_class);
        if (!['Blitz', 'Rapid', 'Bullet'].includes(mode)) return;

        const isWhite = game.white.username.toLowerCase() === username.toLowerCase();
        const rating = isWhite ? game.white.rating : game.black.rating;
        const dateObj = new Date(game.end_time * 1000);
        const monthKey = `${dateObj.getFullYear()}-${dateObj.getMonth()}`;

        if (rating > peaks[mode as keyof typeof peaks]) {
            peaks[mode as keyof typeof peaks] = rating;
        }
        if (rating < lows[mode as keyof typeof lows]) {
            lows[mode as keyof typeof lows] = rating;
        }

        if (!foundStart[mode as keyof typeof foundStart]) {
            starts[mode as keyof typeof starts] = rating;
            foundStart[mode as keyof typeof foundStart] = true;
        }
        ends[mode as keyof typeof ends] = rating;

        if (!monthlyStats[monthKey]) {
            monthlyStats[monthKey] = {
                date: dateObj.toLocaleDateString('en-US', { month: 'short' }),
                monthIndex: dateObj.getMonth(),
            };
        }
        monthlyStats[monthKey][mode as 'Blitz' | 'Rapid' | 'Bullet'] = rating;
    });

    // Format Output
    const eloHistory = Object.values(monthlyStats).sort((a, b) => a.monthIndex - b.monthIndex);

    const eloChange = {
        Blitz: ends.Blitz - starts.Blitz,
        Rapid: ends.Rapid - starts.Rapid,
        Bullet: ends.Bullet - starts.Bullet
    };

    const peakElo = Math.max(peaks.Blitz, peaks.Rapid, peaks.Bullet, 0);

    return {
        eloHistory,
        eloChange,
        peakElo,
        peaks,
        starts,
        ends
    };
}