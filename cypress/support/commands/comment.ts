/* eslint-disable @typescript-eslint/no-namespace */

import { Comment } from '@/entities/Comment';

export interface CreateNewsCommentProps {
  title: string,
  subTitle: string,
  mainText: string,
  rating: number,
  relatedEntityId: string
}

export const createNewsComment = (comment: CreateNewsCommentProps) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3005/api/comment/news',
    body: comment,
  }).then(({ body }) => body);
};

declare global {
  namespace Cypress {
    interface Chainable {
      createNewsComment(news: CreateNewsCommentProps): Chainable<Comment>
    }
  }
}
