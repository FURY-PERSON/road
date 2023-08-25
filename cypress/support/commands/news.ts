/* eslint-disable @typescript-eslint/no-namespace */

import { News, NewsType } from '../../../src/entities/News/model/types/news';
import { EditableNewsBlock } from '../../../src/features/EditableNewsBlock';

export const deleteNews = (newsId: string) => {
  cy.request({
    method: 'DELETE',
    url: `http://localhost:3005/api/news/${newsId}`
  }).then(({ body }) => body);
};

export interface CreateNewsProps {
  type: NewsType;
  title: string;
  subTitle: string;
  mainText: string;
  dormId: string;
  blocks: Array<EditableNewsBlock>;
}

export const createNews = (news: CreateNewsProps) => {
  const formData = new FormData();

  formData.append('type', NewsType.WARNING);

  if (news.title) formData.append('title', news.title);
  if (news.subTitle) formData.append('subTitle', news.subTitle);
  if (news.mainText) formData.append('mainText', news.mainText);
  if (news.dormId) formData.append('dormId', news.dormId);

  formData.append('blocks', JSON.stringify([]));

  /*   if (form?.image) {
    const imageFetch = await fetch(form.image);
    const blobFile = await imageFetch.blob();
    formData.append('image', new Blob([blobFile]));
  }
 */

  cy.request({
    method: 'POST',
    url: 'http://localhost:3005/api/news',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: formData
  }).then(({ body }) => {
    const dec = new TextDecoder();

    return JSON.parse(dec.decode(body));
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createNews(news: CreateNewsProps): Chainable<News>;
      deleteNews(newsId: string): Chainable<void>;
    }
  }
}
