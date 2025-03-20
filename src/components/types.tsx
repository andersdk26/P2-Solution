export type Movie = {
    InternalRating: number;
    InternalGenre: string;
    StreamingService: string;
    Title: string;
    Releaseyear: number;
};
export type User = {
    UserInfo: UserInfo;
    WatchList: WatchList;
    GroupList: GroupList;
};
export type Group = {
    GroupInfo: GroupInfo;
    Watchlist: WatchList;
    Members: Members;
};
export type UserInfo = {
    Age: number;
    UserId: string;
    Password: string;
    Email: string;
};
export type GroupInfo = { GroupID: string; GroupAdmin: User };
export type WatchList = {
    Movies: Movie[];
    GenreBoost: GenreBoost[];
};
export type GroupList = { Groups: Group[] };
export type Members = { Users: User[] };
export type GenreBoost = { Genre: string; Boost: number };
