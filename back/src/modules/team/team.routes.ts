import { isAuthenticated } from "@/middleware/auth.middleware";
import { rateLimiter } from "@/middleware/rate-limit.middleware";
import { Router } from "express";
import * as teamController from "./team.controller";

const router = Router();

const createTeamRateLimiter = rateLimiter({
  keyPrefix: "team-create",
  limit: 5,
  windowSeconds: 60,
});

router.get("/list", isAuthenticated, teamController.getTeamList);
router.get("/data/:teamUid", isAuthenticated, teamController.getTeamData);

router.get("/invite/list", isAuthenticated, teamController.getInvites);
router.post("/invite/create", isAuthenticated, teamController.createInvite);
router.post(
    "/invite/accept/:inviteUid",
    isAuthenticated,
    teamController.acceptInvite,
);
router.post(
    "/invite/decline/:inviteUid",
    isAuthenticated,
    teamController.declineInvite,
);
router.post(
    "/create",
    isAuthenticated,
    createTeamRateLimiter,
    teamController.createTeam,
);
router.post("/create-role", isAuthenticated, teamController.createRole);

router.put("/update", isAuthenticated, teamController.updateTeamData);
router.put("/update-role", isAuthenticated, teamController.updateRoleData);
router.put("/update-user-role", isAuthenticated, teamController.updateUserRole);

router.delete("/leave/:teamUid", isAuthenticated, teamController.leaveTeam);
router.delete("/delete", isAuthenticated, teamController.deleteTeam);
router.delete("/delete-user", isAuthenticated, teamController.deleteUserTeam);
router.delete("/delete-role", isAuthenticated, teamController.deleteRole);

export default router;
