import { ChessGame } from '@/types';

export interface RawProfileResponse {
    avatar?: string;
    joined?: number;
    status?: string;
    url?: string;
    name?: string;
}

export interface RawArchivesResponse {
    archives: string[];
}

export interface RawMonthlyGamesResponse {
    games: ChessGame[];
}