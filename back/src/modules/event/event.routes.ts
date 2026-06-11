import { isAuthenticated } from '@/middleware/auth.middleware';
import { Router } from 'express';
import * as eventController from './event.controller';
import { isAdmin } from '@/middleware/role.middleware';

const router = Router();

router.get('/upcoming', eventController.getUpcoming);
router.get('/all', isAuthenticated, eventController.getEvents);
router.get('/requests/my', isAuthenticated, eventController.getMyRequests);
router.get('/requests/all', isAuthenticated, isAdmin, eventController.getRequests);
router.get('/request/:requestUid', isAuthenticated, isAdmin, eventController.getRequest);
router.get('/info/:eventUid', isAuthenticated, eventController.getEvent);

router.get('/registrations/my', isAuthenticated, eventController.getMyRegistrations);
router.get('/participants/:eventUid', isAuthenticated, eventController.getParticipants);

router.post('/create/request', isAuthenticated, eventController.createRequest);

router.post('/register/solo/:eventUid', isAuthenticated, eventController.registerSolo);
router.post('/register/team', isAuthenticated, eventController.registerTeam);
router.post('/register/cancel/:registrationUid', isAuthenticated, eventController.cancelRegistration);

router.post('/make/desicion', isAuthenticated, isAdmin, eventController.makeDecision);

export default router;
