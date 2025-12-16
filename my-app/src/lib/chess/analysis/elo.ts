import { ChessGame } from '@/types';

export function analyzeElo(games: ChessGame[], username: string) {
    const blitzCount = games.filter(g => g.time_class === 'blitz').length;
    const targetClass = blitzCount > games.length / 2 ? 'blitz' : 'rapid';

    const history: { date: string; rating: number; monthIndex: number }[] = [];
    const seenMonths = new Set<string>();

    let trueHighestElo = 0;
    let trueLowestElo = Infinity;

    // Iterate backwards (from Dec to Jan)
    for (let i = games.length - 1; i >= 0; i--) {
        const game = games[i];
        if (game.time_class !== targetClass || !game.rated) continue;

        const isWhite = game.white.username.toLowerCase() === username.toLowerCase();
        const rating = isWhite ? game.white.rating : game.black.rating;

        if (rating > trueHighestElo) trueHighestElo = rating;
        if (rating < trueLowestElo) trueLowestElo = rating;

        const date = new Date(game.end_time * 1000);
        const monthKey = `${date.getFullYear()}-${date.getMonth()}`;

        if (!seenMonths.has(monthKey)) { // for the elo graph
            history.push({
                date: date.toLocaleDateString('en-US', { month: 'short' }),
                rating,
                monthIndex: date.getMonth()
            });
            seenMonths.add(monthKey);
        }
    }

    const eloHistory = history.reverse();

    if (trueLowestElo === Infinity) trueLowestElo = 0;

    const startElo = eloHistory.length > 0 ? eloHistory[0].rating : 0;
    const currentElo = eloHistory.length > 0 ? eloHistory[eloHistory.length - 1].rating : 0;
    const eloChange = currentElo - startElo;

    return {
        eloHistory,
        highestElo: trueHighestElo,
        lowestElo: trueLowestElo,
        eloChange
    };
}