import { isAuthenticated } from "@/middleware/auth.middleware";
import { Router } from "express";
import * as teamController from "./team.controller";

const router = Router();

router.get("/list", isAuthenticated, teamController.getTeamList);
router.get("/data/:teamUid", isAuthenticated, teamController.getTeamData);

router.post("/invite/create", isAuthenticated, teamController.createInvite);
router.post(
    "/invite/accept/:inviteCode",
    isAuthenticated,
    teamController.acceptInvite,
);
router.post("/create", isAuthenticated, teamController.createTeam);
router.post("/create-role", isAuthenticated, teamController.createRole);

router.put("/update", isAuthenticated, teamController.updateTeamData);
router.put("/update-role", isAuthenticated, teamController.updateRoleData);
router.put("/update-user-role", isAuthenticated, teamController.updateUserRole);

router.delete("/delete", isAuthenticated, teamController.deleteTeam);
router.delete("/delete-user", isAuthenticated, teamController.deleteUserTeam);
router.delete("/delete-role", isAuthenticated, teamController.deleteRole);

export default router;
