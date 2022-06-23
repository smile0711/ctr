import Router from 'express';

import { messageboardController } from '../controllers';

const messageboardRoutes = Router();
messageboardRoutes.post('/messageboard/:slug',
  (request, response) => messageboardController.getPlace(request, response));

export { messageboardRoutes };
