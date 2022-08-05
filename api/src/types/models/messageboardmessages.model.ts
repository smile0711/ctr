import { Model } from './model';

/** Defines a Messageboard Messages object as stored in the db */
export interface MessageboardMessages extends Model {
  id: number;
  user: any;
  date: string;
  subject: any;
  message: any;
  reply: number;
  status: number;
  place: any;
  parent_id: number;
  boardAccess: boolean,
}
