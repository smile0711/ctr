import { Request, Response} from 'express';

import { db } from '../db';

class MessageboardController {

  constructor() {}

  /** Provides data about the place with the given slug */
  public async getPlace(request: Request, response: Response): Promise<void> {
    const { slug } = request.params;
    try {
      const [place] = await db.place.where({ slug });
      response.status(200).json({ placename });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error });
    }
  }
}
export const messageboardController = new MessageboardController();
