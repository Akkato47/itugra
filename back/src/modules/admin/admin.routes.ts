import { Router } from 'express';

import { isAuthenticated } from '@/middleware/auth.middleware';
import { isAdmin } from '@/middleware/role.middleware';
import * as adminController from './admin.controller';

const router = Router();

router.use(isAuthenticated, isAdmin);

router.get('/stats', adminController.getStats);

router.get('/users', adminController.getUsers);
router.patch('/users/:userUid/role', adminController.setUserRole);
router.patch('/users/:userUid/ban', adminController.setUserBan);

router.get('/teams', adminController.getTeams);
router.patch('/teams/:teamUid/ban', adminController.setTeamBan);
router.delete('/teams/:teamUid', adminController.deleteTeam);

router.delete('/events/:eventUid', adminController.deleteEvent);
router.patch('/events/:eventUid/close', adminController.closeEvent);

export default router;
