import { Router } from 'express';
import * as userController from './user.controller';
import * as friendController from './friend.controller';
import { isAuthenticated } from '@/middleware/auth.middleware';
const router = Router();

// router.get("/find/:query", isAuthenticated, userController.getCompany);
// router.get("/find-user/:tag", isAuthenticated, userControl-ler.findUserTag);
router.get('/roadmap', isAuthenticated, userController.getRoadmap);
router.get('/rec', isAuthenticated, userController.getRecomendateEvents);
router.get('/profile/all/:tag', isAuthenticated, userController.getUserProfile);

router.get('/friends/:tag', isAuthenticated, friendController.getFriends);
router.get(
  '/friend/requests',
  isAuthenticated,
  friendController.getFriendRequests
);
router.get(
  '/friend/status/:tag',
  isAuthenticated,
  friendController.getFriendshipStatus
);
router.post(
  '/friend/request/:tag',
  isAuthenticated,
  friendController.sendFriendRequest
);
router.post(
  '/friend/accept/:requestUid',
  isAuthenticated,
  friendController.acceptFriendRequest
);
router.post(
  '/friend/decline/:requestUid',
  isAuthenticated,
  friendController.declineFriendRequest
);
router.delete('/friend/:tag', isAuthenticated, friendController.removeFriend);
router.get(
  '/profile/experience',
  isAuthenticated,
  userController.getUserExperience
);
router.get(
  '/profile/education',
  isAuthenticated,
  userController.getUserEducation
);
router.get('/profile/info', isAuthenticated, userController.getUserProfileInfo);
router.get('/profile/skills', isAuthenticated, userController.getUserSkills);
router.get('/skill-pool', isAuthenticated, userController.getSkills);
router.get(
  '/profile/security',
  isAuthenticated,
  userController.getUserSecurity
);

router.post(
  '/generate-roadmap',
  isAuthenticated,
  userController.generateRoadmap
);

router.post(
  '/profile-experience',
  isAuthenticated,
  userController.createUserExperience
);

router.post(
  '/profile-skills',
  isAuthenticated,
  userController.createUserSkills
);
router.post('/profile-file', isAuthenticated, userController.addFile);

router.patch(
  '/roadmap/:checkUid',
  isAuthenticated,
  userController.updateRoadmap
);
router.patch('/profile', isAuthenticated, userController.updateUser);
router.patch('/profile-expe', isAuthenticated, userController.updateUserExp);
router.patch(
  '/profile-edu',
  isAuthenticated,
  userController.updateUserEducation
);
router.patch('/profile-doc', isAuthenticated, userController.editFile);

router.delete('/roadmap', isAuthenticated, userController.deleteRoadmap);
router.delete(
  '/profile-experience/:uid',
  isAuthenticated,
  userController.deleteUserExperience
);
router.delete(
  '/profile-skill/:uid',
  isAuthenticated,
  userController.deleteUserSkill
);
router.delete('/profile-file/:uid', isAuthenticated, userController.deleteFile);

export default router;
