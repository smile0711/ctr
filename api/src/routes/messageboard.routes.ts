import Router from 'express';

import { messageboardController } from '../controllers';

const messageboardRoutes = Router();
messageboardRoutes.get('/info/:slug',
  (request, response) => messageboardController.getInfo(request, response));
messageboardRoutes.get('/messages/:slug',
  (request, response) => messageboardController.getMessageboardMessages(request, response));
messageboardRoutes.get('/getmessage/:id',
  (request, response) => messageboardController.showMessage(request, response));
messageboardRoutes.post('/postmessage/',
  (request, response) => messageboardController.postMessageboardMessage(request, response));
messageboardRoutes.post('/postreply/',
  (request, response) => messageboardController.postMessageboardReply(request, response));
messageboardRoutes.post('/deletemessage/:id',
  (request, response) => messageboardController.deleteMessageboardMessage(request, response));
messageboardRoutes.post('/changemessageboardintro/',
  (request, response) => messageboardController.changeMessageboardIntro(request, response));

export { messageboardRoutes };
