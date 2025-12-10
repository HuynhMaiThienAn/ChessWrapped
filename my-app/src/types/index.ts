// easier way to import :)
export * from './game';
export * from './social';
export * from './stats';
export * from './user';

// for chess context interface
import { User } from './user';
import { GameStats } from './stats';
import { FriendStats } from './social';

export interface UserData extends User, GameStats {
    topFriends: FriendStats[];
}