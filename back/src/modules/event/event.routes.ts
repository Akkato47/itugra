import { isAuthenticated } from '@/middleware/auth.middleware';
import { Router } from 'express';
import * as eventController from './event.controller';
import { isAdmin } from '@/middleware/role.middleware';

const router = Router();

router.get('/all', isAuthenticated, eventController.getEvents);
router.get('/requests/all', isAuthenticated, eventController.getRequests);
router.get('/request/:requestUid', isAuthenticated, eventController.getRequest);
router.get('/info/:eventUid', isAuthenticated, eventController.getEvent);

router.post('/create/request', isAuthenticated, eventController.createRequest);

router.post('/make/desicion', isAuthenticated, eventController.makeDecision);

export default router;
