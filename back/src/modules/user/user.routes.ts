import { Router } from 'express';
import * as userController from './user.controller';
import { isAuthenticated } from '@/middleware/auth.middleware';
const router = Router();

// router.get("/find/:query", isAuthenticated, userController.getCompany);
// router.get("/find-user/:tag", isAuthenticated, userControl-ler.findUserTag);
router.get('/profile/all/:tag', isAuthenticated, userController.getUserProfile);
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
router.get(
  '/profile/security',
  isAuthenticated,
  userController.getUserSecurity
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
// router.post("/friend-add/:tag", isAuthenticated, userController.addFriend);

router.patch('/profile', isAuthenticated, userController.updateUser);
router.patch('/profile-expe', isAuthenticated, userController.updateUserExp);
router.patch(
  '/profile-edu',
  isAuthenticated,
  userController.updateUserEducation
);
router.patch('/profile-doc', isAuthenticated, userController.editFile);

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
// router.delete(
//     "/friend-delete/:friendListUid",
//     isAuthenticated,
//     userController.deleteFriend,
// );

export default router;
