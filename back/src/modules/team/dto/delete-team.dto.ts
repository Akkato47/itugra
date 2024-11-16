export class DeleteTeamDto {
    teamUid: string;
}

export class DeleteUserTeamDto {
    userUid: string;
    teamUid: string;
}

export class DeleteRoleDto {
    ctrUid: string;
    teamUid: string;
}
