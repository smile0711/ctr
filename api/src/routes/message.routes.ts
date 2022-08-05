import Router from 'express';

import { messageController } from '../controllers';

const messageRoutes = Router();
messageRoutes.get('/place/:placeId',
  (request, response) => messageController.getResults(request, response));
messageRoutes.post('/place/:placeId',
  (request, response) => messageController.addMessage(request, response));

export { messageRoutes };
