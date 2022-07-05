import Router from 'express';

import { messageboardController } from '../controllers';

const messageboardRoutes = Router();
messageboardRoutes.get('/messageboard/:id',
  (request, response) => messageboardController.getInfo(request, response));

export { messageboardRoutes };
