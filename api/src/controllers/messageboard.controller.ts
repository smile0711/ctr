import { Request, Response} from 'express';

import {
  db,
  knex,
} from '../db';
import { member } from '../libs';
import { MessageboardMessages } from 'models';
import { default as dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import sanitizeHtml from 'sanitize-html';

class MessageboardController {

  constructor() {}

  //Provides data about the place with the given slug
  public async getInfo(request: Request, response: Response): Promise<void> {
    const { slug } = request.params;
    var boardAccess = false;
    const session = member.decryptToken(<string> request.headers.apitoken);
    if(!session) {
      response.status(400).json({
        error: 'Invalid or missing token.',
      });
      return;
    }
    const [ admin ] = await knex('member')
    .select('admin')
    .from('member')
    .where('username', session.username);
    console.log(admin.admin);
    if (admin.admin === 1) {
      boardAccess = true;
    }
    //todo add leader and deputy checks for boardAccess
    try {
      const place = await db.place.where({ slug });
      response.status(200).json({
        place: place[0],
        boardAccess: boardAccess,
      });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error });
    }
  };

  //get messages from the database
  public async getMessageboardMessages(request: Request, response: Response): Promise<void> {
    const { slug } = request.params;
    try {
      var messageboardmessages = await knex
      .select('date',
              'id',
              'reply',
              'subject',
              'user',
              'parent_id')
      .from<MessageboardMessages, MessageboardMessages[]>('messageboard_messages')
      .where('place', slug)
      .where('status', 1)
      .orderBy('parent_id', 'desc');
      response.status(200).json({ messageboardmessages });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error });
    }
  };

  //get a specific message for displaying
  public async showMessage(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    try {
      var message = await knex
      .select('message')
      .from('messageboard_messages')
      .where('id', id);
      response.status(200).json({ message: message[0] });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error });
    }
  };

  //post a new message to the database
  public async postMessageboardMessage(request: Request, response: Response): Promise<void> {
    const { slug, subject, body } = request.body;
    if (!subject) {
      response.status(400).json({ err: {
        error: 'A subject is required',
        body: body,
      }});
      return;
    }
    const session = member.decryptToken(<string> request.headers.apitoken);
    if(!session) {
      response.status(400).json({
        error: 'Invalid or missing token.',
      });
      return;
    }
    dayjs.extend(utc);
    dayjs.extend(timezone);
    const date = dayjs().tz('America/New_York').format('ddd, MMMM D, YYYY, h:mm a');
    const user = session.username;
    const newBody = sanitizeHtml(body, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'font' ]),
      allowedAttributes: false,
      selfClosing: [],
    });
    if (newBody != body) {
      console.log(body);
      console.log(newBody);
      response.status(403).json({ err: {
        error: 'Something was wrong with the code utilized. The system has fixed it, hit post again to send.',
        body: newBody
      }});
      return;
    }
    try {
      const [postmessage] = await db.messageboard_messages
      .insert({
        place: slug,
        date: date,
        user: user,
        subject: subject,
        message: newBody,
        reply: 0,
        status: 1,
      });
      await db.messageboard_messages
      .where({ id: postmessage })
      .update({ parent_id: postmessage });
      response.status(200).json();
    } catch (error) {
      console.log(error);
      response.status(400).json({error});
    }
  };

  //Post a reply message to the database
  public async postMessageboardReply(request: Request, response: Response): Promise<void> {
    const session = member.decryptToken(<string> request.headers.apitoken);
    if(!session) {
      response.status(400).json({
        error: 'Invalid or missing token.',
      });
      return;
    }
    dayjs.extend(utc);
    dayjs.extend(timezone);
    var { slug, subject, body, parentid, reply } = request.body;
    const date = dayjs().tz('America/New_York').format('ddd, MMMM D, YYYY, h:mm a');
    const user = session.username;
console.log(body);
    try {
      const [postmessage] = await db.messageboard_messages
      .insert({
        place: slug,
        date: date,
        user: user,
        subject: subject,
        message: body,
        parent_id: parentid,
        reply: 1,
        status: 1,
      });
      response.status(200).json();
    } catch (error) {
      console.log(error);
      response.status(400).json({error});
    };
  };

  //delete a message from the database
  public async deleteMessageboardMessage(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const session = member.decryptToken(<string> request.headers.apitoken);
    if(!session) {
      response.status(400).json({
        error: 'Invalid or missing token.',
      });
      return;
    }
    const [ admin ] = await knex('member')
    .select('admin')
    .from('member')
    .where('username', session.username);
    if (admin.admin != 1) {
      response.status(403).json({error: 'You are not authorized to do that!'});
      return;
    } else {
    try {
      await knex('messageboard_messages')
      .where({ id: id })
      .update({ status: 0});
      response.status(200).json({ success: "Message deleted" });
    } catch (error) {
      console.log(error);
      response.status(400).json({error})
    };
    };
  };
  //delete a message from the database
  public async changeMessageboardIntro(request: Request, response: Response): Promise<void> {
    const { slug, intro } = request.body;
    console.log(slug);
    console.log(intro);
    const session = member.decryptToken(<string> request.headers.apitoken);
    if(!session) {
      response.status(400).json({
        error: 'Invalid or missing token.',
      });
      return;
    }
    const [ admin ] = await knex('member')
    .select('admin')
    .from('member')
    .where('username', session.username);
    if (admin.admin != 1) {
      response.status(403).json({error: 'You are not authorized to do that!'});
      return;
    } else {
      try {
        await knex('place')
        .where({ slug: slug })
        .update({ messageboard_intro: intro });
        console.log('intro updated');
        response.status(200).json({ success: "Intro Updated" });
      } catch (error) {
        console.log(error);
        response.status(400).json({error})
      };
      }
    };
}

export const messageboardController = new MessageboardController();
