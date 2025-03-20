type Movie = {
    InternalRating: number;
    InernalGenre: string;
    StreamingService: string;
    Title: string;
    Releaseyear: number;
};
type User = { UserInfo: UserInfo; WatchList: WatchList; GroupList: GroupList };
type Group = { GroupInfo: GroupInfo; Watchlist: WatchList; Members: Members };
type UserInfo = {
    Age: number;
    UserId: string;
    Password: string;
    Email: string;
};
type GroupInfo = { GroupID: string; GroupAdmin: User };
type WatchList = { Movies: Movie[] }; // array of objects
type GroupList = { Groups: Group[] }; // array of objects
type Members = { Users: User[] }; // array of objects
