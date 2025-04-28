export default function goToGroupRecommendations(
    groupId: number,
    groupName: string
): void {
    localStorage.setItem('groupId', String(groupId));
    localStorage.setItem('groupName', String(groupName));
}
