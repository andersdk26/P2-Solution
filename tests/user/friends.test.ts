import { GetFriends } from '../../src/app/actions/friends/friendsList';
import {
    AcceptFriendRequest,
    DeclineFriendRequest,
    GetFriendRequest,
    RemoveFriend,
    SendFriendRequest,
} from '../../src/app/actions/friends/friendRequests';

test('Sending friend request', async () => {
    await SendFriendRequest(12345, 54321);
    const friendRequests = await GetFriendRequest(54321);
    expect(friendRequests).toContainEqual({ from: 12345 });
});

test('Accepting friend request', async () => {
    await AcceptFriendRequest(12345, 54321);
    const friends = await GetFriends(54321);
    expect(friends).toContainEqual(12345);
});

test('Removing friend', async () => {
    await RemoveFriend(12345, 54321);
    const friends = await GetFriends(54321);
    expect(friends).not.toContainEqual(12345);
});

test('Declining friend request', async () => {
    await SendFriendRequest(12345, 54321);
    await DeclineFriendRequest(12345, 54321);
    const friendRequests = await GetFriendRequest(54321);
    expect(friendRequests).not.toContainEqual({ from: 12345 });
});
