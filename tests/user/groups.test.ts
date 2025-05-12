import {
    acceptGroupRequest,
    getGroupRequests,
    rejectGroupRequest,
    requestToJoinGroup,
} from '../../src/app/actions/groups/groupRequests';
import { GroupCreateDb } from '../../src/app/actions/groups/groupCreateDb';
import { getGroupById, group } from '../../src/components/groupPage/group';
import {
    DeleteGroup,
    RemoveMemberFromDb,
} from '../../src/app/actions/groups/adminGroupActions';

test('Create group', async () => {
    const testGroup: group = {
        groupId: 888888,
        groupName: 'test',
        groupAdmin: 11111,
        groupMembers: '11111',
        settings: '',
    };
    await GroupCreateDb(testGroup);
    expect((await getGroupById('888888')).length).toBeGreaterThan(0);
});

test('Request to join group multiple times', async () => {
    await requestToJoinGroup(12345, 888888);
    await requestToJoinGroup(12345, 888888);
    await requestToJoinGroup(12345, 888888);
    const requests = await getGroupRequests(11111);
    expect(requests.length).toBe(1);
});

test('Accept group request', async () => {
    await acceptGroupRequest(12345, 888888);
    const group = await getGroupById('888888');
    expect(group[0].groupMembers).toContain('12345');
});

test('Remove member from group', async () => {
    const groupBefore = await getGroupById('888888');
    expect(groupBefore[0].groupMembers).toContain('12345');
    await RemoveMemberFromDb('12345', groupBefore[0].groupMembers, 888888);
    const groupAfter = await getGroupById('888888');
    expect(groupAfter[0].groupMembers).not.toContain('12345');
});

test('Send and decline group request', async () => {
    await requestToJoinGroup(55555, 888888);
    const requestsBefore = await getGroupRequests(11111);
    expect(requestsBefore.length).toBe(1);
    await rejectGroupRequest(55555, 888888);
    const requestsAfter = await getGroupRequests(11111);
    expect(requestsAfter.length).toBe(0);
});

test('Delete group', async () => {
    const groupBefore = await getGroupById('888888');
    expect(groupBefore.length).toBeGreaterThan(0);
    await DeleteGroup(888888);
    const groupAfter = await getGroupById('888888');
    expect(groupAfter.length).toBe(0);
});
