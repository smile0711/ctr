import { Request, Response} from 'express';

import { db } from '../db';

class MessageboardController {

  constructor() {}

  /** Provides data about the place with the given slug */
  public async getInfo(request: Request, response: Response): Promise<void> {
    const { slug } = request.params;
    console.log({slug});
    try {
      const place = await db.place.where({ slug });
      console.log({place});

      response.status(200).json({place: place});
    } catch (error) {
      console.error(error);
      response.status(400).json({ error });
    }
  }
}
export const messageboardController = new MessageboardController();
