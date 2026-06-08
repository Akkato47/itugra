import { Router } from 'express';

import * as notificationController from './notification.controller';
import { isAuthenticated } from '@/middleware/auth.middleware';

const router = Router();

router.get('/', isAuthenticated, notificationController.getNotifications);
router.get(
  '/unread-count',
  isAuthenticated,
  notificationController.getUnreadCount
);
router.patch('/read-all', isAuthenticated, notificationController.markAllRead);
router.patch('/:uid/read', isAuthenticated, notificationController.markAsRead);

export default router;
