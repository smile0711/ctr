import Router from 'express';

import { messageboardController } from '../controllers';

const messageboardRoutes = Router();
messageboardRoutes.get('/:slug',
  (request, response) => messageboardController.getPlace(request, response));

export { messageboardRoutes };
