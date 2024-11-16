import { relations } from "drizzle-orm";
import { users } from "../user/schema";
import { customTeamRole, team, userTeamRole } from "./schema";

export const customTeamRoleRelations = relations(
    customTeamRole,
    ({ one, many }) => ({
        team: one(team, {
            fields: [customTeamRole.teamUid],
            references: [team.uid],
        }),
        utrs: many(userTeamRole),
    }),
);

export const teamRelations = relations(team, ({ many }) => ({
    customTeamRoles: many(customTeamRole),
    utrs: many(userTeamRole),
}));

export const utrRelations = relations(userTeamRole, ({ one }) => ({
    user: one(users, {
        fields: [userTeamRole.userUid],
        references: [users.uid],
    }),
    team: one(team, {
        fields: [userTeamRole.teamUid],
        references: [team.uid],
    }),
    customTeamRole: one(customTeamRole, {
        fields: [userTeamRole.ctrUid],
        references: [customTeamRole.uid],
    }),
}));
