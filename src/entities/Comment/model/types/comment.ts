import { News } from 'entities/News';
import { User } from 'entities/User';

export interface Comment {
  id: string;
  title: string;
  subTitle: string;
  mainText: string;
  author: User
  rating?: number;
  createdAt: Date;
/*   news: News; */

  /*   likers: User[]
  dislikers: User[] */
}
